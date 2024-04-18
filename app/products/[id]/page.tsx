import { Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';

export default async function ProductDetails({ params }: any) {
  const productDetailsQP = generateStrapiQuery(
    STRAPI_API_ROUTES.getProductDetails
  );

  const data = await getStrapiData(`products/${params.id}`, productDetailsQP);

  const printImages = (images: any[]) => {
    return (
      images?.length && (
        <div className='col-start-1 grid w-full grid-cols-fluid gap-2.5'>
          {images.map((img) => (
            <StrapiImage
              key={img.id}
              height={1000}
              width={1000}
              src={img.url}
              alt={img.alternativeText}
              className='h-full w-full object-cover'
            />
          ))}
        </div>
      )
    );
  };

  return (
    <section className='h-full'>
      <div className='relative grid h-full grid-cols-2 gap-x-2'>
        {printImages(data.images.data)}
        <div className='fixed -z-10 col-start-2 flex h-full flex-col bg-slate-200 px-5'>
          <div className='gap-y- flex flex-col'>
            <Title level='2' className='text-2xl font-bold text-black'>
              {data.title}
            </Title>
            <p className='text-base text-gray-700'>{data.description}</p>
            <p className='mt-2 text-lg font-semibold text-gray-700'>
              ${data.price}
            </p>
          </div>
          <button className='btn btn-primary my-2.5 text-white'>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
