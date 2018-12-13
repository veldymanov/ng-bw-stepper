import { PagedDataBaseDto } from './paged-data-base-dto';

export interface SearchBaseDto extends PagedDataBaseDto {
  query?: string;
}
