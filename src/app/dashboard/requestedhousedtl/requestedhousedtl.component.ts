import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HouseService } from '../../services/house.service';
import { NgxCarousel } from 'ngx-carousel';
@Component({
  selector: 'app-requestedhousedtl',
  templateUrl: './requestedhousedtl.component.html',
  styleUrls: ['./requestedhousedtl.component.css']
})
export class RequestedhousedtlComponent implements OnInit {
BookingDtl: any;
houseId: string;
houseDtl: any;
public carouselOne: NgxCarousel;
sliderData: any;
checkinDateReadable: string;
checkOutDateReadable: string;
  constructor(public dialogRef: MatDialogRef<RequestedhousedtlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private housesService: HouseService) {
      this.BookingDtl = data.houseDetail;
      this.houseId = data.houseDetail.houseId;
      console.log(this.BookingDtl);
     }

  ngOnInit() {
    const checkInDateValue = new Date(this.BookingDtl.dates.checkInDate);
    const checkOutDateValue = new Date(this.BookingDtl.dates.checkOutDate);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    // tslint:disable-next-line:max-line-length
    this.checkinDateReadable = monthNames[checkInDateValue.getMonth()] + ' ' + checkInDateValue.getDate() + ', ' + checkInDateValue.getFullYear();
    // tslint:disable-next-line:max-line-length
    this.checkOutDateReadable = monthNames[checkOutDateValue.getMonth()] + ' ' + checkOutDateValue.getDate() + ', ' + checkOutDateValue.getFullYear();
    this.housesService.findIndHouseDetail(this.houseId)
    .subscribe(snapshots => {
    this.houseDtl = snapshots;
    this.sliderData = snapshots.photosGalaryURLs;
    console.log( this.houseDtl);

    });
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}
