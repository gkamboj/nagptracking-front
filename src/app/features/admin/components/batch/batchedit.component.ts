import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../services/batch.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-batchedit',
  templateUrl: './batchedit.component.html',
  styleUrls: ['./batchedit.component.css']
})
export class BatcheditComponent implements OnInit {
  dataFromService: any;
  action: string = ' ';
  batch: any;
  id: number;
  technologies: any;
  editForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private batchService: BatchService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.editForm = this.fb.group({
      'year': ['', [Validators.required]],
      'batchTechnology': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'startDate': ['', [Validators.required]]
    });
    this.batchService.getBatchTechnologies()
    .subscribe(data => {
      this.dataFromService = data;
      this.technologies = this.dataFromService.data;
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
      this.batchService.getBatchByid(this.id)
        .subscribe(data => {
          this.dataFromService = data;
          this.batch = this.dataFromService.data;
          this.editForm = this.fb.group({
            'id': [this.batch.batchId],
            'year': [this.batch.year, [Validators.required]],
            'batchTechnology': [this.batch.batchTechnology, [Validators.required]],
            'description': [this.batch.description, [Validators.required]],
            'startDate': [this.batch.startDate, [Validators.required]]
          });
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          })
    }
  }

  onSubmit() {
    console.log(this.editForm.value.startDate)
    console.log(this.editForm.value.year)
    if (this.id === 0) {
      this.batchService.addBatch(this.editForm.value)
        .subscribe(data => {
          this.snackBar.open("Successfully Added", "OK", {
            duration: 3500
          });
          this.router.navigateByUrl("/admin/batches")
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    } else {
      this.batchService.editBatch(this.id, this.editForm.value)
        .subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
            this.snackBar.open("Batch details edited successfully!!", "OK", {
              duration: 3500
            });
            this.router.navigateByUrl("/admin/batches/" + this.id);
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          })
    }
  }

}
