import { BaseDictionaryDto } from './base-dictionary-dto';
import { FileDto } from './file-dto';
import { TitleDto } from '../interfaces/title-dto';

export interface ContactDto extends BaseDictionaryDto {
  agency: string;
  dob: Date;
  city: string;
  country: string;
  email: string[];
  facebook: string;
  files: FileDto[];
  instagram: string;
  linkedin: string;
  name: string;
  phone: string[];
  portfolio: string;
  title: TitleDto;
  updated_at?: Date;
}
