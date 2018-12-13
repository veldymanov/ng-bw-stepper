import { BaseDictionaryDto } from './base-dictionary-dto';
import { CampaignAwardDto } from './campaign-award-dto';
import { BrandDto } from './brand-dto';
import { ClientCompanyDto } from './client-company-dto';

export interface CampaignBaseDto extends BaseDictionaryDto {
  awards: CampaignAwardDto[];
  brand: BrandDto;
  client_company: ClientCompanyDto;
  year: string;
}
