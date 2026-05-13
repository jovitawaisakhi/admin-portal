"use client";

import { usePostQuery } from "@/api/query/use-post-query";
import { useAllStaffQuery } from "@/api/query/use-staff-query";
import { useToDoQuery } from "@/api/query/use-todo-query";
import StaffTable from "@/component/staff-component/table-staff/staff-table";
import TablePost from "@/component/staff-component/table-post";
import TableToDo from "@/component/staff-component/table-todo";
import NavBar from "@/component/ui/navbar";
import SideBar from "@/component/ui/sidebar";
import { SkeletonLoad } from "@/component/ui/skeleton-load";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function StaffDetails(){
    const currentStaffID = useParams();
    const { data: toDoData, isLoading: isLoadingToDo, error: toDoError } = useToDoQuery();
    const { data: postData, isLoading: isLoadingPost, error: postError } = usePostQuery();
    const { data: allStaffData, isLoading: isLoadingAllStaff, error: allStaffErr } = useAllStaffQuery();

    const [open, setOpen] = useState<boolean>(false);

    const currentData = allStaffData?.filter((item) => item.id === Number(currentStaffID.id));

    const filteredToDoData = React.useMemo(() => {
        if (!toDoData) return [];
        return toDoData.filter((item) => item.userId === Number(currentStaffID.id));
    }, [toDoData, currentStaffID]);

    const filteredPostData = React.useMemo(() => {
        if (!postData) return [];
        return postData.filter((item) => item.userId === Number(currentStaffID.id));
    }, [postData, currentStaffID]);

    return(
        <div className="flex min-h-dvh h-screen overflow-hidden">
            <SideBar isOpen={open} setIsOpen={setOpen} menu="All Staff"/>

            <div className="w-full overflow-y-auto">
                <NavBar open={open} setOpen={setOpen}/>
                <div className="m-6">
                    {currentData && (
                        <StaffTable staff={currentData[0]}/>
                    )}
                    <div className="space-y-2 mb-5">
                        <p className="text-xl font-bold mb-2">Post List</p>
                        {isLoadingPost ? (
                            <SkeletonLoad/>
                        ) : filteredPostData.length > 0 ? (
                            <TablePost postData={filteredPostData}/>
                        ) : (
                            <p>This staff has no post!</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="text-xl font-bold mb-2">To Do List</p>
                        {isLoadingToDo ? (
                            <SkeletonLoad/>
                        ) : filteredToDoData.length > 0 ? (
                            <TableToDo todoList={filteredToDoData}/>
                        ) : (
                            <p>This staff has no task to do!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}