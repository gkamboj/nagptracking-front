import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(
    // private _location: Location,
  ) { }

  ngOnInit() {
  }

  goBack(){
    // console.log(this._location.ancestorOrigins);
    // this._location.back();
    // console.log(this._location.origin)

  }
}
