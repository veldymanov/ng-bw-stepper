import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductionCreditContact } from '../../../../core/classes/production-credit-contact';
import { TITLES } from '../../../../core/constants/title-const';
import { ProductionCreditType } from '../../../../core/enums/production-credit-type.enum';
import { ContactDto } from '../../../../core/interfaces/contact-dto';
import { ProductionCreditContactDto } from '../../../../core/interfaces/production-credit-contact-dto';
import { FormsService } from '../../../../core/services/forms.service';
import { LocationService } from '../../../../core/services/location.service';

export const ContactFAsNames = [
  'directorsFA',
  'directorsOfPhotographyFA',
  'producersFA',
  'editorsFA',
  'coloristsFA',
  'composersFA'
];

@Component({
  selector: 'app-production-credit-sub-form',
  templateUrl: './production-credit-sub-form.component.html',
  styleUrls: ['./production-credit-sub-form.component.scss']
})
export class ProductionCreditSubFormComponent implements OnInit, OnDestroy {

  @Input() public productionCreditcontrol: FormGroup;

  public contactFAs: FormArray[];
  public contactFAsNames: string[] = ContactFAsNames;
  public contactFAsAreActive: boolean[];
  public Titles = TITLES;

  private colorists: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Colorist.id, name: TITLES.Colorist.name}
    )
  ];
  private composers: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Composer.id, name: TITLES.Composer.name}
    )
  ];
  private directors: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Director.id, name: TITLES.Director.name}
    )
  ];
  private editors: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Editor.id, name: TITLES.Editor.name}
    )
  ];
  private directorsOfPhotography: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.DirectorOfPhotography.id, name: TITLES.DirectorOfPhotography.name}
    )
  ];
  private photographers: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Photographer.id, name: TITLES.Photographer.name}
    )
  ];
  private producers: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Producer.id, name: TITLES.Producer.name}
    )
  ];
  private retouchers: ProductionCreditContactDto[] = [
    new ProductionCreditContact(
      {name: ''} as ContactDto,
      null, '',
      {id: TITLES.Retoucher.id, name: TITLES.Retoucher.name}
    )
  ];

  get coloristsFA(): FormArray { return this.productionCreditcontrol.get('coloristsFA') as FormArray; }
  get composersFA(): FormArray { return this.productionCreditcontrol.get('composersFA') as FormArray; }
  get directorsFA(): FormArray { return this.productionCreditcontrol.get('directorsFA') as FormArray; }
  get directorsOfPhotographyFA(): FormArray { return this.productionCreditcontrol.get('directorsOfPhotographyFA') as FormArray; }
  get editorsFA(): FormArray { return this.productionCreditcontrol.get('editorsFA') as FormArray; }
  get photographersFA(): FormArray { return this.productionCreditcontrol.get('photographersFA') as FormArray; }
  get producersFA(): FormArray { return this.productionCreditcontrol.get('producersFA') as FormArray; }
  get retouchersFA(): FormArray { return this.productionCreditcontrol.get('retouchersFA') as FormArray; }

  get coloristsAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.PostProduction;
  }
  get composersAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.AudioProduction;
  }
  get directorsAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.FilmProduction;
  }
  get directorsOfPhotographyAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.FilmProduction;
  }
  get editorsAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.FilmProduction;
  }
  get photographersAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.PhotoProduction;
  }
  get producersAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.AudioProduction
      || this.productionCreditcontrol.value.type === ProductionCreditType.DigitalProduction
      ||  this.productionCreditcontrol.value.type === ProductionCreditType.FilmProduction
      || this.productionCreditcontrol.value.type === ProductionCreditType.PhotoProduction
      || this.productionCreditcontrol.value.type === ProductionCreditType.PostProduction;
  }
  get retouchersAreActive(): boolean {
    return this.productionCreditcontrol.value.type === ProductionCreditType.PhotoProduction;
  }

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    this.setValuesForControls();
    this.formUpdate();

    this.contactFAs = [
      this.directorsFA,
      this.directorsOfPhotographyFA,
      this.producersFA,
      this.editorsFA,
      this.coloristsFA,
      this.composersFA
    ];

    this.contactFAsAreActive = [
      this.directorsAreActive,
      this.directorsOfPhotographyAreActive,
      this.producersAreActive,
      this.editorsAreActive,
      this.coloristsAreActive,
      this.composersAreActive
    ];
  }

  ngOnDestroy(): void {
  }

  public controlAdd(fa: FormArray): void {
    fa.push(this.fb.group({
      contact: [{name: ''}],
      id: [null],
      name: ['', [Validators.required]],
      title: [fa.value[0].title, []],
    }));

    fa.markAsDirty();
    this.formsService.markFormGroupTouched(fa);
  }

  public controlRemove(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
    this.productionCreditcontrol.markAsDirty();
  }

  public enableProductionCreditcontrol(name: string): void {
    name.length
      ? this.formsService.formGroupEnable(this.productionCreditcontrol, ['name'])
      : this.formsService.formGroupDisable(this.productionCreditcontrol, ['name']);
  }

  private formUpdate(): void {
    switch (this.productionCreditcontrol.value.type) {
      case ProductionCreditType.AudioProduction:
        this.setControls(this.producers, 'producersFA');
        this.setControls(this.composers, 'composersFA');
        break;
      case ProductionCreditType.DigitalProduction:
        this.setControls(this.producers, 'producersFA');
        break;
      case ProductionCreditType.FilmProduction:
        this.setControls(this.directors, 'directorsFA');
        this.setControls(this.directorsOfPhotography, 'directorsOfPhotographyFA');
        this.setControls(this.editors, 'editorsFA');
        this.setControls(this.producers, 'producersFA');
        break;
      case ProductionCreditType.PhotoProduction:
        this.setControls(this.photographers, 'photographersFA');
        this.setControls(this.producers, 'producersFA');
        this.setControls(this.retouchers, 'retouchersFA');
        break;
      case ProductionCreditType.PostProduction:
        this.setControls(this.colorists, 'coloristsFA');
        this.setControls(this.producers, 'producersFA');
        break;
    }

    this.formsService.markFormGroupTouched(this.productionCreditcontrol);
  }

  private setValuesForControls(): void {
    if (
      !!this.productionCreditcontrol.getRawValue().contactsRawData
      && this.productionCreditcontrol.getRawValue().contactsRawData.length
    ) {
      const colorists: ProductionCreditContactDto[] = this.productionCreditcontrol
        .getRawValue().contactsRawData
        .filter((credit: ProductionCreditContactDto) => credit.title.id === TITLES.Colorist.id);
      const composers: ProductionCreditContactDto[] = this.productionCreditcontrol
        .getRawValue().contactsRawData
        .filter((credit: ProductionCreditContactDto) => credit.title.id === TITLES.Composer.id);
      const editors: ProductionCreditContactDto[] = this.productionCreditcontrol
        .getRawValue().contactsRawData
        .filter((credit: ProductionCreditContactDto) => credit.title.id === TITLES.Editor.id);
      const directors: ProductionCreditContactDto[] = this.productionCreditcontrol
        .getRawValue().contactsRawData
        .filter((credit: ProductionCreditContactDto) => credit.title.id === TITLES.Director.id);
      const directorsOfPhotography: ProductionCreditContactDto[] = this.productionCreditcontrol
        .getRawValue().contactsRawData
        .filter((credit: ProductionCreditContactDto) => credit.title.id === TITLES.DirectorOfPhotography.id);
      const producers: ProductionCreditContactDto[] = this.productionCreditcontrol
        .getRawValue().contactsRawData
        .filter((credit: ProductionCreditContactDto) => credit.title.id === TITLES.Producer.id);

      if (!!colorists.length) { this.colorists = colorists; }
      if (!!composers.length) { this.composers = composers; }
      if (!!editors.length) { this.editors = editors; }
      if (!!directors.length) { this.directors = directors; }
      if (!!directorsOfPhotography.length) { this.directorsOfPhotography = directorsOfPhotography; }
      if (!!producers.length) { this.producers = producers; }
    }
  }

  private setControls(
    values: ProductionCreditContactDto[],
    faName: string,
    fg: FormGroup = this.productionCreditcontrol
  ): void {
    const formGroups = values.map((value: ProductionCreditContactDto) => {
      return this.fb.group({
        contact: [value.contact ? value.contact : {name: ''}],
        id: [value.id],
        name: [
          {
            value: value.contact.name,
            disabled: !fg.parent.value[0].name
          },
          []
        ],
        title: [value.title, []],
      });
    });

    const formArray = this.fb.array(formGroups);
    fg.setControl(faName, formArray);
  }
}
