import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { FormGroup } from '@angular/forms';
import { ActivityrecordsService } from 'src/app/services/activityrecords.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities: any[];
  activity: any;
  applicant: any;
  datafromService: any;
  records: any;
  id: number;
  bodyToSend;
  isValid: boolean;
  constructor(
    private activityService: ActivityService,
    private applicantService: ApplicantService,
    private activityRecordService: ActivityrecordsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.id = +sessionStorage.getItem("id");

    this.activityService.getActivityForLevelAndBatch(this.id)
      .subscribe(data => {
        this.datafromService = data;
        this.activities = this.datafromService.data;
        console.log(this.activities);
        this.activityRecordService.getAllRecordsByApplicantId(this.id)
          .subscribe(data => {
            this.datafromService = data;
            this.records = this.datafromService.data;
          });
      });
  }



  apply($event) {
    if ($event.target.value != undefined) {
      var id = $event.target.value;
      var exist: boolean = false;
      this.activityService.getActivityById(id)
        .subscribe(data => {
          this.datafromService = data;
          this.activity = this.datafromService.data;
          // for (let record of this.records) {
          //   if (record.activity.activityId == id) {
          //     alert("You have already applied for this");
          //     exist = true;
          //     break;
          //   }
          // }
          if (!exist) {
            var bodyToSend = {
              'applicant': {
                'applicantId': this.id,
              },
              'level': {
                'levelId': this.activity.level.levelId
              },
              'activity': {
                'activityId': this.activity.activityId
              },
              'assignor': {
                'userId': this.id
              },
              'activityStatus': 'PLANNED',
              'percentage': 0,
              'points': 0,
              'description': 'Sample Description'
            }
            this.activityRecordService.addRecord(bodyToSend)
              .subscribe(data => {
                this.datafromService = data;
                this.snackBar.open("Successfully applied for the activity", "OK", {
                  duration: 3500
                });
                this.router.navigateByUrl('/applicant/records');
              }, err => {
                this.snackBar.open(err.error.data,"Cancel",{
                  duration: 3500,
                  panelClass: "btn-danger"
                });
              })
          }
        })
    }
  }
}
