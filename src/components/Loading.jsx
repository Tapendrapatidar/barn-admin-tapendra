import React from 'react'
import { Skeleton, Stack, SkeletonCircle, SkeletonText, Card } from '@chakra-ui/react'
function Loading() {
    return (
        <div className="w-[94%]  m-auto absolute  overflow-x-scroll md:overflow-auto  !max-w-8xl 2xl:max-w-none mt-2">
            <Stack>
                <SkeletonText startColor='#e9a537' opacity={'0.6'} endColor='orange.500' mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Stack>

        </div>
    )
}

export default Loading
export const CardLoading = ({ hight = '480px' }) => {
    return (
        <div className="col-span-full flex flex-col gap-2 md:col-span-6 xl:col-span-4 ">
            <Card boxShadow={'md'} pt={2} border={'1px solid rgba(226, 232, 240, 1)'} h={hight} maxW={'480px'} borderRadius={'10px'} overflow={'hidden'} pos={'relative'}>
                <div role="status" className="space-y-8 px-4 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex   flex-col ga md:items-center">
                    <div className="flex items-center justify-center  !w-[100%] mx-1 h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="w-[90%] lg:w-full !mx-4 pt-3">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </div>
                    <div className="w-[90%] lg:w-full !mx-4 pt-3">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </Card>
        </div>
    )
}
export const DashboardCardLoading = ({ }) => {
    return (
        <div className='  flex-1    rounded-xl  h-[150px]  min-w-[150px] max-w-full'>
            <Card boxShadow={'md'} pt={2} h={'150px'} border={'1px solid rgba(226, 232, 240, 1)'} maxW={'480px'} borderRadius={'10px'} overflow={'hidden'} pos={'relative'}>
                <div role="status" className="space-y-8 px-4 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex   flex-col ga md:items-center">


                    <div className="w-[90%] lg:w-full !mx-4 pt-3">
                        {/* <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div> */}
                        <div className="h-2 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </Card>
        </div>
    )
}