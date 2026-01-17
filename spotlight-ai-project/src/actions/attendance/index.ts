'use server'

import { prismaClient } from "@/lib/prismaClient"
import { AttendanceData } from "@/lib/types"
import { AttendedTypeEnum, CtaTypeEnum } from "@prisma/client"

export const getWebinarAttendance = async (webinarId: string, options: {
    includeUsers?: boolean,
    userLimit?: number
} = {includeUsers:true,userLimit: 100}) => {

   try{

         const webinar = await prismaClient.webinar.findUnique({
                where:{
                    id: webinarId
                },
                select:{
                    id: true,
                    ctaType: true,
                    tags: true,
                    presenter: true,
                    _count:{
                        select:{
                            attendances: true
                        }
                    }
                }
        })

        if(!webinar)
        {
            return{status: 404,success: false,error:'Webinar not found'}
        }

        const attedanceCounts = await prismaClient.attendance.groupBy({
            by:['attendedType'],
            where:{
                webinarId: webinarId
            },
            _count:{
                attendedType: true
            }
        })

        const result: Record<AttendedTypeEnum,AttendanceData> = {} as Record<AttendedTypeEnum,AttendanceData>


        // Process the counts first - this part is very efficient
        for(const type of Object.values(AttendedTypeEnum))
        {
             // Skip ADDED_TO_CART for BOOK_A_CALL webinars
            if(type === "ADDED_TO_CART" && webinar.ctaType === "BOOK_A_CALL") continue

            if(type === "BREAKOUT_ROOM" && webinar.ctaType !== "BOOK_A_CALL") continue

            //find the count for this type
            const countItem = attedanceCounts.find((item) => {

                 // For BOOK_A_CALL, map ADDED_TO_CART to BREAKOUT_ROOM
                 if(webinar.ctaType === "BOOK_A_CALL" && type === "BREAKOUT_ROOM" && item.attendedType === "ADDED_TO_CART" )
                 {
                    return true
                 }

                 return item.attendedType === type

            })

             // Initialize with count but empty users array
             result[type] = {
                count: countItem ? countItem._count.attendedType : 0,
                users: []
             }
        }

         // Fetch user data only if requested
         if(options.includeUsers)
         {
            // For each attendance type, fetch limited users in separate queries
             for(const type of Object.values(AttendedTypeEnum))
             {
                    // Skip types that don't apply to this webinar's CTA type
                    if (
                    (type === AttendedTypeEnum.ADDED_TO_CART &&
                        webinar.ctaType === CtaTypeEnum.BOOK_A_CALL) ||
                    (type === AttendedTypeEnum.BREAKOUT_ROOM &&
                        webinar.ctaType !== CtaTypeEnum.BOOK_A_CALL)
                    ) {
                        continue;
                    }


                        // Get the attendance type to query (map BREAKOUT_ROOM to ADDED_TO_CART for database query)
                        const queryType =
                        webinar.ctaType === CtaTypeEnum.BOOK_A_CALL &&
                        type === AttendedTypeEnum.BREAKOUT_ROOM
                        ? AttendedTypeEnum.ADDED_TO_CART
                        : type;

                        // Only fetch users if there are any attendances of this type
                        if (result[type].count > 0) {
                        const attendances = await prismaClient.attendance.findMany({
                            where: {
                            webinarId,
                            attendedType: queryType,
                            },
                            include: {
                            user: true,
                            },
                            take: options.userLimit, // Limit the number of users returned
                            orderBy: {
                            joinedAt: "desc", // Most recent first
                            },
                        });

                        // Map the attendance data to the user format we want
                        result[type].users = attendances.map((attendance) => ({
                            id: attendance.user.id,
                            name: attendance.user.name,
                            email: attendance.user.email,
                            attendedAt: attendance.joinedAt,
                            stripeConnectId: null, 
                            callStatus: attendance.user.callStatus, 
                            createdAt: attendance.user.createdAt,
                            updatedAt: attendance.user.updatedAt,
                        }));
                    }
             }
         }

        return {
            success: true,
            data: result,
            ctaType: webinar.ctaType,
            webinarTags: webinar.tags || [],
            presenter: webinar.presenter,
        };

   }catch(error){

        console.error("Failed to fetch attendance data:", error);
        return {
        success: false,
        error: "Failed to fetch attendance data",
        };

   }

}