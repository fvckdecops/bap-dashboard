interface Menu {
    name: string,
    link: string
}

export const Menus = (): Menu[] => {
    return [
        {
            name: "Home",
            link: "#home"
        },{
            name: "About Me",
            link: "#about"
        },{
            name: "Experiences",
            link: "#experiences"
        },{
            name: "Projects",
            link: "#projects"
        },{
            name: "Contact Me",
            link: "#contact"
        }
    ]
}

export type MenuProps = {
    name: string,
    link: string
}