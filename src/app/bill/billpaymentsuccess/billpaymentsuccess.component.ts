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
  items: any;
  company: any;
  currentDate: Date = new Date();
  constructor(private route: ActivatedRoute,
    private af: AngularFireDatabase,
    private router: Router,
    public translate: TranslateService,
    private localstorage: LocalStorageService
  ) {
    this.paymentResponse = this.route.snapshot.params;
    this.currentDate = new Date(+this.paymentResponse.trackid);
    const savedData = {
      'trackId': this.paymentResponse.trackid,
      'result' : this.paymentResponse.result,
      'id' : this.paymentResponse.trackid,
      'auth' : this.paymentResponse.auth,
      'paymentId' : this.paymentResponse.paymentid,
      'transictionId' : this.paymentResponse.transid,
      'referenceId' : this.paymentResponse.refno,
      'amount' : this.paymentResponse.amount,
      'date' : this.paymentResponse.postdate,
      'time' : Math.round((new Date()).getTime()),
    };

    this.af.object('/WeekendMoney/Receipts/' + this.paymentResponse.trackid).valueChanges()
      .subscribe( billdata => {
        this.items = billdata['items'];
        this.af.object('/WeekendMoney/companies/' + billdata['companyId']).valueChanges()
          .subscribe( company => {
            this.company = company;
          });
        savedData['companyId'] = billdata['companyId'];
        savedData['userUID'] = billdata['userUID'];
        this.af.object('/WeekendMoney/receiptResponse/' + this.paymentResponse.transid).update(savedData)
          .catch((error) => {
            console.error(error);
          });
      });
  }

  ngOnInit() {}

  sendEmail(email) {
    const sendObj = {
      'type' : 'receipt',
      'to' : email,
      'id' : this.paymentResponse.trackid
    };
    this.af.object('WeekendMoney/emailOrder/' + this.paymentResponse.refno).update(sendObj)
      .then(() => {
        window.location.href = 'home';
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
