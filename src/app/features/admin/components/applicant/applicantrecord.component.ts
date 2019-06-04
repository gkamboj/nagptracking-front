import { Component, OnInit } from '@angular/core';
import { ActivityrecordsService } from 'src/app/services/activityrecords.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-applicantrecord',
  templateUrl: './applicantrecord.component.html',
  styleUrls: ['./applicantrecord.component.css']
})
export class ApplicantrecordComponent implements OnInit {

  id: number;
  dataFromService: any;
  records: any;
  statuses: any;
  editForm: FormGroup;
  selectedStatus: any;
  constructor(
    private activityRecords: ActivityrecordsService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    
    this.activityRecords.getActivityStatusValues()
      .subscribe(data => {
        this.dataFromService = data;
        this.statuses = this.dataFromService.data;
      },
      err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
    
    this.id = +this.activateRoute.snapshot.paramMap.get("id");
    this.activityRecords.getAllRecordsByApplicantId(this.id)
      .subscribe(data => {
        this.dataFromService = data;
        this.records = this.dataFromService.data;
      },
      err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
  }

}
