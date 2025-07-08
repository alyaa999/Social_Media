import { MediaType, Privacy } from '../feed/enums';
import { Media } from './media';

export interface PostCreateDto {
  Content: string;
  Privacy: Privacy;
  MediaType: MediaType;
  Media: Media[];
}
