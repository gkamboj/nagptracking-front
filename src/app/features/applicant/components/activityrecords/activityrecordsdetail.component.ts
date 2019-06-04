import { Component, OnInit } from '@angular/core';
import { ActivityrecordsService } from 'src/app/services/activityrecords.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activityrecordsdetail',
  templateUrl: './activityrecordsdetail.component.html',
  styleUrls: ['./activityrecordsdetail.component.css']
})
export class ActivityrecordsdetailComponent implements OnInit {

  constructor(
    private activityRecordService: ActivityrecordsService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }
  id: any;
  dataFromService:any;
  record:any;
  ngOnInit() {
    this.id = +this.router.snapshot.paramMap.get("id");
    console.log("hi   "+this.id)
    this.activityRecordService.getRecordById(this.id)
      .subscribe((data)=>{
        this.dataFromService = data;
        this.record = this.dataFromService.data;
      },err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      })
  }

}
