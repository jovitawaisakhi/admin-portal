"use client";

import { useAllStaffQuery } from "@/api/query/use-staff-query";
import TableStaff from "@/component/staff-component/tableStaff";
import NavBar from "@/component/ui/navbar";
import SearchBar from "@/component/ui/searchBar";
import SideBar from "@/component/ui/sidebar";
import React, { useState } from "react";

export default function AllStaff(){
    const { data, isLoading, error } = useAllStaffQuery();
    const [searchInput, setSearchInput] = useState<string>("");
    
    const searchData = React.useMemo(() => {
        if (!data) return [];

        return data.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.email.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [data, searchInput]);

    return(
        <div className="flex">
            <SideBar menu="All Staff"/>

            <div className="w-full">
                <NavBar />
                <div className="m-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-bold">All Staff List</p>
                            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
                        </div>
                        {searchData && (
                            <TableStaff
                                staff={searchData}
                                pageName="AllStaff"/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}