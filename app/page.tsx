import { getStrapiData } from "@/services/strapi";

export default async function Home() {
  const data = await getStrapiData('api/home-page');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home page
    </main>
  );
}
