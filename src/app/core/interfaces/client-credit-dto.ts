import { BaseDto } from './base-dto';
import { ContactDto } from './contact-dto';
import { TitleDto } from './title-dto';

export interface ClientCreditDto extends BaseDto {
  contact: ContactDto;
  title: TitleDto;
  campaign_id: number;
}
