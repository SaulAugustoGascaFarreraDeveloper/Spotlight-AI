import { FeatherIcon, Upload, Webcam } from "lucide-react"
import OnBoarding from "./_components/onboarding"
import FeatureCard from "./_components/feature-card"
import FeatureSectionLayout from "./_components/feature-section-layout"
import Image from "next/image"
import { potentialCustomer } from "@/lib/data"
import UserInfoCard from "@/components/reusable-components/user-info-card"

const HomePage = () => {
    return(
        <div className="w-full mx-auto h-full">
            <div className="flex flex-col w-full sm:flex-row justify-between items-start gap-14">
               <div className="space-y-6">
                    <h2 className="text-primary font-semibold text-4xl">
                        Get maximum conversation from your webinars
                    </h2>
                    <OnBoarding />
               </div>
               <div className="grid grid-cols-1 sm:md:grid-cols-2 gap-6 place-content-center">
                    <FeatureCard 
                        Icon={<Upload className="w-10 h-10" />}
                        heading="Browse or drag a pre-recorded webinar file"
                        link="#"
                    />
                     <FeatureCard 
                        Icon={<Webcam className="w-10 h-10" />}
                        heading="Browse or drag a pre-recorded webinar file"
                        link="/webinars"
                    />
               </div>
               
               
            </div>

            <div className="mt-10 grid grid-cols-1 sm:md:grid-cols-2 gap-6 rounded-xl bg-background/10">
                <FeatureSectionLayout 
                    heading="See how far long are your potential customers"
                    link="/lead"
                >
                    <div className="p-5 flex flex-col gap-4 items-start border rounded-xl border-border backdrop-blur-3xl">
                        <div className="w-full flex justify-between items-center gap-3">
                            <p className="text-primary font-semibold text-sm">Conversions</p>
                            <p className="text-xs text-muted-foreground font-normal">50</p>
                        </div>
                        <div className="flex flex-col gap-4 items-start">
                            {Array.from({length: 3}).map((_,index) => (
                                <Image 
                                    src={'/featurecard.png'}
                                    alt="Info-Card"
                                    width={250}
                                    height={250}
                                    className="w-full h-full rounded-xl object-cover"
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </FeatureSectionLayout>
                <FeatureSectionLayout 
                    heading="See ths list of your current customers"
                    link="/pipeline"
                >
                    <div className="flex gap-4 h-full w-full items-center justify-center relative flex-wrap">
                       {potentialCustomer.slice(0,2).map((customer,index) => (
                            <UserInfoCard 
                                customer={customer}
                                tags={customer.tags}
                                key={index}
                            />
                        ))}
                            <Image 
                                src={'/glowCard.png'}
                                alt="Info-Card"
                                width={350}
                                height={350}
                                className="object-cover rounded-xl relative sm:md:absolute px-5 sm:md:mb-72 hidden sm:flex backdrop-blur-[20] "
                            />
                    </div>
                </FeatureSectionLayout>
            </div>
            
        </div>
    )
}

export default HomePage