import { onAuthenticateUser } from "@/actions/auth"
import { SideBar } from "@/components/reusable-components/sidebar"
import { redirect } from "next/navigation"

import { ReactNode } from "react"

const Layout = async ({children}:{children: ReactNode}) => {

    const userExist = await onAuthenticateUser()

    if(!userExist.user)
    {
        redirect('/sign-in')
    }

    return(
        <div className='flex w-full min-h-screen'>
            {/*SIDEBAR*/}
            <SideBar />
            <div className="flex flex-col w-full h-screen overflow-auto px-4 
            scrollbar-hide container mx-auto">
                {/*HEADER*/}
                {children}
            </div>
           
        </div>
    )

}

export  default Layout