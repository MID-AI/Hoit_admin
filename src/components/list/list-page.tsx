import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function ListPage({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) {
  const itemsPerPage = 5;
  const currentGroup = Math.floor((page - 1) / itemsPerPage);
  const startPage = Math.max(currentGroup * itemsPerPage + 1, 1);
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href={page > 0 ? `?page=${page - 1}` : undefined}
          />
        </PaginationItem>
        {/* 현재 그룹의 페이지 번호 표시 */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((v) => (
          <PaginationItem key={v} value={v}>
            <PaginationLink href={`?page=${v - 1}`} isActive={page + 1 === v}>
              {v}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* Next 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={page + 1 < totalPages ? `?page=${page + 1}` : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
