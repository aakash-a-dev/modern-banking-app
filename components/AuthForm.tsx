'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {  signIn, signUp } from '@/lib/actions/user.action'




export default function AuthForm({ type }: { type: string }) {
  const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema>) =>{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
 try {
    if(type === 'sign-up'){
      const newUser = await signUp(data);
      setUser(newUser);
    }

    if(type === 'sign-in'){
      const response = await signIn({
        email: data.email,
        password: data.password
      })

      if(response) router.push('/')
    }

 } catch (error) {
  console.log(error);
 } finally{
  setisLoading(false);
 }
    }
    

  return (
      <section className='auth-form'>
          <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className='mb-12 cursor-pointer flex items-center gap-1'>
                        <Image src="/icons/logo.svg"
                            width={34}
                            height={34} alt={''}
                            className='size-[24px] max-xl:size-14'
                        />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>BAMPay</h1>
              </Link>
              
              <div className='flex flex-col gap-1 md:gap-3'>
                  <h1 className='text-24 lg:text-36 font-semibold text-gray-900'> 
                      {user ? 'Link Account' : type === "sign-in" ? "Login" : "Sign Up"}
                      <p className='text-16 font-normal text-gray-600'>
                          { user ? 'Link Your Account' : 'Please Enter Your Details'}
                      </p>
                  </h1>
              </div>
          </header>
          {user ? (
              <div className='flex flex-col gap-4'>
                  {/* Plaid Link */}
              </div>
          ) : (
                  <>
                       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type === 'sign-up' && (
          <>
          <div className='flex gap-4'>
        <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Aakash"/>
        <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Rajput"/>
          </div>
          <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your Address"/>
        <CustomInput control={form.control} name="city" label="City" placeholder="Enter your City"/>
        
        <div className='flex gap-4'>
        <CustomInput control={form.control} name="state" label="State" placeholder="Example: GJ"/>
        <CustomInput control={form.control} name="postalcode" label="Postal Code" placeholder="Example: 39400"/>
        </div>
       
        <div className='flex gap-4'>
        <CustomInput control={form.control} name="dateOfBirth" label="Date Of Birth" placeholder="DD-MM-YYYY"/>                  
        <CustomInput control={form.control} name="ssn" label="SSN" placeholder="1234"/>                  
        </div>
          </>
        )}
        <CustomInput control={form.control} name="email" label="Username" placeholder="Enter your username"/>
        <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your Password"/>                      
       
        <div className='flex flex-col gap-4'>
        <Button className='form-btn' type="submit" disabled={isLoading}>{isLoading ? (
          <>
          <Loader2 size={20} className='animate-spin' /> &nbsp; 
          Loading ...
          </>
        ) : type === 'sign-in'? 'Sign In' : 'Sign Up'}
        </Button>
        </div>
   
      </form>
    </Form>
    <footer className='flex justify-center gap-1'>
      <p className='text-14 font-normal text-gray-600'>{type === 'sign-in'? "Don't have an account?" : "Already have an account"}
      </p>
      <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'} >
      {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
      </Link>
    </footer>
                  </>
          )}
  </section>
  )
}
