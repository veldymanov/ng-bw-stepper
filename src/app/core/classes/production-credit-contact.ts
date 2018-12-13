import { ContactDto } from '../interfaces/contact-dto';
import { TitleDto } from '../interfaces/title-dto';

import { CampaignAgencyCreditDto } from '../interfaces/campaign-agency-credit-dto';

export class ProductionCreditContact {
  constructor(
    public contact: ContactDto,
    public id: number,
    public name: string,
    public title: TitleDto,
  ) {}
}
