"use client";

import { usePostQuery } from "@/api/query/use-post-query";
import { useAllStaffQuery } from "@/api/query/use-staff-query";
import { useToDoQuery } from "@/api/query/use-todo-query";
import CardInfo from "@/component/staff-component/card-info";
import { CardStaff } from "@/component/staff-component/card-staff";
import TableStaff from "@/component/staff-component/table-staff";
import NavBar from "@/component/ui/navbar";
import SearchBar from "@/component/ui/searchBar";
import SideBar from "@/component/ui/sidebar";
import { SkeletonLoad } from "@/component/ui/skeleton-load";
import { ArrowRight, ClipboardCheck, ClipboardClock, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
    const { data: allStaffData, isLoading: isLoadingAllStaff, error: errAllStaff } = useAllStaffQuery();
    const { data: toDoData, isLoading: isLoadingToDo, error: errToDo } = useToDoQuery();
    const { data: postData, isLoading: isLoadingPost, error: errPost } = usePostQuery();
    const [searchInput, setSearchInput] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const totalPosts = postData?.length;
    const totalPending = toDoData?.filter((item) => item.status === "Pending").length;
    const totalCompleted = toDoData?.filter((item) => item.status === "Completed").length;
    
    const searchData = React.useMemo(() => {
        if (!allStaffData) return [];

        return allStaffData.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.email.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [allStaffData, searchInput]);

    return (
        <div className="flex min-h-dvh h-screen overflow-hidden">
            <SideBar isOpen={open} setIsOpen={setOpen} menu="Dashboard"/>
            <div className="w-full overflow-y-auto">
                <NavBar open={open} setOpen={setOpen}/>
                <div className="m-6 space-y-5">
                    <div className="space-y-5 sm:flex sm:space-x-5">
                        <CardInfo icon={MessageSquarePlus} text="Total Posts" total={totalPosts} bgIcon="bg-blue-100" iconColor="text-blue-600"/>
                        <CardInfo icon={ClipboardCheck} text="Completed Task" total={totalPending} bgIcon="bg-green-100" iconColor="text-green-600"/>
                        <CardInfo icon={ClipboardClock} text="Pending To Do" total={totalCompleted} bgIcon="bg-orange-100" iconColor="text-orange-600"/>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center mb-5">
                            <p className="text-xl font-bold">Staff List</p>
                            <div className="flex items-center space-x-2">
                                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
                                <Link href="/staff" className="text-sm bg-primary px-4 py-2 rounded-xl font-bold">
                                    View More
                                </Link>
                            </div>
                        </div>
                        {isLoadingAllStaff && (
                            <SkeletonLoad/>
                        )}

                        {errAllStaff && (
                            <p>Failed to load staff!</p>
                        )}

                        {!isLoadingAllStaff &&
                            !errAllStaff &&
                            searchData.length === 0 && (
                                <p>No staff found!</p>
                            )}

                        {!isLoadingAllStaff &&
                            !errAllStaff &&
                            searchData.length > 0 && (
                                <>
                                    <TableStaff
                                        staff={searchData}
                                        pageName="Dashboard"
                                    />
    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                        {searchData.slice(0,5).map((item) => (
                                            <CardStaff key={item.id} staff={item}/>
                                        ))}
                                    </div>
                                </>
                        )}
                    </div>
                </div>
            </div>
        </div>
  );
}
