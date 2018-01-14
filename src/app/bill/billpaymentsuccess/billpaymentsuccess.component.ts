import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms/src/directives/validators';
import { LocalStorageService } from 'angular-2-local-storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-billpayment-success',
  templateUrl: './billpaymentsuccess.component.html',
  styleUrls: ['./billpaymentsuccess.component.scss']
})
export class BillPaymentSuccessComponent implements OnInit {
  paymentResponse: any;
  currentDate: Date = new Date();
  constructor(private route: ActivatedRoute,
    private af: AngularFireDatabase,
    private router: Router,
    private translate: TranslateService,
    private localstorage: LocalStorageService
  ) {
    this.paymentResponse = this.route.snapshot.params;
    const savedData = {
      'trackId': this.paymentResponse.trackid,
      'result' : this.paymentResponse.result,
      'id' : this.paymentResponse.trackid,
      'auth' : this.paymentResponse.auth,
      'paymentId' : this.paymentResponse.paymentid,
      'transictionId' : this.paymentResponse.transid,
      'referenceId' : this.paymentResponse.refno,
      'amount' : this.paymentResponse.paymentid,
      'date' : this.paymentResponse.postdate,
      'time' : Math.round((new Date()).getTime() * 1000),
    };
    this.af.object('/No5tha/receiptResponse/' + this.paymentResponse.refno).update(savedData)
      .catch((error) => {
        console.error(error);
      });
  }

  ngOnInit() {}

  sendEmail(email) {
    const sendObj = {
      'type' : 'bill',
      'to' : email,
      'id' : this.paymentResponse.trackid
    };
    this.af.object('No5tha/emailOrder/' + this.paymentResponse.refno).update(sendObj)
      .then(() => {
        window.location.href = 'home';
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
