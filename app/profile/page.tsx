"use client"

import AppSidebar from '@/components/AppSidebar'
import PrimaryButton from '@/components/button/PrimaryButton'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { profileForm } from '@/constants/profileForm'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { Input } from "@/components/ui/input"
import Datepicker from '@/components/form/Datepicker'
import { PhoneInput } from '@/components/form/PhoneInput'

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
        <SidebarProvider className='font-bitcount'>
            <AppSidebar />
            <main className='p-3 w-full'>
                <section className='flex'>
                    <SidebarTrigger />
                  <div className='flex flex-col w-full items-center gap-3'>
                    <h2 className='text-5xl'>Profile Details</h2>
                    <form className='w-full flex flex-col items-center gap-5'>
                      <div className='relative overflow-clip rounded-full w-36 h-36'>
                        <Image fill src="/images/profile.png" alt="Profile image" className='w-36 object-cover' />
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => console.log(e?.target?.files?.[0])}
                        />
                        <button onClick={() => fileInputRef.current?.click()} className='w-full h-1/2 bg-linear-to-b from-gray-700 to-gray-900 opacity-80 absolute bottom-0 flex justify-center items-center cursor-pointer'>
                          <Camera size={32} />
                        </button>
                      </div>
                      {
                        profileForm.map((section, index) => {
                          return (
                            <div className="grid grid-cols-2 gap-3 w-full" key={index}>
                              {
                                section.map(({key, label, type, disabled=false, required=false}) => {
                                    switch(type) {
                                      case "date":
                                        return (
                                          <div key={key}>
                                            <label htmlFor={key}>{label}</label>
                                            <Datepicker id={key} name={key} dateValue={new Date()} onDateChange={(date) => {console.log(date)}} />
                                          </div>
                                        )
                                      case "mobile":
                                        return (
                                          <div key={key}>
                                            <label htmlFor={key}>{label}</label>
                                            <PhoneInput defaultCountry='IN' />
                                          </div>
                                        )
                                      default:
                                        return (
                                          <div key={key}>
                                            <label className='flex gap-1 items-start' htmlFor={key}>{label}{required && <span className='text-red-500 text-xs'>*</span>}</label>
                                            <Input id={key} type={type} name={key} disabled={disabled} required={required} />
                                          </div>
                                        )

                                    }
                                })
                              }
                          </div>
                          )
                        })
                      }
                      <div className='flex w-full justify-end'>
                        <PrimaryButton className='min-w-40'>Submit</PrimaryButton>
                      </div>
                    </form>
                  </div>
                </section>
            </main>
        </SidebarProvider>
        
    </div>
  )
}

export default ProfilePage