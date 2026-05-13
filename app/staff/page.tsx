"use client";

import { useAllStaffQuery } from "@/api/query/use-staff-query";
import { CardStaff } from "@/component/staff-component/card-staff";
import TableStaff from "@/component/staff-component/table-staff";
import NavBar from "@/component/ui/navbar";
import SearchBar from "@/component/ui/searchBar";
import SideBar from "@/component/ui/sidebar";
import { SkeletonLoad } from "@/component/ui/skeleton-load";
import { useMemo, useState } from "react";

export default function AllStaff() {
    const { data, isLoading, error } = useAllStaffQuery();

    const [searchInput, setSearchInput] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [open, setOpen] = useState<boolean>(false);

    const searchData = useMemo(() => {
        if (!data) return [];

        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.email.toLowerCase().includes(searchInput.toLowerCase())
        );

        return filtered.sort((a, b) =>
            sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
    }, [data, searchInput, sortAsc]);

    return (
        <div className="flex min-h-dvh h-screen overflow-hidden">
            <SideBar isOpen={open} setIsOpen={setOpen} menu="All Staff" />

            <div className="w-full overflow-y-auto">
                <NavBar open={open} setOpen={setOpen}/>

                <div className="m-6 space-y-4">
                    <div className="flex justify-between items-center mb-5">
                        <p className="text-lg font-bold">
                            All Staff List
                        </p>

                        <div className="flex gap-2">
                            <SearchBar
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                            />
                        </div>
                    </div>

                    {isLoading && (
                        <SkeletonLoad/>
                    )}

                    {error && (
                        <p>Failed to load staff.</p>
                    )}

                    {!isLoading &&
                        !error &&
                        searchData.length === 0 && (
                            <p>No staff found.</p>
                        )}

                    {!isLoading &&
                        !error &&
                        searchData.length > 0 && (
                            <>
                                <TableStaff
                                    staff={searchData}
                                    pageName="AllStaff"
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    {searchData.map((item) => (
                                        <CardStaff key={item.id} staff={item}/>
                                    ))}
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
}