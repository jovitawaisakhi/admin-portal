"use client";

import SearchBar from "./searchBar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NavBar({
    
} : {
    
}){
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return(
        <div className="flex w-full h-fit py-4 px-6 border-b border-borderColor shadow-sm">
            <div className="flex justify-between items-center w-full">
                <p className="text-xl font-bold">Admin Portal</p>

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