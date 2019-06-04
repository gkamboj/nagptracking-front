import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  dataFromService: any;
  applicantProfile: any;
  editForm: FormGroup;
  isEdit: boolean;
  id: number;
  constructor(
    private applicantService: ApplicantService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.id = +sessionStorage.getItem("id");
    this.isEdit = false;
    this.applicantService.getApplicantProfileById(this.id)
      .subscribe(data => {
        this.dataFromService = data;
        this.applicantProfile = this.dataFromService.data;
        this.editForm = this.fb.group({

          'id': [this.applicantProfile.applicant.applicant.userId, [Validators.required]],
          'name': [this.applicantProfile.applicant.applicant.name, [Validators.required]],
          'email': [this.applicantProfile.applicant.applicant.email, [Validators.required]],
          'password': [this.applicantProfile.applicant.applicant.password, [Validators.required]],
          'contactNo': [this.applicantProfile.applicant.applicant.contactNo, [Validators.required]],
          'batch': [this.applicantProfile.applicant.batch.batchId, [Validators.required]],
          'level': [this.applicantProfile.applicant.level.levelId, [Validators.required]],
          'accumulatedPoints': [this.applicantProfile.accumulatedPoints, [Validators.required]],
          'requiredPoints': [this.applicantProfile.requiredPoints, [Validators.required]],
          'nagpStatus': [this.applicantProfile.applicant.nagpStatus, [Validators.required]]
        });
      },
        err => {

        });
  }

  onSubmit() {
    this.isEdit = !this.isEdit;
    var bodyToSend = {
      'applicant': {
        'userId': this.applicantProfile.applicant.applicant.userId,
        'name': this.editForm.value.name,
        'password': this.editForm.value.password,
        'contactNo': this.editForm.value.contactNo
      },
      'nagpStatus': this.applicantProfile.applicant.nagpStatus,
    }
    this.applicantService.editApplicantByApplicant(this.id, bodyToSend)
      .subscribe(data => {
        this.dataFromService = data;
          this.snackBar.open("Profile edited successfully!!", "OK", {
            duration: 3500
          })
      },
        err => {
          this.snackBar.open(err.error.data, "Cancel", {
            duration: 3500,
            panelClass: "btn-danger"
          });
        });
  }
}
