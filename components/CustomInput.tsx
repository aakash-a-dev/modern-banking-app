import React from 'react'
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
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'



interface CustomInput{
  control: Control<z.infer<typeof authFormSchema>>,
  name: string,
  label: string,
  placeholder: string
}

function CustomInput({control, name, label, placeholder}: CustomInput) {
  return (
    <div>
            <FormField
          control={control}
          name={name}
          render={({ field }) => (
              <div className='form-item'>
                  <FormLabel className='form-label'>{label}</FormLabel>
                  <div className='flex w-full flex-col'>
                      <FormControl>
                          <Input placeholder={placeholder}
                          type="password"
                              className='input-class'
                              {...field}
                          />
                      </FormControl>
                      <FormMessage className='form-message mt-2' />
                  </div>
           </div>
          )}
                              />
    </div>
  )
}

export default CustomInput