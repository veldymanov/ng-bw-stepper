import { AgencyDto } from './agency-dto';
import { BrandDto } from './brand-dto';
import { CampaignAgencyCreditDto } from './campaign-agency-credit-dto';
import { CampaignBaseDto } from './campaign-base-dto';
import { ClientCompanyDto } from './client-company-dto';
import { ClientCreditDto } from './client-credit-dto';
import { ProductionCreditDto } from './production-credit-dto';
import { CampaignAgencyDto } from './campaign-agency-dto';

export interface CampaignDto extends CampaignBaseDto {
  agency_credits: CampaignAgencyCreditDto[];
  client_credits: ClientCreditDto[];
  agencies: CampaignAgencyDto[];
  production_credits: ProductionCreditDto[];
}
