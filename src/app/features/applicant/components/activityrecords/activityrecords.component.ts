import { Component, OnInit } from '@angular/core';
import { ActivityrecordsService } from 'src/app/services/activityrecords.service';

@Component({
  selector: 'app-activityrecords',
  templateUrl: './activityrecords.component.html',
  styleUrls: ['./activityrecords.component.css']
})
export class ActivityrecordsComponent implements OnInit {

  id:number;
  dataFromService:any;
  activityRecords:any[];
  constructor(
    private activityRecordService : ActivityrecordsService
  ) { }

  ngOnInit() {
    this.id = +sessionStorage.getItem("id");
    console.log(this.id);
    this.activityRecordService.getAllRecordsByApplicantId(this.id)
      .subscribe(data=>{
        this.dataFromService = data;
        this.activityRecords = this.dataFromService.data;
        console.log(this.activityRecords);
      })
  }

}
