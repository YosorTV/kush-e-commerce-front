'use client';

import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

interface IModal {
  id: string;
  className?: string;
}

const Modal: FC<PropsWithChildren<IModal>> = ({ id = 'my_modal_3', children, className }) => {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dialogRef.current = document.getElementById(id) as HTMLDialogElement;

    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [id, pathname]);

  return (
    <dialog ref={dialogRef} id={id} className='modal'>
      <div className={cn('modal-box', className)}>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
