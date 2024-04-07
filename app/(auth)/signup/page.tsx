import { SignUpForm } from '@/components/forms';

export default async function SignUpPage() {
  return (
    <div className='container flex h-full flex-col items-center justify-center gap-y-5'>
      <div className='w-1/3'>
        <SignUpForm />
      </div>
    </div>
  );
}
