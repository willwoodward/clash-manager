"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Sidebar() {
    const [menuItems, setMenuItems] = useState([
        {id: 0, name: 'Home', link: "/", icon: 'fa-solid fa-house'},
        {id: 1, name: 'Members', link: "/members", icon: 'fa-solid fa-users'},
        {id: 2, name: 'Clan Wars', link: "/clanwars", icon: 'fa-solid fa-fire'}
    ])


    return (
        <div className="bg-zinc-900 py-6 transition-all h-[100vh] fixed w-32">
            <div className="flex flex-row">
                <div className="basis-3/4"></div>
                <div className="basis-1/4 hover:text-white">
                    <FontAwesomeIcon icon={ faX } style={{ color: "#ffffff", width: "100%" }}/>
                </div>
            </div>
            {
                menuItems.map((item) => {
                    return (
                        <div>
                            <div className={ "p-4 hover:text-white hover:border-r-4 hover:bg-zinc-800 transition-all font-sans" }>
                                { item.name }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
