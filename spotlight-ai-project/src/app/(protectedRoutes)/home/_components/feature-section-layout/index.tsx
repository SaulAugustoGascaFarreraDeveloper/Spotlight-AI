import RightIcon from '@/icons/RightIcon'
import Link from 'next/link'
import React, { ReactNode } from 'react'

type FeatureSectionLayoutProps = {
    children: ReactNode
    link: string
    heading: string
    className?: string

}

const FeatureSectionLayout = ({children,link,heading,className} : FeatureSectionLayoutProps) => {
  return (
    <div className={`p-10 flex items-center justify-between flex-col gap-10 border border-r-8 border-t-8 rounded-3xl border-border bg-background/10 ${className}`}>
      {children}
      <div className="w-full justify-between items-center flex flex-wrap gap-10">
            <h3 className='sm:w-[70%] font-semibold text-3xl text-primary'>
                {heading}
            </h3>
            <Link href={link} className='text-primary font-semibold text-lg flex items-center justify-center 
            rounded-md opacity-80 hover:animate-pulse'>
                View <RightIcon className='ml-2 w-6 h-6' />
            </Link>
      </div>
    </div>
  )
}

export default FeatureSectionLayout
