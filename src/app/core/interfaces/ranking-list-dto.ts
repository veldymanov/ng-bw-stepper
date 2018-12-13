import { RankingDto } from './ranking-dto';
import { RankingRequestDto } from './ranking-request-dto';

export interface RankingListDto extends RankingRequestDto {
  items: RankingDto[];
}
