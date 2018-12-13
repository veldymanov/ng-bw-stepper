import { RankingCategories } from '../enums/ranking-categories.enum';
import { AwardDto } from './award-dto';
import { BaseDictionaryDto } from './base-dictionary-dto';

export interface RankingRequestDto {
  top: number;
  category: RankingCategories;
  title: BaseDictionaryDto;
  awards: AwardDto[];
  year: string;
}
