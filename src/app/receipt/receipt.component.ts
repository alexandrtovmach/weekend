import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
billInfo: any;
  constructor(private af: AngularFireDatabase, private route: ActivatedRoute) {
const billid = this.route.snapshot.params.receiptid;
    this.af.object('/No5tha/Receipts/' + billid).valueChanges()
    .subscribe( billdata => {
this.billInfo = billdata;
    });
   }

  ngOnInit() {
  }

}
