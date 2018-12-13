
import { ContactDto } from '../interfaces/contact-dto';
import { TitleDto } from '../interfaces/title-dto';
import { ClientCreditDto } from '../interfaces/client-credit-dto';

import { CampaignAgencyCreditDto } from '../interfaces/campaign-agency-credit-dto';

export class ClientCredit {
  constructor(
    public campaign_id: number,
    public contact: ContactDto,
    public title: TitleDto,
    public id: number
  ) {}
}
