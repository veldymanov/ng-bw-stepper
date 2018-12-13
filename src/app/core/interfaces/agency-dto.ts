import { AgencyType } from '../enums/agency-type.enum';
import { BaseDictionaryDto } from './base-dictionary-dto';

export interface AgencyDto extends BaseDictionaryDto {
  type: AgencyType;
}
