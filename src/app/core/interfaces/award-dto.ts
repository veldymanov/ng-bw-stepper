import { BaseDictionaryDto } from './base-dictionary-dto';

export interface AwardDto extends BaseDictionaryDto {
  bronze_value: number;
  gold_value: number;
  grand_prix_value: number;
  silver_value: number;
}
