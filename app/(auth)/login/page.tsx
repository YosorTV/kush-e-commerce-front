import { NextLink } from '@/components/elements';
import { SignInForm } from '@/components/forms';

export default async function LoginPage() {
  return (
    <div className='container flex flex-col items-center justify-center gap-y-5'>
      <div className='w-1/3'>
        <SignInForm />
      </div>
      <NextLink href='/signup' className='link link-primary'>
        Create a new account
      </NextLink>
    </div>
  );
}
