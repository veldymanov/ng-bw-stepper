import { AwardDto } from 'src/app/core/interfaces/award-dto';
import { YearRankDto } from './../../../core/interfaces/year-rank-dto';
import { Component, Input, OnInit, } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-points-by-show-table',
  templateUrl: './points-by-show-table.component.html',
  styleUrls: ['./points-by-show-table.component.scss']
})
export class PointsByShowTableComponent implements OnInit {

  displayedColumns: string[] = ['show', 'garndPrix', 'gold', 'silver', 'bronze'];

  @Input() tableInfo: YearRankDto;
  dataSource = new MatTableDataSource<AwardDto>();

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableInfo.awards);
  }
}
