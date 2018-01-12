import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms/src/directives';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  toRentSelected= 'all';
  whichlineSelected= 'all';
  housetypeSelected= 'all';
  swimmingpool: string;
  place: string;
  constructor(public dialogRef: MatDialogRef<SearchboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSearch(form: NgForm) {
      const value = form.value;
      if ( value.place === '') {
  this.place = 'anywhere';
      }else {
        this.place = value.place;
      }
      if (value.swimmingpool === '' || value.swimmingpool === false) {
        this.swimmingpool = 'false';
        }else {
          this.swimmingpool = 'true';
        }
        const searchData = {'where': this.place, 'swimmingpool': this.swimmingpool,
        'torent': value.torent, 'whichline': value.whichline, 'housetype': value.housetype};
      this.dialogRef.close(searchData);
      // tslint:disable-next-line:max-line-length
      this.router.navigate(['search/' + this.place + '/' +  this.swimmingpool + '/' + value.torent + '/' + value.whichline + '/' + value.housetype]);
  }
}
