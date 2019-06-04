import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  dataFromService: any;
  applicantProfile: any;
  constructor(
    private applicantService: ApplicantService,
    private snackBar: MatSnackBar
  ) { }
  id: number;
  ngOnInit() {
    this.id = +sessionStorage.getItem("id");
    this.applicantService.getApplicantProfileById(this.id)
      .subscribe(data=>{
        this.dataFromService = data;
        this.applicantProfile = this.dataFromService.data;
        console.log(this.applicantProfile);
      },
      err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
  }

}
