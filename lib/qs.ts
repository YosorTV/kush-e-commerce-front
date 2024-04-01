import qs from 'qs';

export const generateStrapiQuery = (props: any) => qs.stringify(props);
