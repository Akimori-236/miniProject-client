import { Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Instrument } from 'src/app/models/instrument';
import { User } from 'src/app/models/user';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnChanges {
  @Input()
  currentStoreID!: string
  @Input()
  currentStoreName!: string
  instrumentList!: Instrument[]
  managerList!: User[]

  constructor(private storeSvc: StoreDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    // call api for data
    this.storeSvc.getStoreDetails(this.currentStoreID).then(
      response => {
        this.instrumentList = response['instruments']
        console.debug(this.instrumentList)
        this.managerList = response['managers']
        console.debug(this.managerList)
      }
    )
  }

}
