import { NgxCarousel } from 'ngx-carousel';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-favhousesdtl',
  templateUrl: './favhousesdtl.component.html',
  styleUrls: ['./favhousesdtl.component.css']
})
export class FavhousesdtlComponent implements OnInit {
  houseDtl: any;
  public carouselOne: NgxCarousel;
  sliderData: any;
  checkinDateReadable: string;
  checkOutDateReadable: string;
  constructor(public dialogRef: MatDialogRef<FavhousesdtlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.houseDtl = data.houseDetail;
    }

  ngOnInit() {
    this.sliderData = this.houseDtl.photosGalaryURLs;
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner',

    };
  }

}
