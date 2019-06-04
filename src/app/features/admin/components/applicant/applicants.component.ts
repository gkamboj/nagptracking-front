import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants: any[];
  datafromService:any;
  size:number;
  pageNo: number;
  pageSize: number;
  constructor(
    private applicantService: ApplicantService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.applicantService.getAllApplicants(1, 100)
      .subscribe(data =>{
        this.datafromService = data;
        this.applicants = this.datafromService.data;
        this.size = this.applicants.length;
      },
      err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
  }

}
