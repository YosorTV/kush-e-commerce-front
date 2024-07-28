import { IImageFormats } from '../elements';

export interface IStrapiImageProps {
  loading?: 'lazy' | 'eager';
  id?: string;
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  priority?: boolean;
  formats?: IImageFormats;
  fill?: boolean;
}
