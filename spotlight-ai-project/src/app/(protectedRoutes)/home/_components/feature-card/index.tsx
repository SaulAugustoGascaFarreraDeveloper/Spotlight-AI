import Link from 'next/link'
import React, { ReactNode } from 'react'

type FeatureCardProps = {
    Icon: ReactNode
    link: string
    heading: string

}

const FeatureCard = ({Icon,link,heading} : FeatureCardProps) => {
  return (
    <Link href={link} className='px-8 py-6 flex flex-col  items-start justify-center gap-14 rounded-xl border border-border bg-secondary
    backdrop-blur-xl' >
        {Icon}
        <p className='font-semibold text-xl text-primary'>{heading}</p>
    </Link>
  )
}

export default FeatureCard
