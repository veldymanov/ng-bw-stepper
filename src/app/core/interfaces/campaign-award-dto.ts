import { AwardDto } from './award-dto';
import { BaseDto } from './base-dto';

export interface CampaignAwardDto extends BaseDto {
  award: AwardDto;
  award_id: number;
  bronze: number;
  gold: number;
  grand_prix: number;
  silver: number;
}
