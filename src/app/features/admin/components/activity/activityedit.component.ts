import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LevelService } from '../../services/level.service';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-activityedit',
  templateUrl: './activityedit.component.html',
  styleUrls: ['./activityedit.component.css']
})
export class ActivityeditComponent implements OnInit {
  id: number;
  action: string = ' ';
  activity: any;
  levels: any[];
  batches: any[];
  dataFromService: any;
  editForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private levelService: LevelService,
    private batchService: BatchService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.editForm = this.fb.group({
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'maxQualificationTimes': ['', [Validators.required]],
      'points': ['', [Validators.required]],
      'batch': ['', [Validators.required]],
      'level': ['', [Validators.required]]
    });
    this.levelService.getAllLevels()
      .subscribe(data => {
        this.dataFromService = data;
        this.levels = this.dataFromService.data;
      }, err => {
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
    this.batchService.getAllBatches()
      .subscribe(data => {
        this.dataFromService = data;
        this.batches = this.dataFromService.data;
      }, err => {
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
    if (this.id === 0) {
      this.action = 'Add';

    } else {
      this.action = 'Edit';
      this.activityService.getActivityById(this.id)
        .subscribe(data => {
          this.dataFromService = data;
          this.activity = this.dataFromService.data;
          this.editForm = this.fb.group({
            'id': [this.activity.activityId, [Validators.required]],
            'name': [this.activity.name, [Validators.required]],
            'description': [this.activity.description, [Validators.required]],
            'maxQualificationTimes': [this.activity.maxQualificationTimes, [Validators.required]],
            'points': [this.activity.points, [Validators.required]],
            'batch': [this.activity.batch.batchId, [Validators.required]],
            'level': [this.activity.level.levelId, [Validators.required]]
          });
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    }

  }

  onSubmit() {
    var bodyToSend;
    if (this.id === 0) {
      bodyToSend = {
        'name': this.editForm.value.name,
        'description': this.editForm.value.description,
        'maxQualificationTimes': this.editForm.value.maxQualificationTimes,
        'points': this.editForm.value.points,
        'batch': {
          'batchId': this.editForm.value.batch
        },
        'level': {
          'levelId': this.editForm.value.level
        }
      }
      this.activityService.addActivity(bodyToSend)
        .subscribe(data => {
          this.snackBar.open("Activity added successfully!!", "OK", {
            duration: 3500
          })
          this.router.navigateByUrl("/admin/activities")
        },
          err => {
            this.snackBar.open(err.error.data,"Cancel",{
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    } else {
      bodyToSend = {
        'activityId': this.id,
        'name': this.editForm.value.name,
        'description': this.editForm.value.description,
        'maxQualificationTimes': this.editForm.value.maxQualificationTimes,
        'points': this.editForm.value.points,
        'level': {
          'levelId': this.editForm.value.level
        },
        'batch': {
          'batchId': this.editForm.value.batch
        }
      }
      this.activityService.editActivity(this.id, bodyToSend)
        .subscribe(data => {
          this.dataFromService = data;
          this.snackBar.open("Activity edited successfully!!", "close", {
            duration: 3500
          })
          this.router.navigateByUrl("/admin/activities/" + this.id)
        },
          err => {
            this.snackBar.open(err.error.data,"Cancel",{
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    }
  }
}
