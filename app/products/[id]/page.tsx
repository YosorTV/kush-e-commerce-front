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
      <div className='col-start-1 grid grid-cols-fluid gap-2.5'>
        {images?.length > 0
          ? images.map((img) => (
              <StrapiImage
                key={img.id}
                height={1000}
                width={1000}
                src={img.url}
                alt={img.alternativeText || `Image-${img.id}`}
                className='h-full w-full object-cover'
              />
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <StrapiImage
                key={index}
                height={1000}
                width={1000}
                src={null}
                alt={null}
                className='h-full w-full object-cover'
              />
            ))}
      </div>
    );
  };

  return (
    <section className='grid h-full grid-cols-2 gap-x-2'>
      {printImages(data.images.data)}
      <div className='relative col-start-2 flex flex-col bg-slate-200'>
        <div className='fixed flex h-full max-h-[86vh] w-1/2 flex-col justify-between gap-y-5 px-5 pr-10'>
          <div className='flex flex-col gap-y-5'>
            <Title level='2' className='text-2xl font-bold text-black'>
              {data.title}
            </Title>
            <p className='text-base text-gray-700'>{data.description}</p>
            <p className='text-lg font-semibold text-gray-700'>
              Price: ${data.price}
            </p>
          </div>
          <button className='btn btn-primary text-white'>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
