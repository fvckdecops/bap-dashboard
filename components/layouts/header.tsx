"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaBars } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import { cn, initialsName, randNumber } from "../Helpers";
import Link from "next/link";
import { MenuProps, Menus } from "../Menu";
import { useRouter } from "next/navigation";

export default function Header(): React.JSX.Element {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isScrolled, setScrolled] = useState<boolean>(false)
    const router = useRouter()
	const [currentPage, setCurrentPage] = useState<string|null>(null)

    const changeActiveSection = (section: string) => {
        const elem = document.getElementById(section);
            if(currentPage) {
                setCurrentPage(null)
            } else {
                setCurrentPage('#'+ section)
            }

            elem?.scrollIntoView({
                behavior: 'smooth'
            }); 
    }

    const handleChangeSection = (section: string, notLink: boolean) => {
        if(notLink) {
            router.push('#'+ section)
        }
        
        if(!location.hash) {
            changeActiveSection(section)
        } else {
            setTimeout(() => {
                changeActiveSection(section)
            }, 100)
        }
    }

    useEffect(() => {
        const sections = document.querySelectorAll("section[id].section-wrapper");

        const scrollTracker = () => {
            const currentYScroll = window.scrollY;
          
            sections.forEach((section: any) => {
              const sectionHeight = section.offsetHeight;
              const sectionTop = section.offsetTop - 100;
              const id = section.getAttribute("id");
              const currentNavLink = document.querySelector(`.navbar a[href*="#${id}"]`)!;
              setTimeout(() => {
                if (
                    currentYScroll > sectionTop &&
                    currentYScroll <= sectionTop + sectionHeight
                  ) {
                    setCurrentPage('#'+ id)
                    currentNavLink.classList.add("active");
                  } else {
                    currentNavLink.classList.remove("active");
                  }
              }, 50)
            });
          }

        window.addEventListener("scroll", scrollTracker);
        
        return () => {
            window.removeEventListener('scroll', scrollTracker)
        }
    }, [])

	useEffect(() => {
		if(location.hash) {
			setCurrentPage(location.hash)
			const elem = document.getElementById(location.hash.split('#').join(''))
			if(elem) {
				setTimeout(() => {
					elem.scrollIntoView({
						behavior: 'smooth'
					}); 
				}, 200)
			}
		}

        const scrolled = () => {
            (window.scrollY > 100) ? setScrolled(true) : setScrolled(false)
        }

        addEventListener('scroll', scrolled)

        return () => {
            removeEventListener('scroll', scrolled)
        }
	}, [])

    const handleMobileMenu = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
            <div className={
                cn(
                    "fixed flex w-full items-center z-10 px-4 xl:px-20 py-2 duration-200",
                    isScrolled ? "text-black bg-slate-100" : "text-white"
                )
            }>
                <div className="grow">
                    <Link className={
                        cn(
                            "text-4xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r",
                            isScrolled ? 'from-slate-600 to-slate-800' : 'from-slate-200 to-slate-400'
                        )
                    } href="/">
                        <Image
                            src={require('@/public/bap_logo.png')}
                            className="max-w-[120px]"
                            alt={process.env.NEXT_PUBLIC_APP_NAME!}
                        />
                    </Link>
                </div>
                <div className="navbar items-center gap-4 hidden md:flex">
                    {
                        Menus().map((menu: MenuProps) => {
                            return (
                                <Link
                                    className={
                                        cn(
                                            "text-xl xl:text-2xl uppercase hover:text-sky-400 duration-200"
                                        )
                                    }
                                    href={menu?.link!}
                                    onClick={() => handleChangeSection(menu?.link!.split('#').join(''), false)}
                                    key={randNumber()}
                                >
                                    { menu?.name }
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="navbar md:hidden border rounded-md p-2 flex items-center">
                    <Link
                        href="#" 
                        className={
                            cn(
                                "mb-0 inline-block duration-200",
                                isOpen && "rotate-90"
                            )
                        }
                        onClick={() => handleMobileMenu()}
                     >
                        <FaBars />
                     </Link>
                </div>
                {
                    isOpen && (
                        <div className={
                            cn(
                                "absolute flex flex-col gap-2 md:hidden bg-neutral-100 w-full text-black text-center divide-y-2 items-center top-14 duration-200 left-0"
                            )
                        }>
                            {
                                Menus().map((menu: MenuProps) => {
                                    return (
                                        <Link
                                            className={
                                                cn(
                                                    "text-md uppercase hover:text-sky-400 duration-200"
                                                )
                                            }
                                            href={menu?.link!}
                                            onClick={() => handleChangeSection(menu?.link!.split('#').join(''), false)}
                                            key={menu?.name.split(' ').join('-') +'-'+ randNumber()}
                                        >
                                            { menu?.name }
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
            <section 
                className="grid h-[500px] md:h-screen text-center w-screen section-wrapper wave-clip-path"
                id="home"
                style={{
                    backgroundImage: 'url("/assets/images/header-bg.jpeg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                <div className="col-start-1 row-start-1 bg-neutral-900 bg-opacity-80 w-full h-full"></div>
                <div className="col-start-1 row-start-1 flex items-center justify-center mx-4 md:mx-[200px]">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400 self-center">{ process.env.NEXT_PUBLIC_APP_NAME }</h1>
                        <TypeAnimation
                            sequence={[
                                "Never stop learning",
                                1000,
                                "Never stop learning, Never stop gaining.",
                                1000
                            ]}
                            speed={50}
                            className="text-xl md:text-4xl text-white"
                            repeat={Infinity}
                        />
                    </div>
                </div>
                <div className="col-start-1 row-start-1 flex items-end justify-center mb-20 md:mb-[160px]">
                        <div className="cursor-pointer" onClick={() => handleChangeSection('about', true)}>
                            <FaArrowDown
                                className="text-white text-2xl animate-bounce"
                            />
                        </div>
                </div>
            </section>
        </>
    )
}