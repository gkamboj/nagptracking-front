import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activitydetails',
  templateUrl: './activitydetails.component.html',
  styleUrls: ['./activitydetails.component.css']
})
export class ActivitydetailsComponent implements OnInit {

  id: number;
  activity:any;
  dataFromService:any;
  constructor(private route: ActivatedRoute,
    private activityService:ActivityService
    ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.activityService.getActivityById(this.id)
      .subscribe(data=>{
        this.dataFromService = data;
        this.activity = this.dataFromService.data;
      },
      err=>{

      });
  }

}
