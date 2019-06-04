import { Component, OnInit } from '@angular/core';
import {BatchService } from '../../services/batch.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-batchesdetails',
  templateUrl: './batchesdetails.component.html',
  styleUrls: ['./batchesdetails.component.css']
})
export class BatchesdetailsComponent implements OnInit {

  id: number;
  batch:any;
  dataFromService:any;
  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private batchService: BatchService
    ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.batchService.getBatchByid(this.id)
      .subscribe(data=>{
        this.dataFromService = data;
        this.batch = this.dataFromService.data;
      },
      err=>{
        this.snackBar.open(err.error.data,"Cancel",{
          duration: 3500,
          panelClass: "btn-danger"
        });
      });
  }

}
