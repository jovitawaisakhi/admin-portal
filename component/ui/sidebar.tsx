"use client";

import { LayoutDashboard, Users, X } from "lucide-react";
import Link from "next/link";

interface Props {
    menu: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function SideBar({
    menu,
    isOpen,
    setIsOpen,
}: Props) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)}/>
            )}

            <aside className={`fixed top-0 left-0 z-50 flex flex-col justify-between w-64 h-screen p-4 bg-navy transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-48`}>
                <div className="space-y-4">
                    <div className="flex justify-end md:hidden">
                        <button onClick={() => setIsOpen(false)}>
                        <X className="text-white" size={22} />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center w-full space-x-2 px-6 py-2 ${menu === "Dashboard"? "bg-surface rounded-full font-bold" : ""}`}>
                            <LayoutDashboard className="text-white" size={18} />
                            <p className="text-white">Dashboard</p>
                        </Link>

                        <Link href="/staff" onClick={() => setIsOpen(false)} className={`flex items-center w-full space-x-2 px-6 py-2 ${menu === "All Staff" ? "bg-surface rounded-full font-bold" : "" }`} >
                            <Users className="text-white" size={18} />
                            <p className="text-white">All Staff</p>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}