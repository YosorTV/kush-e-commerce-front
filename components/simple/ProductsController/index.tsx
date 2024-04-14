'use client';

import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/elements';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { cn, createQueryString } from '@/lib';
import { useDebounce } from 'use-debounce';

export const ProductsController: FC<{
  className?: string;
  search?: any;
}> = ({ className, search }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchName = searchParams.get('name');

  const [searchValue, setSearchValue] = useState<string>(searchName || '');
  const [query] = useDebounce(searchValue, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (!query) {
      router.push(pathname);
    } else {
      router.push(`${pathname}?${createQueryString('name', query)}`);
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={cn(className)}>
      <Input
        type='text'
        className='w-96'
        label={search?.label}
        placeholder={search?.placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
