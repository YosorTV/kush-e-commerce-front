import { SignUpForm } from '@/components/forms';

export default async function LoginPage() {
  return (
    <div className='container flex flex-col items-center justify-center gap-y-5'>
      <div className='w-1/3'>
        <SignUpForm />
      </div>
    </div>
  );
}
