'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useWebinarStore } from '@/store/useWebinarStore'
import { Info } from 'lucide-react'
import React from 'react'

const AdditionalInfoStep = () => {

  const {formData,updateAdditionalInfoField,getStepValidationErrors} = useWebinarStore()

  const {lockChat,couponCode,couponEnabled} = formData.additionalInfo

  const onHandleToggleLockChat = (checked: boolean) => {
    updateAdditionalInfoField('lockChat',checked)
  }

   const onHandleToggleCoupon = (checked: boolean) => {
    updateAdditionalInfoField('couponEnabled',checked)
  }

  const onHandleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAdditionalInfoField('couponCode',e.target.value)
  }

  const errors = getStepValidationErrors('additionalInfo')

  return (
    <div className='space-y-8'>
        <div className="flex items-center justify-between">
            <div>
                <Label 
                    htmlFor='lock-chat'
                    className='text-base font-medium'
                >
                    Lock Chat
                </Label>
                <p
                    className='text-sm text-gray-400'
                >
                    Turn it on to make chat visible tom your users at all time
                </p>
            </div>
            <Switch 
                id='lock-chat'
                checked={lockChat || false}
                onCheckedChange={onHandleToggleLockChat}
            />
        </div>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Label 
                        htmlFor='coupon-enabled'
                        className='text-base font-medium'
                    >
                        Coupon Code
                    </Label>
                    <p>
                        Turn it on to offer disscounts to your viewers
                    </p>
                </div>
                <Switch 
                    id='coupon-enabled'
                    checked={couponEnabled || false}
                    onCheckedChange={onHandleToggleCoupon}
                />
            </div>
        </div>
        {
            couponEnabled && (
                <div className='space-y-2'>
                    <Input 
                        id='coupon-code'
                        value={couponCode || ''}
                        onChange={onHandleCouponCodeChange}
                        placeholder='Paste the code here'
                        className={cn('!bg-background/50 border border-input',
                            errors.couponCode && 'border-red-400 focus-visible:ring-red-400'
                        )}
                    />
                    {errors.couponCode && (
                        <p className='text-sm text-red-400'>{errors.couponCode}</p>
                    )}
                    <div className="flex items-start gap-2 text-sm text-gray-400 mt-2">
                        <Info className='h-4 w-4 mt-0.5' />
                        <p>
                            This coupon code can be used to promote a sale. Users can use it
                            for the buy now CTA
                        </p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AdditionalInfoStep
