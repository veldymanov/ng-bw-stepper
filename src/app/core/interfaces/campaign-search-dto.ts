import { SearchBaseDto } from './search-base-dto';

export interface CampaignSearchDto extends SearchBaseDto {
  award_id?: number;
  name?: string;
  year?: number;
}
