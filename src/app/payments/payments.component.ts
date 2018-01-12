import { AngularFireDatabase } from 'angularfire2/database';
import { HouseService } from '../services/house.service';
import { House } from './../services/house';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../services/user.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { MatDialog } from '@angular/material';
import { PhoneconfirmComponent } from '../login/phoneconfirm/phoneconfirm.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { BookingService } from '../services/booking.service';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [SweetAlertService]
})
export class PaymentsComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


incommingParams: any;
houseDetail: any;
selectedNights: number;
bookingDates= [];
profile: any;
name: any;
email: any;
contact: any;
billData: any;
userid: any;

  constructor(private route: ActivatedRoute, private housesService: HouseService, private afAuth: AngularFireAuth,
  private router: Router, private userService: UserService, private af: AngularFireDatabase, private _swal2: SweetAlertService,
  public dialog: MatDialog, private localstorage: LocalStorageService, private bookingService: BookingService,
  private _formBuilder: FormBuilder) {
    this.incommingParams = this.route.snapshot.params;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (!user.phoneNumber) {
          let dialogRef = this.dialog.open(PhoneconfirmComponent, {
            width: '400px'
          });
          dialogRef.afterClosed().subscribe(result => {
          });
        }else {
          this.userid = user.uid;
        this.profile = this.userService.getMemberProfile(user.uid) ;
        this.profile.subscribe(key => {
        this.name = key.name;
        this.email = key.email;
        this.contact = user.phoneNumber;
        });

    let finalData = [];
    this.housesService.findIndHouseDetail(this.incommingParams['houseId'])
    .subscribe(snapshots => {
      finalData = snapshots;
      this.housesService.findIndHouseBookingDetail(this.incommingParams['houseId'])
      .subscribe( bookingSnapShots => {
        if (bookingSnapShots) {
          finalData['price'] = this.housesService.getOneNightPrice(bookingSnapShots);
        }else {
          finalData['price'] = 0;
        }
     this.houseDetail = finalData;

     });
    });
    const selectednightsAndBookingDates = this.calculateSelectedNights(this.incommingParams['checkin'], this.incommingParams['checkout']);
    this.selectedNights =  selectednightsAndBookingDates['selectedNights'];
    this.bookingDates =  selectednightsAndBookingDates['bookingDates'];
    }}else {
      this.router.navigate(['/home']) ;
    }
      });




  }
private  calculateSelectedNights(checkinDate: any, checkoutDate: any) {
  const finalData = [];
  const bookingDates = [];
  const checkInDateValue = new Date(checkinDate);
  const checkOutDateValue = new Date(checkoutDate);
  const oneDay = 24 * 60 * 60 * 1000; // one day in millisecond
  const intermediateDate = checkInDateValue;
  finalData['selectedNights'] = Math.round(Math.abs((checkInDateValue.getTime() - checkOutDateValue.getTime()) / (oneDay)));
  for ( let i = 0; i <= finalData['selectedNights']; i++) {
    let loopcounter = 1;
if (i <= 1) {
loopcounter = i;
}
    intermediateDate.setDate(intermediateDate.getDate() + loopcounter);
 const year = intermediateDate.getFullYear();
 const month = intermediateDate.getMonth();
 const day = intermediateDate.getDay();
 const bookingdate = month + '/' + intermediateDate.getDate() + '/' + intermediateDate.getFullYear();
 bookingDates.push(bookingdate);

  }
  finalData['bookingDates'] = bookingDates;
  return finalData;
}
sendBookingRequest(
  status: string,
  CustomerName: string,
   CustomerPhone1: string, houseId: string, houseName: string,  price: number, selectedNights: number ) {
    const totalPrice = price * selectedNights;
  const bookingData = {
    Bool: true,
    CustomerName: CustomerName,
    CustomerPhone1: CustomerPhone1,
    dates: {checkInDate: this.incommingParams['checkin'], checkOutDate: this.incommingParams['checkout']},
    deposit: 100,
    houseId: houseId, houseName: houseName, isOnline: status, priceShown: price, totalPrice: totalPrice, timestamp: new Date().getTime()};
    if (status === 'false') {
      this.saveBookingDataPart(bookingData);
    }else {
      const newKey = this.bookingService.makeid();
      this.billData = {
        organization: 'weekend',
        receiptNumber: Math.round((new Date()).getTime() / 1000),
        totalPrice: totalPrice,
        phoneNumber: CustomerPhone1,
        houseId: houseId,
        price: price,
        selectedNights: selectedNights,
        deposit: 100,
        email: this.email,
        checkin: this.incommingParams['checkin'],
        checkout: this.incommingParams['checkout'],
        userid: this.userid,
        orderid: newKey
      };
this.localstorage.set('billingData', this.billData);
this.router.navigate(['/confirm-payment/']);
    }

    }
    saveBookingDataPart(bookingData) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
      const newKey = this.bookingService.makeid();
      this.af.object(`/No5tha/BookingRequest/${newKey}`).set(bookingData)
      .then(() => {
       this.userService.getMemberProfileList( user.uid)
       .push({requestId: newKey})
       .then( () => {
        this.router.navigate(['/invoice/' + newKey]);
       })
       .catch( (error) => {
        this._swal2.error({ title: 'Unable to sent your booking request' });
       });

      }).catch((error) => {
       console.log(error);
     });

  }else {
    this.router.navigate(['/home/']);
  }
  });

    }

}
