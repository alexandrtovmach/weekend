import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
paymentResponse: any;
receiptLink: string;
orderId: string;
  constructor(private route: ActivatedRoute, private af: AngularFireDatabase, private afAuth: AngularFireAuth,
  private router: Router) {

    this.paymentResponse = this.route.snapshot.params;
const orderId = this.paymentResponse.orderid;
this.orderId = this.paymentResponse.orderid;
this.receiptLink = 'https://www.weekendq8.com/receipt/' + this.paymentResponse.trackid;
const savedData = {'ID': this.paymentResponse.trackid,
'done': 'false',
  'response': {
  'auth': this.paymentResponse.auth,
  'paymentid': this.paymentResponse.paymentid,
  'postdate': this.paymentResponse.postdate,
  'ref': this.paymentResponse.refno,
  'result': this.paymentResponse.result,
  'trackid': this.paymentResponse.trackid,
  'transid': this.paymentResponse.transid
}, 'timestamp': Math.round((new Date()).getTime() * 1000),
 'type': 'response' };
 this.af.object('/No5tha/receiptOrder/' + orderId).update(savedData)
 .then(() => {

 }).catch((error) => {
  console.log(error);
 });

}

  ngOnInit() {
  }
  done(orderId: string) {
    this.af.object('/No5tha/receiptOrder/' + orderId).update({'done': 'true', 'response': this.receiptLink})
    .then(() => {
window.location.href = this.receiptLink;
    }).catch((error) => {
     console.log(error);
    });
  }
}
