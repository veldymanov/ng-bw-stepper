import { BaseDictionaryDto } from './base-dictionary-dto';
import { YearRankDto } from './year-rank-dto';

export class RankingDto {
  ranks: YearRankDto[];
  name: string;
  item: BaseDictionaryDto;
  is_contact?: boolean;
}
