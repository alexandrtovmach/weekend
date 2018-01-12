import { BookingService } from './../../services/booking.service';
import { BillService } from './../../services/bill.service';

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
billingData: any;
showSpinner= false;
  constructor(private localstorage: LocalStorageService, private billService: BillService,
    private af: AngularFireDatabase, private bookingService: BookingService) { }

  ngOnInit() {
this.billingData = this.localstorage.get('billingData');

  }
  onPayWith(billingData: any) {

    this.showSpinner = true;
    this.billService.InitilizeKnetRequest(billingData)
    .subscribe( result => {
const redirectUrl = result.location + '?paymentID=' + result.paymentID;
const saveReceiptData = {
  'companyName' : 'Weekend',
  'done' : false,
  'email' : billingData.email,
  'items' : [ {
    'from' : billingData.checkin,
    'itemID' : billingData.houseId,
    'to' : billingData.checkout,
    'type' : 'chalet'
  } ],
  'phoneNumber' : billingData.phoneNumber,
  'timestamp' : Math.round((new Date()).getTime() * 1000),
  'type' : 'newRecepit',
  'userUID' : billingData.userid,
  'orderId': billingData.orderid
};

this.af.object(`/No5tha/receiptOrder/${billingData.orderid}`).set(saveReceiptData)
.then(() => {
  this.showSpinner = true;
  window.location.href = redirectUrl;
}).catch((error) => {
 console.log(error);
});


    });
  }
}
