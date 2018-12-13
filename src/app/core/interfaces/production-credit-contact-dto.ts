import { BaseDictionaryDto } from './base-dictionary-dto';
import { ContactDto } from './contact-dto';
import { TitleDto } from './title-dto';

export interface ProductionCreditContactDto extends BaseDictionaryDto {
  contact: ContactDto;
  title: TitleDto;
}
