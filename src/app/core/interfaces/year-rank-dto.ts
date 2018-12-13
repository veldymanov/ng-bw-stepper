import { AwardDto } from './award-dto';

export interface YearRankDto {
  year: string;
  rank: number;
  points: number;
  awards: AwardDto[];
}
