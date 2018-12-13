import { RankingListDto } from './../../core/interfaces/ranking-list-dto';
import { ActivatedRoute } from '@angular/router';
import { RankingDto } from './../../core/interfaces/ranking-dto';
import { Component } from '@angular/core';
import { RankingService } from 'src/app/core/services/ranking.service';


@Component({
  selector: 'app-awards-won',
  templateUrl: './awards-won.component.html',
  styleUrls: ['./awards-won.component.scss']
})
export class AwardsWonComponent {

  public loading = false;
  public items:  RankingListDto;
  public item: RankingDto;

  constructor(
    private rankingService: RankingService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.items = this.rankingService.items;

    const id: number = this.activatedRoute.snapshot.queryParams['itemId'];

    this.item = this.items.items.find(p => p.item.id === +id);
    console.log(this.item);
   }
}
