import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityrecordsService } from 'src/app/services/activityrecords.service';
import { MatSnackBar } from '@angular/material';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recordsdetails',
  templateUrl: './recordsdetails.component.html',
  styleUrls: ['./recordsdetails.component.css']
})
export class RecordsdetailsComponent implements OnInit {

  dataFromService: any;
  record: any;
  id: number;
  recordId: number;
  isValid: boolean;
  editForm: FormGroup;
  disabled: boolean;
  statuses;
  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private activityRecordService: ActivityrecordsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activityRecordService.getActivityStatusValues()
      .subscribe(data => {
        this.dataFromService = data;
        this.statuses = this.dataFromService.data;
      },
        err => {
          this.snackBar.open(err.error.data, "Cancel", {
            duration: 3500,
            panelClass: "btn-danger"
          });
        });

    this.id = +this.activateRoute.snapshot.paramMap.get("id");

    this.activateRoute.paramMap.subscribe(params => {
      this.id = +params.get("id");
      this.recordId = +this.activateRoute.snapshot.paramMap.get("recordId");
      console.log()
      this.activityRecordService.getRecordById(this.recordId)
        .subscribe(data => {
          this.dataFromService = data;
          this.record = this.dataFromService.data;
          if (this.record.applicant.applicant.userId != this.id) {
            this.snackBar.open("Applicant and Activity don't match! Try Again", "OK", {
              duration: 3500
            })
            this.router.navigateByUrl('/admin/applicants');
          }

          for (var i = 0; i < this.statuses.length; i++) {
            if (this.statuses[i] == this.record.activityStatus) {
              this.editForm = this.fb.group({
                'applicantActivityId': [this.record.applicantActivityId, [Validators.required]],
                'applicant': [this.record.applicant.applicant, [Validators.required]],
                'level': [this.record.applicant.level.levelId, [Validators.required]],
                'activity': [this.record.activity.activityId, [Validators.required]],
                'percentage': [this.record.percentage, [Validators.required]],
                'activityStatus': [this.record.activityStatus, [Validators.required]],
                'description': [this.record.description, [Validators.required]],
                'startDate': [this.record.startDate, [Validators.required]],
                'doneDate': [this.record.doneDate, [Validators.required]],
                'completionDate': [this.record.completionDate, [Validators.required]]
              });
              if (this.record.activityStatus == "PLANNED" || this.record.activityStatus == "IN_PROGRESS" ||
                this.record.activityStatus == "COMPLETED" || this.record.activityStatus == "REVIEW_FAILED") {
                this.disabled = true;
              }
              break;
            } else {
              this.editForm = this.fb.group({
                'applicantActivityId': [this.record.applicantId, [Validators.required]],
                'applicant': [this.record.applicant.applicant, [Validators.required]],
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
        });
    });
  }


  onSubmit() {
    console.log(this.editForm.value);
    var assignor;
    var bodyToSend;
    
    if (this.editForm.value.activityStatus === "PLANNED" && this.record.activityStatus != "PLANNED") {
      bodyToSend = {
        'applicantActivityId': this.editForm.value.applicantActivityId,
        'percentage': this.editForm.value.percentage,
        'activityStatus': this.editForm.value.activityStatus,
        'description': this.editForm.value.description,
        'startDate': this.editForm.value.startDate,
        'doneDate': this.editForm.value.doneDate,
        'assignor': {
          'userId': +sessionStorage.getItem('id')
        },
        'document': []
      }
    } else {
      bodyToSend = {
        'activityStatus': this.editForm.value.activityStatus,
        'description': this.editForm.value.description,
        'assignor': {
          'userId': +sessionStorage.getItem('id')
        },
        'document': [],
        'applicantActivityId': this.editForm.value.applicantActivityId,
        'percentage': this.editForm.value.percentage,
        'startDate': this.editForm.value.startDate
      }
    }
    this.activityRecordService.editRecord(this.recordId, bodyToSend)
      .subscribe(data => {
        this.dataFromService = data;
        this.snackBar.open("Record edited successfully!!", "OK", {
          duration: 3500
        });
        this.router.navigateByUrl('/admin/applicants/' + this.id + '/record')
      },
        err => {
          this.snackBar.open(err.error.data, "Cancel", {
            duration: 3500,
            panelClass: "btn-danger"
          });
        })
  }

}
