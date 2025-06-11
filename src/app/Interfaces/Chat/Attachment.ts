import { MediaType } from './MediaType';

export interface Attachment {
  type: MediaType;
  url: string; // signed URL
}
