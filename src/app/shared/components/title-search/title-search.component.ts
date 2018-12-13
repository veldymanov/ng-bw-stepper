
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ContactService } from '../../../core/services/contact.service';
import { TitleDto } from '../../../core/interfaces/title-dto';


@Component({
  selector: 'app-title-search',
  templateUrl: 'title-search.component.html',
  styleUrls: ['title-search.component.scss'],
})
export class TitleSearchComponent implements OnInit, OnDestroy {

  @Input() public creditFG: FormGroup;
  @Input() public creditTitleFC: FormControl;
  @Input() public creditTitleFcKey: string; // Not in use yet.
  @Input() public creditTitleNameFC: FormControl;
  @Input() public creditTitleNameFcKey: string;

  titles$: Observable<TitleDto[]>;
  private titlesTermsSubject$ = new Subject<string>();

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.titles$ = this.titlesTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.contactService.getConactsTitles({query: term, limit: 5});
      }),
      catchError(error => of<TitleDto[]>([]))
    );
  }

  ngOnDestroy() {
    this.titlesTermsSubject$.complete();
  }

  public titleCheck() {
    if (this.creditTitleNameFC.value) {
      if (this.creditTitleNameFC.value !== this.creditTitleFC.value.name) {
        this.creditTitleFC.patchValue({});
        this.creditTitleNameFC.patchValue(null);
      }
    }
  }

  public titleChoose(title: TitleDto) {
    this.creditTitleFC.patchValue(title);
    this.creditTitleNameFC.patchValue(title.name);
  }

  public  titlesSearch(term: string) {
    this.titlesTermsSubject$.next(term);
  }
}
