'use client'
import { User } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"
import PurpleIcon from "./PurpleIcon"
import LightningIcon from "@/icons/LightningIcon"
import CreateWebinatButton from "./CreateWebinarButton"

type HeaderProps = {
    user: User
}


//TODO: stripe subscription, assistnt,user
const Header = ({user} : HeaderProps) => {

    const pathname = usePathname()
    const router = useRouter()

    return(
        <div className="flex flex-wrap w-full px-4 pt-10 sticky top-0 z-10 justify-between items-center gap-4 bg-background pb-2">
                {pathname.includes('pipeline') ? (
                    <Button
                        className="bg-primary/10  boder border-border rounded-xl cursor-pointer"
                        variant={'outline'}
                        onClick={() => router.push('/webinar')}
                    >
                        <ArrowLeft /> Back to Webinars
                    </Button>
                ) : (
                    <div className="flex px-4 py-2 justify-center text-bold items-center rounded-xl cursor-pointer bg-background border 
                    border-border text-primary capitalize">
                        {pathname.split('/')[1]}
                    </div>
                )}

                {/*TODO: Build stripe susbscription and webinar button*/}
                <div className="flex gap-6 items-center flex-wrap">
                    <PurpleIcon>
                        <LightningIcon />
                    </PurpleIcon>
                     <CreateWebinatButton />
                </div>

               
        </div>
    )
}


export default Header