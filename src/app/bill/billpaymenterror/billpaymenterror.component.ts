import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-billpayment-error',
  templateUrl: './billpaymenterror.component.html',
  styleUrls: ['./billpaymenterror.component.scss']
})
export class BillPaymentErrorComponent implements OnInit {
  paymentResponse: any;
  orderId: string;
  items: any;
  company: any;
  currentDate: Date = new Date();
  now = new Date();
  isLoad = false;
  constructor(private route: ActivatedRoute,
    private af: AngularFireDatabase,
    public translate: TranslateService,
    private router: Router
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
      'amount' : this.paymentResponse.paymentid,
      'date' : this.paymentResponse.postdate,
      'time' : Math.round((new Date()).getTime()),
    };

    this.af.object('/WeekendMoney/Receipts/' + this.paymentResponse.trackid).valueChanges()
      .subscribe( billdata => {
        this.items = billdata['items'];
        this.af.object('/WeekendMoney/companies/' + billdata['companyId']).valueChanges()
          .subscribe( company => {
            this.company = company;
            this.isLoad = true;
          });
        savedData['companyId'] = billdata['companyId'];
        savedData['userUID'] = billdata['userUID'];
        this.af.database.ref('/WeekendMoney/receiptResponse/').push(savedData);
      });
  }

  ngOnInit() {}

}
