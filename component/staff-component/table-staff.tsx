import { StaffResponse } from "@/types/staff";
import { cn, Pagination, SortDescriptor, Table } from "@heroui/react";
import { ArrowDown, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Props{
    staff: StaffResponse[],
    pageName: string,
}

function SortableColumnHeader({
    children,
    sortDirection,
}: {
    children: React.ReactNode;
    sortDirection?: "ascending" | "descending";
}) {
return (
    <span className="flex items-center justify-between">
    {children}
    {!!sortDirection && (
        <ArrowDown className={cn(
            "size-3 transform transition-transform duration-100 ease-out",
            sortDirection === "descending" ? "rotate-180" : "",
        )}/>
    )}
    </span>
);
};

export default function TableStaff({staff, pageName} : Props){
    const ROWS_PER_PAGE = 5;
    const enablePagination = pageName === "Dashboard";

    const [page, setPage] = useState<number>(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    const sortedUsers = useMemo(() => {
        return [...staff].sort((a, b) => {
        const col = sortDescriptor.column as keyof StaffResponse;
        const first = String(a[col] ?? "");
        const second = String(b[col] ?? "");
        let cmp = first.localeCompare(second);
        if (sortDescriptor.direction === "descending") {
            cmp *= -1;
        }
        return cmp;
        });
    }, [staff, sortDescriptor]);

    const totalPages = Math.max(1, Math.ceil(sortedUsers.length / ROWS_PER_PAGE));

    useEffect(() => {
        if (page > totalPages) {
            setPage(1);
        }
    }, [page, totalPages]);

    const displayedItems = useMemo(() => {
        if (!enablePagination) return sortedUsers;

        const start = (page - 1) * ROWS_PER_PAGE;
        return sortedUsers.slice(start, start + ROWS_PER_PAGE);
    }, [page, sortedUsers, enablePagination]);

    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    const start = (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, sortedUsers.length);

    return(
        <div className="hidden md:block mt-5">
            <Table>
                <Table.ScrollContainer>
                <Table.Content aria-label="Staff table"
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Column isRowHeader allowsSorting id="name">
                            {({sortDirection}) => (
                                <SortableColumnHeader sortDirection={sortDirection}>Name</SortableColumnHeader>
                            )}
                        </Table.Column>
                        <Table.Column isRowHeader allowsSorting id="email">
                            {({sortDirection}) => (
                                <SortableColumnHeader sortDirection={sortDirection}>Email</SortableColumnHeader>
                            )}
                        </Table.Column>
                        <Table.Column isRowHeader>Website</Table.Column>
                        <Table.Column isRowHeader>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {displayedItems && displayedItems.map((s) => (
                            <Table.Row key={s.id}>
                                <Table.Cell className="bg-primary dark:bg-surface">{s.name}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface">{s.email}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface">{s.website}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface">
                                    <div className="flex items-center">
                                        <Link href={`/staff-details/${s.id}`}>
                                            <Info size={16} />
                                        </Link>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
                </Table.ScrollContainer>
                {enablePagination && (
                    <Table.Footer>
                        <Pagination size="sm">
                        <Pagination.Summary>
                            {start} to {end} of {staff.length} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1}
                                onPress={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                <Pagination.PreviousIcon />
                                Prev
                            </Pagination.Previous>
                            </Pagination.Item>
                            {pages.map((p) => (
                            <Pagination.Item key={p}>
                                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                {p}
                                </Pagination.Link>
                            </Pagination.Item>
                            ))}
                            <Pagination.Item>
                            <Pagination.Next
                                isDisabled={page === totalPages}
                                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                            >
                                Next
                                <Pagination.NextIcon />
                            </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                        </Pagination>
                    </Table.Footer>
                )}
            </Table>
        </div>
    )
}