import { ProductionCreditDto } from '../interfaces/production-credit-dto';
import { ProductionCreditContactDto } from '../interfaces/production-credit-contact-dto';
import { ProductionCreditType } from '../enums/production-credit-type.enum';

export class ProductionCredit {
  constructor(
    public city: string,
    public contacts: ProductionCreditContactDto[],
    public country: string,
    public id: number,
    public name: string,
    public type: ProductionCreditType,
  ) {}
}
