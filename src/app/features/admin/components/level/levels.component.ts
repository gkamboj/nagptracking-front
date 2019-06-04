import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level.service';

@Component({
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  levels: any[];
  datafromservice: any;
  size: number;
  numberOfCards: number;
  constructor(private levelService: LevelService) { }

  ngOnInit() {
    this.levelService.getAllLevels().
      subscribe(data => {
        this.datafromservice = data;
        this.levels = this.datafromservice.data;
        this.size = this.levels.length;
      })
  }

}
