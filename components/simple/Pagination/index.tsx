'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn, createQueryString, getUrlParams } from '@/lib';

interface PaginationProps {
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  total?: number;
}

export const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  total,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page, per_page, ...params } = getUrlParams({ searchParams });

  const totalPages = useMemo(
    () => Math.ceil(total / +per_page),
    [total, per_page]
  );

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      const url = createQueryString(pathname, {
        ...params,
        page: pageNumber,
        per_page: per_page,
      });

      router.replace(url);
    },
    [params, pathname, per_page, router]
  );

  const renderPageButtons = useMemo(() => {
    const startPage = Math.max(
      1,
      Math.min(
        totalPages - Math.floor(+per_page / 2),
        +page - Math.floor(+per_page / 2)
      )
    );

    const endPage = Math.min(totalPages, startPage + +per_page - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;

      return (
        <button
          key={pageNumber}
          className={cn(
            'btn join-item border-neutral bg-neutral text-black',
            +page === pageNumber && 'btn-active bg-neutral text-white'
          )}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  }, [handlePageChange, page, per_page, totalPages]);

  useEffect(() => {
    const searchQuery = new URLSearchParams(searchParams);

    if (+page <= 0) {
      searchQuery.set('page', '1');
    }

    if (+per_page <= 0) {
      searchQuery.set('per_page', '5');
    }

    router.replace(`${pathname}?${searchQuery.toString()}`);
  }, [page, per_page, pathname, router, searchParams]);

  return (
    total > 0 && (
      <nav
        className='join flex flex-1 items-center justify-center'
        aria-label='pagination'
      >
        <button
          className='btn join-item border-neutral bg-neutral'
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(Number(page) - 1)}
        >
          «
        </button>
        {renderPageButtons}
        <button
          className='btn join-item border-neutral bg-neutral'
          disabled={!hasNextPage}
          onClick={() => handlePageChange(Number(page) + 1)}
        >
          »
        </button>
      </nav>
    )
  );
};
