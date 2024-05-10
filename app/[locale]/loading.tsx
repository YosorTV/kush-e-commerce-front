export default function Loading() {
  return (
    <div className='fixed inset-0 top-0 z-50 flex h-screen items-center justify-center bg-black'>
      <div className='h-12 w-12 animate-spin rounded-full border-t-4 border-pink-600' />
    </div>
  );
}
