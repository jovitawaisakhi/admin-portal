"use client";

import SearchBar from "./searchBar";
import { ArrowLeft, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar({open, setOpen} : Props){
    const pathname = usePathname();
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSideBar = () => 
    {
        setOpen(!open)
    }

    return(
        <div className="flex w-full h-fit py-4 px-6 border-b border-borderColor shadow-sm">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                    <div onClick={handleSideBar} className="p-4 md:hidden">
                        <Menu size={16}/>
                    </div>
                    
                    {pathname.includes("staff-details") && (
                        <Link href="/staff">
                            <ArrowLeft/>
                        </Link>
                    )}
                    <Link href="/" className="text-xl font-bold">Admin Portal</Link>
                </div>

                <div className="flex items-center space-x-2">
                    {mounted && (
                        <div onClick={() => setTheme(theme === "light" ? "dark" : "light")} 
                        className="p-3 border rounded-full dark:bg-surface">
                            {theme === "light" ? 
                                <Sun size={16} />
                            :
                                <Moon size={16} />
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}