import type { FileInput } from './request';

export interface CreateCommunityProps {
  name: string;
  image: FileInput;
  desc?: string;
  background: FileInput;
}
