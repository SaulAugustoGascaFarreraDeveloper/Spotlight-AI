import PageHeader from '@/components/reusable-components/PageHader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LeadIcon from '@/icons/LeadIcon'
import PipelineIcon from '@/icons/PipelineIcon'
import { Webcam } from 'lucide-react'
import React from 'react'
import { leadData } from './__test__/leaddata'
import { Badge } from '@/components/ui/badge'

const LeadPage = () => {
  return (
    <div className='w-full flex flex-col gap-8'>
        <PageHeader 
            leftIcon={<Webcam className='w-3 h-3' />}
            mainIcon={<LeadIcon className='w-12 h-12' />}
            rightIcon={<PipelineIcon className='w-3 h-3' />}
            heading='The home to all your customers...'
            placeholder='Search customers....'
        />

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-sm text-muted-foreground'>
                        Name
                    </TableHead>
                     <TableHead className='text-sm text-muted-foreground'>
                        Email
                    </TableHead>
                     <TableHead className='text-sm text-muted-foreground'>
                        Phone
                    </TableHead>
                     <TableHead className='text-right text-sm text-muted-foreground'>
                        Tags
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leadData.map((leadData,idx) => (
                    <TableRow
                        key={idx}
                        className='border-0'
                    >
                        <TableCell className='font-medium'>{leadData.name}</TableCell>
                        <TableCell>{leadData.email}</TableCell>
                        <TableCell>{leadData.phone}</TableCell>
                        <TableCell className='text-right'>
                            {leadData.tags.map((tag,idx) => (
                                <Badge
                                    key={idx}
                                    variant={'outline'}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        
    </div>
  )
}

export default LeadPage
