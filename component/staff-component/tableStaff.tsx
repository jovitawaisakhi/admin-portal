import { Staff } from "@/types/staff";
import { Pagination, Table } from "@heroui/react";
import { Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Props{
    staff: Staff[],
    pageName: string,
}

export default function TableStaff({staff, pageName} : Props){
    const ROWS_PER_PAGE = 5;
    const enablePagination = pageName === "Dashboard";
    const [page, setPage] = useState<number>(1);
    const totalPages = Math.ceil(staff.length / ROWS_PER_PAGE);
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    const paginatedItems = useMemo(() => {
        if (!enablePagination) return staff;

        const start = (page - 1) * ROWS_PER_PAGE;
        return staff.slice(start, start + ROWS_PER_PAGE);
    }, [page, staff, enablePagination]);
    const start = (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, staff.length);

    useEffect(() => {
        if (page > totalPages) {
            setPage(1);
        }
    }, [staff, totalPages]);

    return(
        <div className="mt-5">
            <Table className="bg-primary">
                <Table.ScrollContainer>
                <Table.Content aria-label="Staff table">
                    <Table.Header>
                        <Table.Column isRowHeader>No.</Table.Column>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column isRowHeader>Email</Table.Column>
                        <Table.Column isRowHeader>Website</Table.Column>
                        <Table.Column isRowHeader>Action</Table.Column>
                    </Table.Header>
                    <Table.Body items={paginatedItems}>
                        {paginatedItems && paginatedItems.map((s) => (
                            <Table.Row key={s.id}>
                                <Table.Cell className="bg-primary dark:bg-surface hover:bg-gray-300 dark:hover:bg-tableDark">{s.id}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface hover:bg-gray-300 dark:hover:bg-tableDark">{s.name}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface hover:bg-gray-300 dark:hover:bg-tableDark">{s.email}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface hover:bg-gray-300 dark:hover:bg-tableDark">{s.website}</Table.Cell>
                                <Table.Cell className="bg-primary dark:bg-surface hover:bg-gray-300 dark:hover:bg-tableDark">
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