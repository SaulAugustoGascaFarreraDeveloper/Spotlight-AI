import React, { ReactNode } from 'react'
import PurpleIcon from '../PurpleIcon'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type PageHeaderProps = {
    heading?: string
    mainIcon: ReactNode
    leftIcon: ReactNode
    rightIcon: ReactNode
    children?: ReactNode
    placeholder?: string
}


const PageHeader = ({heading,mainIcon,leftIcon,rightIcon,children,placeholder} : PageHeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-8'>
      <div className="w-full flex justify-center sm:justify-between items-center gap-8 flex-wrap">
        <p className="text-primary text-4xl font-semibold">
            {heading}
        </p>
        <div className="relative md:mr-28 md:mt-6">
            <PurpleIcon className='absolute -left-4 -top-3 -z-10 -rotate-45 py-3'>
                {leftIcon}
            </PurpleIcon>
            <PurpleIcon className='z-10 backdrop-blur'>
                {mainIcon}
            </PurpleIcon>
            <PurpleIcon className='absolute -right-4 -z-10 py-3 rotate-45 -top-3'>
                {rightIcon}
            </PurpleIcon>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-6 items-center justify-between">
        <div className="w-full md:max-w-3/4 relative flex-1">
            <Search className='h-4 w-4 left-3 absolute -translate-y-1/2 top-1/2 text-gray-500' />
            <Input type='text' className='pl-10 rounded-md ' placeholder={placeholder || 'Search...'} />
        </div>
        <div className='md:max-w-1/4 w-full overflow-x-auto items-center'>
            {children}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
