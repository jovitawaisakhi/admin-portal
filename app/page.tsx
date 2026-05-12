"use client";

import { usePostQuery } from "@/api/query/use-post-query";
import { useAllStaffQuery } from "@/api/query/use-staff-query";
import { useToDoQuery } from "@/api/query/use-todo-query";
import CardInfo from "@/component/staff-component/card-info";
import TableStaff from "@/component/staff-component/tableStaff";
import NavBar from "@/component/ui/navbar";
import SearchBar from "@/component/ui/searchBar";
import SideBar from "@/component/ui/sidebar";
import { ClipboardCheck, ClipboardClock, MessageSquarePlus } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
    const { data: allStaffData, isLoading: allStaffLoad, error: allStaffErr } = useAllStaffQuery();
    const { data: toDoData, isLoading: toDoLoading, error: toDoError } = useToDoQuery();
    const { data: postData, isLoading: postLoading, error: postError } = usePostQuery();
    const [searchInput, setSearchInput] = useState<string>("");
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
    <div className="flex">
      <SideBar menu="Dashboard"/>
      <div className="w-full">
          <NavBar />
          <div className="m-6 space-y-5">
              <div className="flex justify-between">
                  <CardInfo icon={MessageSquarePlus} text="Total Posts" total={totalPosts} bgIcon="bg-blue-100" iconColor="text-blue-600"/>
                  <CardInfo icon={ClipboardCheck} text="Completed Task" total={totalPending} bgIcon="bg-green-100" iconColor="text-green-600"/>
                  <CardInfo icon={ClipboardClock} text="Pending To Do" total={totalCompleted} bgIcon="bg-orange-100" iconColor="text-orange-600"/>
              </div>
              <div className="space-y-2">
                  <div className="flex justify-between items-center">
                      <p className="text-lg font-bold">All Staff List</p>
                      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
                  </div>
                  {searchData && (
                    <TableStaff 
                      staff={searchData}
                      pageName="Dashboard"
                      />
                  )}
              </div>
          </div>
      </div>
        </div>
  );
}
