import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmailValidator } from '@angular/forms/src/directives/validators';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  billInfo: any;
  currentDate: Date = new Date();
  email: EmailValidator;
  load = false;
  isLoad = false;
  sending = false;
  isError = false;
  constructor(private af: AngularFireDatabase,
              private route: ActivatedRoute,
              public translate: TranslateService,
              private http: Http,
              private localstorage: LocalStorageService) {

    const billid = this.route.snapshot.params.billid;
    this.af.object('/WeekendMoney/Receipts/' + billid).valueChanges()
      .subscribe( billdata => {
        if (billdata) {
          this.af.object('/WeekendMoney/companies/' + billdata['companyId']).valueChanges()
          .subscribe( company => {
            if (company) {
              this.billInfo = billdata;
              this.billInfo.company = company;
              this.localstorage.set('cacheBillItem', billdata);
              this.currentDate = new Date(+billdata['ID']);
              this.isLoad = true;
            } else {
              this.isError = true;
            }
          });
        } else {
          this.isError = true;
        }
      });
    }

  ngOnInit() {}

  sendEmail(email) {
    this.sending = true;
    const sendObj = {
      'type' : 'receipt',
      'to' : email.value,
      'id' : this.billInfo.ID
    };
    this.load = true;
    this.af.database.ref('/WeekendMoney/emailOrder/').push(sendObj)
      .then(() => {
        this.sending = false;
          email.value = '';
      });
  }

  payReq() {
    this.load = true;
    this.InitilizeKnetRequest()
      .subscribe( result => {
        window.location.href = result.location + '?paymentID=' + result.paymentID;
      });
  }

  InitilizeKnetRequest(): any  {
    const headers = new Headers({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const data = {
      trackid: this.billInfo.ID,
      amount: this.billInfo.total,
      phone: localStorage.getItem('phoneNumber'),
      orderId: this.billInfo.ID
    };
    return this.http.post(window.location.origin + '/billpayment/buy.php', data, options)
      .map(response => {
        return response.json();
      })
      .catch(error => {
        return Observable.throw(error.message || error);
      });
  }
}
