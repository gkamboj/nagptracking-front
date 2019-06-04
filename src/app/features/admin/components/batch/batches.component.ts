import { Component, OnInit } from '@angular/core';
import {BatchService } from '../../services/batch.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  batches: any[];
  datafromservice: any;
  size: number;
  numberOfCards: number;
  constructor(
    private batchService:BatchService,
    private snackBar: MatSnackBar
    ) {  }

  ngOnInit() {
    this.batchService.getAllBatches().
      subscribe(data => {
        this.datafromservice = data;
        this.batches = this.datafromservice.data;
        this.size = this.batches.length;
      },
      err => {
        this.snackBar.open(err.error.data, "Cancel", {
          duration: 3500,
          panelClass: "btn-danger"
        });
      })
  }
}
