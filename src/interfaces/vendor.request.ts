import type { FileInput } from './request';

export interface CreateVendorProps {
  name: string;
  description?: string;
  image?: FileInput;
  background?: FileInput;
}
