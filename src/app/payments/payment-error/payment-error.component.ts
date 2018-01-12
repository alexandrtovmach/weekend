import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.css']
})
export class PaymentErrorComponent implements OnInit {
  paymentResponse: any;
  orderId: string;
  constructor(private route: ActivatedRoute, private af: AngularFireDatabase, private afAuth: AngularFireAuth,
    private router: Router) {
      this.paymentResponse = this.route.snapshot.params;
  const orderId = this.paymentResponse.orderid;
  this.orderId = this.paymentResponse.orderid;
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

}
