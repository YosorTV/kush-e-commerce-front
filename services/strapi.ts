import { getData } from "@/lib/fetch"

export const getStrapiData = async (api:string) => {
  const response = await getData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${api}`)
  return response;
}