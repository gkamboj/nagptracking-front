import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-leveldetails',
  templateUrl: './leveldetails.component.html',
  styleUrls: ['./leveldetails.component.css']
})
export class LeveldetailsComponent implements OnInit {

  id: number;
  level:any;
  dataFromService:any;
  constructor(private route: ActivatedRoute,
    private levelService: LevelService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.levelService.getLevelByid(this.id)
      .subscribe(data=>{
        this.dataFromService = data;
        this.level = this.dataFromService.data;
      },
      err=>{

      })
  }

}
