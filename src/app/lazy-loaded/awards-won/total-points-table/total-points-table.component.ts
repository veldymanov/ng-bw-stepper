import { YearRankDto } from './../../../core/interfaces/year-rank-dto';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-points-table',
  templateUrl: './total-points-table.component.html',
  styleUrls: ['./total-points-table.component.scss']
})
export class TotalPointsTableComponent {

  @Input() tableInfo: YearRankDto;

}
