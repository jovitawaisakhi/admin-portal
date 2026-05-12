"use client";

import { usePostQuery } from "@/api/query/use-post-query";
import { useToDoQuery } from "@/api/query/use-todo-query";
import TablePost from "@/component/staff-component/table-post";
import TableToDo from "@/component/staff-component/table-todo";
import NavBar from "@/component/ui/navbar";
import SideBar from "@/component/ui/sidebar";
import { useParams } from "next/navigation";
import React from "react";

export default function StaffDetails(){
    const currentStaffID = useParams();
    const { data: toDoData, isLoading: toDoLoading, error: toDoError } = useToDoQuery();
    const { data: postData, isLoading: postLoading, error: postError } = usePostQuery();

    const filteredToDoData = React.useMemo(() => {
        if (!toDoData) return [];
        return toDoData.filter((item) => item.userId === Number(currentStaffID.id));
    }, [toDoData, currentStaffID]);

    const filteredPostData = React.useMemo(() => {
        if (!postData) return [];
        return postData.filter((item) => item.userId === Number(currentStaffID.id));
    }, [postData, currentStaffID]);



    return(
        <div className="flex">
            <SideBar menu=""/>

            <div className="w-full">
                <NavBar/>
                <div className="m-6 space-y-5">
                    <div className="space-y-2">
                        <p className="text-lg font-bold">To Do List</p>
                        {filteredToDoData.length > 0 ? (
                            <TableToDo todoList={filteredToDoData}/>
                        ) : (
                            <p>This staff has no task to do!</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg font-bold">Posts List</p>
                        {filteredToDoData.length > 0 ? (
                            <TablePost postData={filteredPostData}/>
                        ) : (
                            <p>This staff has no task to do!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}