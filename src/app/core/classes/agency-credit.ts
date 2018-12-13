import { ContactDto } from '../interfaces/contact-dto';
import { TitleDto } from '../interfaces/title-dto';

import { CampaignAgencyCreditDto } from '../interfaces/campaign-agency-credit-dto';

export class AgencyCredit {
  constructor(
    public contact: ContactDto,
    public title: TitleDto,
  ) {}
}
