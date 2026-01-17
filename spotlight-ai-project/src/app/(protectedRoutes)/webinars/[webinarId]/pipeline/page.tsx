
import { getWebinarAttendance } from '@/actions/attendance'
import PageHeader from '@/components/reusable-components/PageHader'
import HomeIcon from '@/icons/HomeIcon'
import LeadIcon from '@/icons/LeadIcon'
import PipelineIcon from '@/icons/PipelineIcon'
import React from 'react'
import PipelineLayout from './_components/pipeline-layout'
import { formatColumnTitle } from './_components/utils'
import { AttendedTypeEnum } from '@prisma/client'
import { onAuthenticateUser } from '@/actions/auth'
import { redirect } from 'next/navigation'

type PipelinePageProps = {
    params:Promise<{
        webinarId: string
    }>
}




const PipelinePage = async ({params} : PipelinePageProps) => {

    const {webinarId} = await params

    const checkUser = await onAuthenticateUser()


    if(!checkUser.user)
    {
      redirect('/sign-in')
    }

    const pipelienData = await getWebinarAttendance(webinarId)

    if(!pipelienData.data)
    {
      return(
        <div className='text-3xl h-100 flex justify-center items-center'>
          No pipelines found.
        </div>
      )
    }


    if(checkUser.user.id !== pipelienData.presenter.id)
    {
      return (
          <div className="text-3xl h-100 flex justify-center items-center">
            You are not authorized to view this page
          </div>
      );
    }

  return (
    <div className='w-full flex flex-col gap-8'>
      <PageHeader 
        leftIcon={<LeadIcon className='w-4 h-4' />}
        mainIcon={<PipelineIcon className='w-12 h-12' />}
        rightIcon={<HomeIcon className='w-3 h-3' />}
        heading='Keep track of all your customers'
        placeholder='Search Name, Tag or Email'
      />
      <div className="flex overflow-x-auto pb-4 gap-4 md:gap-6">
          {Object.entries(pipelienData.data).map(([columnType,columnData]) => (
            <PipelineLayout 
              key={columnType}
              title={formatColumnTitle(columnType as AttendedTypeEnum)}
              count={columnData.count}
              users={columnData.users}
              tags={pipelienData.webinarTags}
            />
          ))}
      </div>
    </div>
  )
}

export default PipelinePage
