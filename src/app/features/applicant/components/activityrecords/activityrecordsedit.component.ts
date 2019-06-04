import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityrecordsService } from 'src/app/services/activityrecords.service';
import { MatSnackBar } from '@angular/material';
import { routableComponents } from 'src/app/app-routing.module';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-activityrecordsedit',
  templateUrl: './activityrecordsedit.component.html',
  styleUrls: ['./activityrecordsedit.component.css']
})
export class ActivityrecordseditComponent implements OnInit {

  editForm: FormGroup;
  dataFromService: any;
  record: any;
  recordId: number;
  statuses;
  id: number;
  disabled: boolean;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private activityRecordService: ActivityrecordsService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      'applicantActivityId': ['', [Validators.required]],
      'applicant': ['', [Validators.required]],
      'level': ['', [Validators.required]],
      'activity': ['', [Validators.required]],
      'percentage': ['', [Validators.required]],
      'activityStatus': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'startDate': ['', [Validators.required]],
      'doneDate': ['', [Validators.required]],
      'completionDate': ['', [Validators.required]]
    });
    
    this.activityRecordService.getActivityStatusValues()
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
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.recordId = +params.get('id');
        this.activityRecordService.getRecordById(this.recordId)
          .subscribe(data => {
            this.dataFromService = data;
            this.record = this.dataFromService.data;
            if (+this.record.applicant.applicant.userId != +sessionStorage.getItem('id')) {
              this.router.navigateByUrl('/pageDoesNotExist');
            } else {
              for (var i = 0; i < this.statuses.length; i++) {
                if (this.statuses[i] == this.record.activityStatus) {
                  this.editForm = this.fb.group({
                    'applicantActivityId': [this.record.applicantActivityId, [Validators.required]],
                    'applicant': [this.record.applicant.applicant.userId, [Validators.required]],
                    'level': [this.record.applicant.level.levelId, [Validators.required]],
                    'activity': [this.record.activity.activityId, [Validators.required]],
                    'percentage': [this.record.percentage, [Validators.required]],
                    'activityStatus': [this.statuses[i], [Validators.required]],
                    'description': [this.record.description, [Validators.required]],
                    'startDate': [this.record.startDate, [Validators.required]],
                    'doneDate': [this.record.doneDate, [Validators.required]],
                    'completionDate': [this.record.completionDate, [Validators.required]]
                  });
                  if (this.record.activityStatus == "APPROVAL_AWAITED" || this.record.activityStatus == "REVIEW_PENDING" ||
                    this.record.activityStatus == "COMPLETED" || this.record.activityStatus == "REVIEW_FAILED") {
                    this.disabled = true;
                  }
                  break;
                } else {
                  this.editForm = this.fb.group({
                    'applicantActivityId': [this.record.applicantActivityId, [Validators.required]],
                    'applicant': [this.record.applicant.applicant.userId, [Validators.required]],
                    'level': [this.record.applicant.level.levelId, [Validators.required]],
                    'activity': [this.record.activity.activityId, [Validators.required]],
                    'percentage': [this.record.percentage, [Validators.required]],
                    'activityStatus': [this.statuses[0], [Validators.required]],
                    'description': [this.record.description, [Validators.required]],
                    'startDate': [this.record.startDate, [Validators.required]],
                    'doneDate': [this.record.doneDate, [Validators.required]],
                    'completionDate': [this.record.completionDate, [Validators.required]]
                  });
                }
              }
            }
          })
      })

  }

  onSubmit() {
    console.log(this.editForm.value)
    var bodyToSend = {
      'applicantActivityId': this.editForm.value.applicantActivityId,
      'activityStatus': this.editForm.value.activityStatus,
      'description': this.editForm.value.description
    }
    this.activityRecordService.editRecordByApplicant(this.recordId,bodyToSend)
      .subscribe(data=>{
        this.matSnackBar.open("Update Successful!!","OK",{
          duration:3500
        });
        this.router.navigateByUrl('/applicant/records');
      },err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      })
  }

}
