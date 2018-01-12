import { PhoneconfirmComponent } from '../login/phoneconfirm/phoneconfirm.component';
import { NgForm } from '@angular/forms/src/directives';
import { SearchboxComponent } from '../home/searchbox/searchbox.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { GalleryComponent } from './gallery/gallery.component';
import { House } from '../services/house';
import { HouseService } from './../services/house.service';
import { BookingService } from '../services/booking.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { NgxCarousel } from 'ngx-carousel';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { element } from 'protractor';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  houseId: any;
  bookingStatus: any;
  bookingSubsData: any;
  d = new Date();
  lat: number;
  lng: number;
  zooom = 12;
  houseDetail: House[] = [];
  minDate: any;
  maxDate: any;
  checkInDateValue: any;
  staticcheckedin: any;
  checkOutDateValue: any;
  bookingAvalibility= true;
  selectedNights: number;
  bookingDates= [];
  showProgress= true;
  allHouseId = [];
  toRentSelected= 'all';
  whichlineSelected= 'all';
  housetypeSelected= 'all';
  swimmingpool: string;
  place: string;

  public carouselTileItems: any;
  public carouselforSimilarHouse: NgxCarousel;
  constructor(private route: ActivatedRoute, private bookingService: BookingService, private housesService: HouseService,
    private daterangepickerOptions: DaterangepickerConfig, public dialog: MatDialog,
    public afAuth: AngularFireAuth, private router: Router ) {
      this.houseId = this.route.snapshot.params['houseId']; // catch houseId from url
     }

  ngOnInit() {
    let finalData = [];
    const bookingData = [];



    // Booking calendar
    this.minDate = new Date(); // set today as minimum date i.e. to disable the date before today
    this.maxDate = new Date(); // make maximumdate object
    // system will alow booked only three months so calendar will disabled after 3 months
   this.maxDate.setDate(this.minDate.getDate() + 90);
// Apply genearal settings for calendar
this.daterangepickerOptions.settings = {
  locale: {
    format: 'YYYY-MM-DD',
    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
   },
   alwaysShowCalendars: true,
   single: false,
   standalone: true,
  minDate: this.minDate,
  maxDate: this.maxDate,
  showDropdowns: true,
autoApply: true,
showWeekNumbers: true,
singleDatePicker: true,

};



    this.housesService.findIndHouseDetail(this.houseId)
    .subscribe(snapshots => {
      finalData = snapshots;
      this.housesService.findIndHouseBookingDetail(this.houseId)
      .subscribe( bookingSnapShots => {
        if (bookingSnapShots) {
          finalData['price'] = this.housesService.getOneNightPrice(bookingSnapShots);
        }else {
          finalData['price'] = 0;
        }
     this.lat = finalData['Latitude'];
     this.lng = finalData['Longitude'];
     this.houseDetail = finalData;
     this.showProgress = false;

     });
    });



    // caresole slider
    this.carouselTileItems = this.getAllHouses();
       this.carouselforSimilarHouse = {
         grid: {xs: 1, sm: 1, md: 2, lg: 3, all: 0},
         slide: 2,
         speed: 400,
         interval: 4000,
         animation: 'lazy',
         point: {
           visible: true
         },
         load: 2,
         touch: true,
         easing: 'ease',
         loop: true
       };
  }
  public getAllHouses(): any {

    const allHousesPhoto = [];
    this.housesService.findAllHouses()
    .subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      if (snapshot['Bool'] === 'true') {
  allHousesPhoto.push(snapshot['photosGalaryURLs'][0]);
  this.allHouseId.push(snapshot['houseId']);
      }
    });


    });

    return allHousesPhoto;
  }
  // function to get selected checkin and checkout date from datepicker
public checkInDate(value: any, datepicker?: any) {
    this.checkInDateValue = new Date(value.start);
    this.staticcheckedin = new Date(value.start);
    if (this.checkInDateValue && this.checkOutDateValue) {
    this.bookingValidation();
    }
  }
  public checkOutDate(value: any, datepicker?: any) {
    this.checkOutDateValue = new Date(value.start);
    if (this.checkInDateValue && this.checkOutDateValue) {
      this.bookingValidation();
      }
    }
    private bookingValidation() {
      this.bookingDates = [];
      let intermediateDate = this.checkInDateValue;
      const oneDay = 24 * 60 * 60 * 1000; // one day in millisecond
      const d = new Date();
      const errorCorrection = (24 - d.getHours()) * 60 * 60 * 100;

    // tslint:disable-next-line:max-line-length
    this.selectedNights = Math.ceil((Math.abs((this.staticcheckedin.getTime() - this.checkOutDateValue.getTime()) + errorCorrection) / (oneDay)));
    for ( let i = 1; i <= this.selectedNights; i++) {
      let loopcounter = 1;
  if (i <= 1) {
  loopcounter = i;
  }
      intermediateDate.setDate(intermediateDate.getDate() + loopcounter);
   const year = intermediateDate.getYear();
   const month = intermediateDate.getMonth();
   const day = intermediateDate.getDay();
   const bookingdate = month + '/' + intermediateDate.getDate() + '/' + intermediateDate.getFullYear();
   this.bookingDates.push(bookingdate);
   const weekNumber = this.getWeekNumber(this.d, year, month, day);
  const realday = day + 1;
  const fullYear = intermediateDate.getFullYear();
   this.bookingService.getBookingDatesForSelectedHouse(this.houseId, fullYear, weekNumber, realday)
   .subscribe(result => {
     if (result != null) {
  if (result['booked'] === 'true') {
  this.bookingAvalibility = false;
  }
}
   });
    }
    intermediateDate.setDate(intermediateDate.getDate() - this.selectedNights);
    }
    getWeekNumber(d, year, month, day) {
      d = new Date(Date.UTC(year, month, day));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const WeekNo = Math.ceil(( ((d - yearStart ) / 86400000) + 1) / 7);
    return WeekNo;
    }
    openGallerySlider(photoUrls: any) {
      const dialogRef = this.dialog.open(GalleryComponent, {
        height: '800px',
        data: { photourls: photoUrls}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    paymentProcess(houseId: string, checkinDate: any, checkoutDate: any) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          if (!user.phoneNumber) {
            let dialogRef = this.dialog.open(PhoneconfirmComponent, {
              width: '400px'
            });
            dialogRef.afterClosed().subscribe(result => {
              this.afAuth.authState.subscribe(user1 => {
                  if (user1.phoneNumber) {
                    this.router.navigate(['/payments/' + houseId + '/' + checkinDate + '/' + checkoutDate]);
                  }
                });

            });
          }else {
          this.router.navigate(['/payments/' + houseId + '/' + checkinDate + '/' + checkoutDate]);
          }
      }else {
       this.router.navigate(['/login']);
      }
        });
    }
    search(): void {
      let dialogRef = this.dialog.open(SearchboxComponent, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
console.log(result);
      });

    }
    onSearch(form: NgForm) {
      this.showProgress = true;
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
      // tslint:disable-next-line:max-line-length
      this.router.navigate(['search/' + this.place + '/' +  this.swimmingpool + '/' + value.torent + '/' + value.whichline + '/' + value.housetype]);
      setTimeout( () => {
        this.showProgress = false;
              }, 1000);
  }
}
