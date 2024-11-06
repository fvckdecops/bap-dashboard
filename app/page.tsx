"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutSection from "@/components/sections/about";
import ExperienceSection from "@/components/sections/experiences";
import ProjectSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";

export default function Home() {
	
	return (
		<div className="flex flex-col gap-4">
			<AboutSection />
			<ExperienceSection />
			<ProjectSection />
			<ContactSection />
		</div>
	);
}
