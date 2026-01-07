import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type PurpleIconProps = {
    className?: string
    children: ReactNode
}

const PurpleIcon = ({className,children} : PurpleIconProps) => {

    return(
        <div className={cn("px-4 py-2 iconBackground",className)}>
            {children}
        </div>
    )
}

export default PurpleIcon
