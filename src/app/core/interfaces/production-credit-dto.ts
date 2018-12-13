import { BaseDictionaryDto } from './base-dictionary-dto';
import { ProductionCreditContactDto } from './production-credit-contact-dto';
import { ProductionCreditType } from '../enums/production-credit-type.enum';

export interface ProductionCreditDto extends BaseDictionaryDto {
  city: string;
  contacts: ProductionCreditContactDto[];
  country: string;
  name: string;
  type: ProductionCreditType;
}
