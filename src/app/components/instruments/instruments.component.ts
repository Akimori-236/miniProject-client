import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnChanges {
  @Input()
  currentStoreID!: number

  constructor(private storeSvc: StoreDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    // call api for data
    this.storeSvc.getStoreDetails(this.currentStoreID)
  }

}
