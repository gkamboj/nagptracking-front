import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantService } from 'src/app/services/applicant.service';
import { MatSnackBar } from '@angular/material';
import { LevelService } from '../../services/level.service';
import { BatchService } from '../../services/batch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-editapplicant',
  templateUrl: './editapplicant.component.html',
  styleUrls: ['./editapplicant.component.css']
})
export class EditapplicantComponent implements OnInit {
  id: number;
  action: string = ' ';
  applicant: any;
  dataFromService: any;
  levels: any[];
  batches: any[];
  editForm: FormGroup;
  isAdd: boolean;
  statuses;
  roles: any;
  Requiredrole: any;
  constructor(
    private route: ActivatedRoute,
    private applicantService: ApplicantService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private levelService: LevelService,
    private batchService: BatchService
  ) { }

  ngOnInit() {

    this.id = +this.route.snapshot.paramMap.get("id");
    this.editForm = this.fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'contactNo': ['', [Validators.required]],
      'nagpStatus': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'batch': ['', [Validators.required]],
      'level': ['', [Validators.required]]
    });

    this.applicantService.getNAGPStatusValues()
      .subscribe(data => {
        this.dataFromService = data;
        this.statuses = this.dataFromService.data;
      }, err => {
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
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
      this.action = 'Add ';
      this.isAdd = true;
    } else {
      this.action = 'Edit ';
      this.isAdd = false;
      this.applicantService.getApplicantById(this.id)
        .subscribe(data => {
          this.dataFromService = data;
          this.applicant = this.dataFromService.data;
          this.editForm = this.fb.group({
            'id': [this.applicant.applicant.userId, [Validators.required]],
            'name': [this.applicant.applicant.name, [Validators.required]],
            'email': [this.applicant.applicant.email, [Validators.required]],
            'contactNo': [this.applicant.applicant.contactNo, [Validators.required]],
            'nagpStatus': [this.statuses[0], [Validators.required]],
            'password': [this.applicant.applicant.password, [Validators.required]],
            'batch': [this.applicant.batch.batchId, [Validators.required]],
            'level': [this.applicant.level.levelId, [Validators.required]]
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
        'applicant': {
          'name': this.editForm.value.name,
          'email': this.editForm.value.email,
          'contactNo': this.editForm.value.contactNo,
          'password': this.editForm.value.password,
          'userType': "applicant"
        },
        'nagpStatus': "ASPIRING",
        'batch': {
          'batchId': this.editForm.value.batch
        }
      }
      this.applicantService.addApplicant(bodyToSend)
        .subscribe(data => {
          this.snackBar.open("Applicant added succesfully. An email has been sent with the registration details.", "OK", {
            duration: 3500
          })
          this.router.navigateByUrl('/admin/applicants');
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    } else {
      bodyToSend = {
        'applicant': {
          'userId': this.id,
          'name': this.editForm.value.name,
          'email': this.editForm.value.email,
          'contactNo': this.editForm.value.contactNo,
          'password': this.editForm.value.password,
          'userType': "applicant"
        },
        'batch': {
          'batchId': this.editForm.value.batch
        },
        'level' : {
          'levelId': this.editForm.value.level
        },
        'nagpStatus': this.editForm.value.nagpStatus
      }
      this.applicantService.editApplicant(this.id, bodyToSend)
        .subscribe(data => {
          this.dataFromService = data;
          this.snackBar.open("Applicant edited successfully!!", "OK", {
            duration: 3500
          })
          this.router.navigateByUrl('/admin/applicants/' + this.id);
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    }
  }


}
