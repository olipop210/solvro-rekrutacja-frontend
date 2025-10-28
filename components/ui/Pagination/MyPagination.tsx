import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationProps } from "@/lib/types";


const MyPagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({ setPage, page, totalPages }) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => { setPage(page > 1 ? page - 1 : 1) }} />
                </PaginationItem>
                {page > 1 ? <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> : null}
                <PaginationItem>
                    <PaginationLink onClick={() => { setPage(page > 1 ? page == totalPages ? page - 2 : page - 1 : totalPages) }} isActive={page == 1} className={'hover:cursor-pointer'}>{page < totalPages ? page == 1 ? 1 : page - 1 : page - 2}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className={'hover:cursor-pointer'} isActive={page != 1 && page != totalPages}>
                        {page > 1 ? page == totalPages ? page - 1 : page : 2}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem >
                    <PaginationLink className={'hover:cursor-pointer'} onClick={() => setPage(page < totalPages ? page == 1 ? page + 2 : page - 1 : 1)} isActive={page == totalPages}>{page > 1 ? page == totalPages ? page : page + 1 : page + 2}</PaginationLink>
                </PaginationItem>
                {page < totalPages ? <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> : null}
                <PaginationItem>
                    <PaginationNext onClick={() => { setPage(page < totalPages ? page + 1 : totalPages) }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default MyPagination;