import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { CampaignAgencyDto } from '../interfaces/campaign-agency-dto';
import { CampaignAgencyCreditsDto } from '../interfaces/campaign-agency-credits-dto';
import { CampaignSearchDto } from '../interfaces/campaign-search-dto';
import { CampaignDto } from '../interfaces/campaign-dto';
import { CampaignBaseDto } from '../interfaces/campaign-base-dto';
import { ClientCreditDto } from '../interfaces/client-credit-dto';
import { ProductionCreditsDto } from '../interfaces/production-credits-dto';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private handleError: HandleError;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.handleError = errorHandlerService.createHandleError('CampaignService');
  }

  getCampaings(filters: CampaignSearchDto = {}): Observable<CampaignDto[]> {
    const options = {
      params: this.httpService.setHttpParams(filters),
    };

    return this.http.get<CampaignDto[]>('/campaigns', options)
      .pipe(
        take(1),
        catchError(this.handleError('getCampaings')),
      );
  }

  getCampaing(campaignId: number): Observable<CampaignDto> {
    return this.http.get<CampaignDto[]>(`/campaigns/${campaignId}`)
      .pipe(
        take(1),
        catchError(this.handleError('getCampaing')),
      );
  }

  createOrUpdateCampaignAgencies(payload: CampaignAgencyDto[], campaignId: number): Observable<CampaignDto> {
    return this.http.post<CampaignDto>(`/campaigns/${campaignId}/agencies`, payload)
      .pipe(
        take(1),
        catchError(this.handleError('createOrUpdateCampaignAgencies')),
      );
  }

  createOrUpdateCampaignAgencyCredits(payload: CampaignAgencyCreditsDto): Observable<CampaignDto> {
    return this.http.post<CampaignDto>(`/campaigns/${payload.campaign_id}/agency-credits`, payload)
      .pipe(
        take(1),
        catchError(this.handleError('createOrUpdateCampaignAgencyCredits')),
      );
  }

  createOrUpdateCampaignBase(payload: CampaignBaseDto): Observable<CampaignDto> {
    return this.http.post<CampaignDto>('/campaigns', payload)
      .pipe(
        take(1),
        catchError(this.handleError('createOrUpdateBaseCampaign')),
      );
  }

  createOrUpdateCampaignClientCredits(
    campaignId: number, payload: ClientCreditDto[]
  ): Observable<CampaignDto> {
    return this.http.post<CampaignDto>(`/campaigns/${campaignId}/client-credits`, payload)
      .pipe(
        take(1),
        catchError(this.handleError('createOrUpdateCampaignClientCredits')),
      );
  }

  createOrUpdateCampaignProductionCredits(payload: ProductionCreditsDto): Observable<CampaignDto> {
    return this.http.post<CampaignDto>(`/campaigns/${payload.campaign_id}/production-credits`, payload)
      .pipe(
        take(1),
        catchError(this.handleError('createOrUpdateCampaignProductionCredits')),
      );
  }

}
