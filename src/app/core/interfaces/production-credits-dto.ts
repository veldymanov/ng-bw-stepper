import { ProductionCreditDto } from './production-credit-dto';

export interface ProductionCreditsDto {
  campaign_id: number;
  production_credits: ProductionCreditDto[];
}
