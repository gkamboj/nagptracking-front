import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.css']
})
export class ApplicantdetailsComponent implements OnInit {

  id: number;
  applicant:any;
  dataFromService:any;
  constructor(private route: ActivatedRoute,
    private applicantService:ApplicantService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.applicantService.getApplicantById(this.id)
      .subscribe(data=>{
        this.dataFromService = data;
        this.applicant = this.dataFromService.data;
      },
      err=>{
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
  }

}
