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
  receiptLink: string;
  currentDate: Date = new Date();
  emailString: EmailValidator;
  constructor(private route: ActivatedRoute,
    private af: AngularFireDatabase,
    private router: Router,
    private translate: TranslateService,
    private localstorage: LocalStorageService
  ) {
    this.paymentResponse = this.route.snapshot.params;
    console.log('paymentResponse', this.paymentResponse);
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
    console.log('billsuccess', savedData);
    this.af.object('/No5tha/receiptResponse/' + this.paymentResponse.refno).update(savedData)
      .catch((error) => {
        console.error(error);
      });

    // const updateObj = this.localstorage.get('cacheBillItem');
    // updateObj['isPaid'] = true;
    // this.af.object('/No5tha/Receipts/' + this.paymentResponse.refno).update(updateObj)
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  ngOnInit() {}

  sendEmail() {
    const sendObj = {
      'type' : 'bill',
      'to' : this.emailString,
      'id' : this.paymentResponse.trackid
    };
    console.log(sendObj);
    this.af.object('No5tha/emailOrder/' + this.paymentResponse.refno).update(sendObj)
      .then(() => {
        window.location.href = this.receiptLink;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
