'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import PlusIcon from '@/icons/PlusIcon'
import { useWebinarStore } from '@/store/useWebinarStore'
import React, { useState } from 'react'
import MultiStepForm from './multi-step-form'
import BasicInfoStep from './basic-info-step'


type CreateWebinatButtonProps = {
   
}


const CreateWebinatButton = () => {

    const {isModalOpen,setModalOpen,isComplete,setComplete} = useWebinarStore()

    const [webinarLink,setWebinarLink] = useState<string>("")

    const steps = [{
        id: 'basicInfo',
        title: 'Basic Information',
        description: 'Please fill out the standard info needed for your webinar',
        component: <BasicInfoStep />
    }]

    const handleComplete = (webinarId: string) => {
        console.log(webinarId)
        setComplete(true)
        setWebinarLink(`${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`)
    }

  return (
    <Dialog
        open={isModalOpen}
        onOpenChange={setModalOpen}
    >
        <DialogTrigger asChild>
            <button
                className='rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 
                boder border-border bg-primary/10 backdrop-blur-2xl text-sm font-normal text-primary hover:bg-primary/20'
                // onClick={() => setModalOpen(true)}
            >
                <PlusIcon />
                Create Webinar
            </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[900px] p-0 bg-transparent border-none'>
            <DialogHeader>
                {isComplete ? (
                    <div className="bg-muted text-primary rounded-lg overflow-hidden">
                        <DialogTitle className='sr-only'>Webinar Created</DialogTitle>
                        {/* SuccessStep */}
                    </div>
                ) : (
                    <>
                        <DialogTitle className='sr-only'>Create Webinar</DialogTitle>
                        <MultiStepForm 
                            steps={steps}
                            onComplete={handleComplete}
                        />
                    </>
                    
                )}
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CreateWebinatButton
