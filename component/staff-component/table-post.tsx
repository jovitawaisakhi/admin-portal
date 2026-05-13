import { PostResponse } from "@/types/post";
import { Pagination, Table } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
    postData: PostResponse[]
}

export default function TablePost({postData} : Props){
    const ROWS_PER_PAGE = 5;
    const [page, setPage] = useState<number>(1);
    const totalPages = Math.ceil(postData.length / ROWS_PER_PAGE);
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return postData.slice(start, start + ROWS_PER_PAGE);
    }, [page, postData]);
    const start = (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, postData.length);

    useEffect(() => {
        if (page > totalPages) {
            setPage(1);
        }
    }, [postData, totalPages]);
    
    return(
        <div>
            <Table>
            <Table.ScrollContainer>
                <Table.Content
                    aria-label="Table Posts List">
                <Table.Header>
                    <Table.Column isRowHeader>Title</Table.Column>
                    <Table.Column isRowHeader>Description</Table.Column>
                </Table.Header>
                <Table.Body>
                    {paginatedItems.map((t) => (
                        <Table.Row key={t.id} id={t.id}>
                            <Table.Cell className="bg-primary dark:bg-surface">{t.title}</Table.Cell>
                            <Table.Cell className="bg-primary dark:bg-surface">{t.body}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
                    <Pagination size="sm">
                    <Pagination.Summary>
                        {start} to {end} of {postData.length} results
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
            </Table>
        </div>
    )
}