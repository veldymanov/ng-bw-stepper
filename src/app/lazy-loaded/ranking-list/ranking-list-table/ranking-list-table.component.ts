import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CampaignSearchDto } from '../../../core/interfaces/campaign-search-dto';
import { RankingRequestDto } from 'src/app/core/interfaces/ranking-request-dto';
import { MatTableDataSource } from '@angular/material';
import { RankingDto } from 'src/app/core/interfaces/ranking-dto';
import { RankingService } from 'src/app/core/services/ranking.service';

@Component({
    selector: 'app-ranking-list-table',
    templateUrl: './ranking-list-table.component.html',
    styleUrls: ['./ranking-list-table.component.scss']
})
export class RankingListTableComponent implements OnChanges, OnInit {

  @Input() private filters: RankingRequestDto;

  public loading = false;

  displayedColumns: string[] = ['rank', 'name', 'points'];
  dataSource = new MatTableDataSource<RankingDto>([]);

  constructor(
    private rankingService: RankingService,
  ) { }

  ngOnInit(): void {
    if (this.rankingService.items) {
      this.dataSource = new MatTableDataSource(this.rankingService.items.items);
    }
  }

  ngOnChanges(): void {
    if (this.filters && this.filters.category) {
      this.loading = true;
      this.rankingService.getRanks(this.filters)
      .subscribe(
        (res) => {
          console.log(res.items);
          this.dataSource = new MatTableDataSource(res.items);
          this.loading = false;
        },
        err => this.loading = false,
      );
    }
  }
}
