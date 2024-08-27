import { cn } from '@/lib';
import { FC, PropsWithChildren } from 'react';

interface IModal {
  id: string;
  className?: string;
}

const Modal: FC<PropsWithChildren<IModal>> = ({ id = 'my_modal_3', children, className }) => {
  return (
    <dialog id={id} className='modal'>
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
