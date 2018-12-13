import { Injectable } from '@angular/core';

import { CampaignSearchDto } from '../interfaces/campaign-search-dto';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  public currentFilters: CampaignSearchDto = {};

  constructor() { }
}
