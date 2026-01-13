'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useWebinarStore } from '@/store/useWebinarStore'
import { AiAgents, CtaTypeEnum } from '@prisma/client'
import { X } from 'lucide-react'
import React, { useState } from 'react'


type CTAStepProps = {
    assistants: AiAgents[] | [],
    stripeProducts: []
}


const CTAStep = ({assistants,stripeProducts} : CTAStepProps) => {

    const {formData,updateCTAField,getStepValidationErrors,addTag,removeTag} = useWebinarStore()

    const [tagInput,setTagInput] = useState<string>('')

    const {ctaType,aiAgent,ctaLabel,priceId,tags} = formData.cta

    const errors = getStepValidationErrors('cta')

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name,value} = e.target

        updateCTAField(name as keyof typeof formData.cta,value)

    }

    const onHandleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if(e.key === 'Enter' && tagInput.trim())
        {
            e.preventDefault()
            addTag(tagInput.trim())
            setTagInput('')
        }

    }

    const onHandleSelectCTAType = (value: string) => {
        updateCTAField('ctaType',value as CtaTypeEnum)
    }

  return (
    <div className='space-y-6'>
        <div className="space-y-2">
            <Label
                htmlFor='ctaLabel'
                className={errors.ctaLabel ? 'text-red-400' : ''}
            >
                CTA Label <span className=' text-red-400'>*</span>
            </Label>
            <Input 
                id='ctaLabel'
                name='ctaLabel'
                value={ctaLabel || ''}
                onChange={onHandleChange}
                placeholder={`Let's Get Started`}
                className={cn("!bg-background/50 border border-input",
                    errors.ctaLabel && 'border-red-400 focus-visible:ring-red-400'
                )}
            />
            {errors.ctaLabel && (
                <p className='text-sm text-red-400'>{errors.ctaLabel}</p>
            )}
        </div>
        <div className="space-y-2">
            <Label htmlFor='tags'>Tags</Label>
            <Input 
                id='tags'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={onHandleAddTag}
                placeholder='Add tags and press Enter'
                className='!bg-background/50 border border-input'
            />
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag:string,index:number) => (
                        <div key={index} className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-md">
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className='text-gray-400 hover:text-white'
                            >
                                <X className='h-3 w-3' />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="space-y-2 w-full">
            <Label>CTA Type</Label>
            <Tabs
                className='w-full'
                defaultValue={CtaTypeEnum.BOOK_A_CALL}
            >   
                <TabsList className='w-full bg-transparent'>
                    <TabsTrigger
                        value={CtaTypeEnum.BOOK_A_CALL}
                        className='data-[state=active]:bg-background/50 w-1/2'
                        onClick={() => onHandleSelectCTAType(CtaTypeEnum.BOOK_A_CALL)}
                    >
                        Book a Call
                    </TabsTrigger>
                    <TabsTrigger
                        value={CtaTypeEnum.BUY_NOW}
                        className='w-1/2'
                        onClick={() => onHandleSelectCTAType(CtaTypeEnum.BUY_NOW)}
                    >
                        Buy Now
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    </div>
  )
}

export default CTAStep
