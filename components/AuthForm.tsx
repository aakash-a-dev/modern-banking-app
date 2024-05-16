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

const formSchema = z.object({
  email: z.string().email(),
    passwrod: z.string().min(6, {
      message: "Your password should be atleast 6 characters"
  }),
})


export default function AuthForm({ type }: { type: string }) {
    const [user, setUser] = useState(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
        <CustomInput form="username" name="username" label="Username" placeholder="Enter your username"/>
        <CustomInput form="password" name="password" label="Password" placeholder="Enter your Password"/>                      
        <Button type="submit">Submit</Button>
      </form>
    </Form>
                  </>
          )}
  </section>
  )
}