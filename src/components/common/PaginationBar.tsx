import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import type { PaginationData } from "@/lib/types.ts";
export default function PaginationBar({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationData) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage! > 1) {
                handlePageChange(currentPage! - 1);
              }
            }}
            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
          />
        </PaginationItem>
        {totalPages! > 1 ? (
          <>
            {currentPage! > 3 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage! > 3 && <PaginationEllipsis />}
            {Array.from({ length: 3 }, (_, i) => currentPage! - 1 + i)
              .filter((page) => page > 0 && page <= totalPages!)
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {currentPage! < totalPages! - 2 && <PaginationEllipsis />}
            {currentPage! < totalPages! - 2 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(totalPages!);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
          </>
        ) : (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage!);
              }}
              isActive={true}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage! < totalPages!) {
                handlePageChange(currentPage! + 1);
              }
            }}
            className={
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
