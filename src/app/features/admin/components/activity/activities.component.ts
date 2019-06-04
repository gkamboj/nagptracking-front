import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities: any[];
  datafromService:any;
  size:number;
  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activityService.getAllActivities()
      .subscribe(data =>{
        this.datafromService = data;
        this.activities = this.datafromService.data;
        this.size = this.activities.length;
      });
  }

}
