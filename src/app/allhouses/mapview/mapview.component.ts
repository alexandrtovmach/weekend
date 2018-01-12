import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {
  allHouses: any;
  constructor( public dialogRef: MatDialogRef<MapviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.allHouses = data.houses;
     }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
