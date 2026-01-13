'use server'

import { WebinarFormState } from "@/lib/types";
import { onAuthenticateUser } from "../auth";
import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

export const createWebinar = async (formData: WebinarFormState) => {

    try{

        const user = await onAuthenticateUser()

        if(!user)
        {
            return {status: 401,message: 'Unauthorized'}
        }

        // if(!user.user?.subscription)
        // {
        //     return {status: 402,message:'Subscription required'}
        // }

        const presenterId = user.user?.id

        console.log("Form Data:",formData,presenterId)

        //validate required fields
        if(!formData.basicInfo.webinarName)
        {
            return {status: 404,message:'Webinar name is required'}
        }

        if(!formData.basicInfo.date)
        {
            return {status: 404,message:'Webinar date is required'}
        }

        if(!formData.basicInfo.time)
        {
            return {status: 404,message:'Webinar time is required'}
        }
        
        //validate that the date is not in the past
        const combinedDateTime = combineDateTime(formData.basicInfo.date,formData.basicInfo.time,formData.basicInfo.timeFormat || 'AM')

        const now = new Date()

        if(combinedDateTime < now)
        {
            return {status: 400,message:'Webinar date and time cannot be in the past.'}
        }

        // Create the webinar with the UUID specified explicitly
        const webinar = await prismaClient.webinar.create({
            data: {
                title: formData.basicInfo.webinarName,
                description: formData.basicInfo.description || "",
                startTime: combinedDateTime,
                tags: formData.cta.tags || [],
                ctaLabel: formData.cta.ctaLabel,
                ctaType: formData.cta.ctaType,
                aiAgentId: formData.cta.aiAgent || null,
                priceId: formData.cta.priceId || null,
                lockChat: formData.additionalInfo.lockChat || false,
                couponCode: formData.additionalInfo.couponEnabled
                ? formData.additionalInfo.couponCode
                : null,
                couponEnabled: formData.additionalInfo.couponEnabled || false,
                presenter:{
                    connect:{
                        id: user.user?.id
                    }
                }
            },
        });

        // Revalidate the webinars page to show the new webinar
        revalidatePath("/")

        if(webinar)
        {
            return{
                status: 200,
                message:'Webinar created succesfully',
                webinarId: webinar.id,
                webinarLink: `/webinar/${webinar.id}`
            }
        }

    }catch(error)
    {
        console.log("Creating Webinar Error --> ",error)

        return {status: 500,message:''}
    }

}

//helper function tom combine date and time
function combineDateTime(date:Date,timeStr:string,timeFormat: 'AM' | 'PM') : Date{

    const [hoursStr,minutesStr] = timeStr.split(':')
    let hours = Number.parseInt(hoursStr,10)
    const minutes = Number.parseInt(minutesStr,10)

    //convert to 24 hours format
    if(timeFormat === "PM" && hours < 12)
    {
        hours += 12
    }else if(timeFormat === "AM" && hours === 12)
    {
        hours = 0
    }

    const result = new Date(date)
    result.setHours(hours,minutes,0,0)

    return result

}