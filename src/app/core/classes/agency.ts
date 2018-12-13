import { AgencyDto } from '../interfaces/agency-dto';
import { AgencyType } from '../enums/agency-type.enum';

export class Agency {
  constructor(
    public city: string,
    public country: string,
    public id: number,
    public name: string,
    public type: AgencyType,
  ) {}
}
