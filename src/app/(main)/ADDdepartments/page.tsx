





'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { getAddDoctor } from '@/app/FunctionAction/DoctorAction'

export interface FormDoctor {
  name: string
  specialty: string
  description: string
  experienceYears: number
  image: File | null
}

export default function Page() {
  const [doctor, setDoctor] = useState()
  const [preview, setPreview] = useState<string | null>(null)
  const { data: session } = useSession()

  const form = useForm<FormDoctor>({
    defaultValues: {
      name: '',
      specialty: '',
      description: '',
      experienceYears: 0,
      image: null,
    },
  })

  async function HandelSubmitDoctor(value: FormDoctor) {
    if (!session?.accessToken) {
      toast.error('You must be logged in to add a doctor')
      return
    }

    try {
      const data = await getAddDoctor(value, session.accessToken)
      console.log(' Server Response:', data)

      if (data?._id) {
        setDoctor(data)
        toast.success('Doctor added successfully')
        form.reset()
        setPreview(null)
      } else {
        toast.error(data?.message || 'Failed to add doctor')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(' Error in HandelSubmitDoctor:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-20">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden ">
        <div className="md:flex-1 bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-12 relative">
          <img
            src={preview || '/WhatsApp Image 2025-10-29 at 09.15.35_81d5a28c.jpg'}
            alt="Profile"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-2xl object-cover mb-6 border-4 border-white"
          />
        </div>

        <div className="md:flex-1 flex flex-col justify-center items-center p-12 gap-6 bg-gray-50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandelSubmitDoctor)} className="w-full space-y-6">
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter doctor's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            field.onChange(file)
                            setPreview(URL.createObjectURL(file))
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter specialty" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (years)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Years of experience"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all mt-4"
              >
                Add Doctor
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
