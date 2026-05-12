"use client"

import { LayoutDashboard, LogOut, Menu, Users } from "lucide-react";
import Link from "next/link";

interface Props{
    menu: string,
}

export default function SideBar({ menu } : Props){
    return(
        <div>
            <div className="p-4 md:hidden">
                <Menu size={16}/>
            </div>
            <aside className="hidden md:flex md:flex-col justify-between w-48 h-screen space-y-3 p-4 bg-navy">
                <div className="space-y-2">
                    <Link href={"/"} className={`${menu === "Dashboard" ? "bg-surface rounded-full font-bold" : ""} flex items-center w-40 space-x-2 px-6 py-2`}>
                        <LayoutDashboard className="text-white" size={18}/>
                        <p className="text-white">Dashboard</p>
                    </Link>
                    <Link href={"/staff"} className={`${menu === "All Staff" ? "bg-surface rounded-full font-bold" : ""} flex items-center w-40 space-x-2 px-6 py-2`}>
                        <Users className="text-white" size={18}/>
                        <p className="text-white">All Staff</p>
                    </Link>
                </div>

                <div className="flex items-center w-40 space-x-2 px-6 py-2">
                    <LogOut className="text-white" size={16} />
                    <p className="text-white">Log Out</p>
                </div>
            </aside>
        </div>
    )
}