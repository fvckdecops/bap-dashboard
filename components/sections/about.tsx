"use client"

import React from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { cn, randNumber } from "@/components/Helpers";
import data from '@/json/_about.json'

export default function AboutSection(): React.JSX.Element {
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		draggable: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 5,
		slidesToScroll: 1
	}

    return (
        <section className="section-wrapper" id="about">
			<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center pb-8 px-4 xl:px-16">
				<Fade
					direction="left"
					fraction={0}
					triggerOnce
					className="block"
				>
					<div>
						<div className="relative block md:hidden mb-4">
							<div className="rounded-lg p-2 text-white bg-neutral-800 border border-neutral-600 bg-opacity-90 w-[100px] text-md absolute -left-1 top-4 z-10">
								{ data?.experience } years experience
							</div>
							<Image
								src={require('@/public/assets/images/'+ data?.avatar)}
								style={{
									clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
								}}
								alt=""
							/>
						</div>
						<div className="relative inline-block mb-4">
							<h3 className="text-xl md:text-2xl font-bold">About Me</h3>
							<div className="flex justify-center items-center">
								<span className="absolute -bottom-1 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
							</div>
						</div>
						<div className="text-justify mb-4">{ data?.description }</div>
						<div className="flex items-center gap-2">
							{
								data.socials.map((social) => {
									let config: { color: string, icon: React.JSX.Element|string } = {
										color: 'text-blue-500',
										icon: ''
									}

									switch(social?.type) {
										case "instagram":
											config.color = "text-red-500";
											config.icon = <FaInstagram />
											break;
										case "cv":
											config.color = "text-inherit";
											config.icon = "CV"
											break;
										case "linkedin":
											config.icon = <FaLinkedinIn />
											break;
										case "facebook":
											config.icon = <FaFacebookF />
											break;
										default:
											config.color = "text-blue-500";
									}

									return (
										<Link
											href={social?.url}
											className={
												cn(
													"border-2 border-gray-300 rounded-full p-2 "+ config.color,
													"hover:border-gray-500 duration-200",
													social?.type === "cv" ? "text-md px-2.5" : "text-2xl"
												)
											}
											target="_blank"
											key={social?.type +'-'+ randNumber()}
										>
											{ config.icon }
										</Link>
									)
								})
							}
						</div>
					</div>
				</Fade>
				<Fade
					direction="right"
					fraction={1}
					triggerOnce
				>
					<div className="hidden md:flex md:justify-center">
						<div className="relative max-w-[300px] xl:max-w-[400px]">
							<div className="rounded-lg p-2 text-white bg-neutral-800 border border-neutral-600 bg-opacity-90 w-[100px] text-md absolute -left-1 xl:left-4 top-4 z-10">
								{ data?.experience } years experience
							</div>
							<Image
								src={require('@/public/assets/images/'+ data?.avatar)}
								style={{
									clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
								}}
								alt=""
							/>
						</div>
					</div>
				</Fade>
			</div>
			<Fade
				direction="down"
				fraction={1}
				triggerOnce
			>
				<section className="pb-8 px-4 xl:px-16 py-6 wave-clip-path h-[400px]">
					<div className="flex justify-center items-center mb-8">
						<div className="relative flex justify-center items-center">
							<h3 className="text-xl md:text-2xl font-bold">My Skills</h3>
							<span className="absolute -bottom-1 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
						</div>
					</div>
					<Slider {...settings}>
						{
							data?.skills.map(skill => {
								return (
									<div className="max-w-[200px]" key={skill?.label +'-'+ randNumber()}>
										<Image
											src={require('@/public/assets/svg/'+ skill?.image)}
											alt={skill?.label}
										/>
									</div>
								)
							})
						}
					</Slider>
				</section>
			</Fade>
		</section>
    )
}