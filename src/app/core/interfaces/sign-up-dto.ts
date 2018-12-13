import { CredentialsDto } from './credentials-dto';

export interface SignUpDto extends CredentialsDto {
  first_name: string;
  last_name: string;
}
