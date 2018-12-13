import { AgencyDto } from './agency-dto';
import { BaseDictionaryDto } from './base-dictionary-dto';

export interface CampaignAgencyDto {
  agency: AgencyDto;
  city: BaseDictionaryDto;
  country: BaseDictionaryDto;
  network?: string;
}
