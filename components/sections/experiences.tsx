import React from "react";
import { Fade } from "react-awesome-reveal";
import { cn, randNumber } from "../Helpers";
import data from '@/json/_experiences.json'

export default function ExperienceSection(): React.JSX.Element {
    return (
            <>
                <section className="section-wrapper wave-clip-up-down bg-gray-200 h-[3000px]lg:h-[970px]" id="experiences">
                    <Fade
                        direction="up"
                        fraction={0}
                        triggerOnce
                        className="block pt-[20px] pb-[100px] xl:py-0"
                    >
                        <div className="flex justify-center items-center mb-4 pt-8">
                            <div className="relative flex justify-center items-center">
                                <h3 className="text-xl md:text-2xl font-bold">Experiences</h3>
                                <span className="absolute -bottom-1 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
                            </div>
                        </div>
                        <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid pb-0">
                            {
                                data.map((experience, ind) => {
                                        return (
                                            <div className={cn("flex md:contents", ((ind % 2 === 0) && "flex-row-reverse"))} key={randNumber()}>
                                                {
                                                    (ind % 2 !== 0) && (
                                                        <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                                                            <div className="flex items-center justify-center w-6 h-full">
                                                                <div className="w-1 h-full bg-blue-300"></div>
                                                            </div>
                                                            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-blue-400 rounded-full top-1/2"></div>
                                                        </div>
                                                    )
                                                }
                                                <div className={cn(
                                                    (ind % 2 === 0) ? "relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto" : "relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-6 col-end-10 mr-auto",
                                                    "max-w-[500px]")}>
                                                    <h3 className="text-lg font-semibold lg:text-xl">{ experience?.jobName } - { experience?.companyName }</h3>
                                                    <p className="mt-2 leading-6">{ experience?.jobDescription }</p>
                                                    <span className="absolute text-sm -top-5 left-2 whitespace-nowrap">{ experience?.startFrom } - { experience?.endFrom ? experience?.endFrom : <span className="text-blue-500 font-semibold">Now</span> }</span>
                                                </div>
                                                {
                                                    (ind % 2 === 0) && (
                                                        <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                                                            <div className="flex items-center justify-center w-6 h-full">
                                                                <div className="w-1 h-full bg-blue-300 rounded-t-full bg-gradient-to-b from-blue-400 to-blue-300">
                                                                </div>
                                                            </div>
                                                            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-blue-400 rounded-full top-1/2"></div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                })
                            }
                        </div>
                    </Fade>
                </section>
            </>
    )
}