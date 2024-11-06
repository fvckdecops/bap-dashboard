import React, { useState } from "react";
import { Button } from "../ui/button";
import projectData from '@/json/_projects.json'
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { JackInTheBox } from "react-awesome-reveal";
import { randNumber } from "../Helpers";

let filters: string[] = []

interface ProjectDataProps {
    label: string,
    tag: string[],
    picture: string,
    url: string
}

const projects: ProjectDataProps[] = projectData

projects.map((project: ProjectDataProps) => {
    project.tag.forEach((tag: string) => filters.push(tag))
})

filters = [...new Set(filters)]

export default function ProjectSection(): React.JSX.Element {
    const [filteredData, setFilterData] = useState<ProjectDataProps[]|null>(null)
    const [filter, setFilter] = useState<string|null>(null)

    const handleFilterData = (filter: string, isEmpty: boolean = false) => {
        setFilter(filter)
        if(isEmpty && !filter) {
            setFilterData(null)
            return
        }

        setFilterData(projects.filter((data: ProjectDataProps) => data.tag.includes(filter)))
    }

    return (
        <section className="section-wrapper" id="projects">
            <div className="flex justify-center items-center mb-8">
                <div className="relative flex justify-center items-center">
                    <h3 className="text-xl md:text-2xl font-bold">Projects</h3>
                    <span className="absolute -bottom-1 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
                </div>
            </div>
            <div className="flex justify-center items-center px-4 xl:px-16 mb-4">
                <div className="flex flex-wrap max-w-[500px] gap-4">
                    <Button size="sm" variant="destructive" className="rounded-full" disabled={filteredData === null} onClick={() => handleFilterData('', true)}>All</Button>
                    {
                        filters.map((data: string) => {
                            return (
                                <Button 
                                    key={data +'-'+ randNumber()} 
                                    className={cn(
                                        "rounded-full"
                                    )} 
                                    size="sm" 
                                    onClick={() => handleFilterData(data)} 
                                    disabled={(filter !== null) && (filter === data)}
                                >{ data }</Button>
                            )
                        })
                    }
                </div>
            </div>
            <div className={
                cn(
                    "mx-4 duration-200 grid grid-cols-2 md:grid-cols-4 gap-4"
                )
            }>
                {
                    filteredData && filteredData.length ?
                        filteredData.map((data: ProjectDataProps) => {
                            return (
                                <div key={data?.label +'-'+ randNumber()}>
                                    <JackInTheBox
                                        cascade
                                        duration={500}
                                        triggerOnce
                                    >
                                        <Link
                                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
                                            href={data?.url}
                                            target="_blank"
                                        >     
                                                <Image 
                                                    src={require('@/public/assets/images/'+ data?.picture)}
                                                    alt={data?.label}
                                                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                                />
                                                <div
                                                    className="group-hover:block hidden pointer-events-none absolute inset-0 bg-slate-900 opacity-40">
                                                </div>
                                                <div className="w-full hidden relative group-hover:mb-4 group-hover:inline-block text-sm md:ml-5 md:text-lg text-slate-600">
                                                    <span>{ data?.label }</span>
                                                </div>
                                        </Link>
                                    </JackInTheBox>
                                </div>
                            )
                        })
                    :
                    projectData.map((data: ProjectDataProps) => {
                        return (
                            <div key={data?.label +'-'+ randNumber()}>
                                <JackInTheBox
                                    cascade
                                    duration={500}
                                    triggerOnce
                                >
                                    <Link
                                        className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
                                        href={data?.url}
                                        target="_blank"
                                    >     
                                            <Image 
                                                src={require('@/public/assets/images/'+ data?.picture)}
                                                alt={data?.label}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            />
                                            <div
                                                className="group-hover:block hidden pointer-events-none absolute inset-0 bg-slate-900 opacity-40">
                                            </div>
                                            <div className="w-full hidden relative group-hover:mb-4 group-hover:inline-block text-sm md:ml-5 md:text-lg text-slate-600">
                                                <span>{ data?.label }</span>
                                            </div>
                                    </Link>
                                </JackInTheBox>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}