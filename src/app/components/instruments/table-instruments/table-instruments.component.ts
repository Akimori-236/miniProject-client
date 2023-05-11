import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Instrument } from 'src/app/models/instrument';
import { QrService } from 'src/app/services/qr.service';
import { StoreDataService } from 'src/app/services/store-data.service';



@Component({
  selector: 'app-table-instruments',
  templateUrl: './table-instruments.component.html',
  styleUrls: ['./table-instruments.component.css']
})
export class TableInstrumentsComponent {
  @Input()
  instrumentList!: Instrument[]
  instruments$: Observable<Instrument[]>
  @Input()
  storeID!: string

  filter = new FormControl('', { nonNullable: true });

  constructor(private storeSvc: StoreDataService,
    private qrSvc: QrService) {
    this.instruments$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text)),
    );
  }

  search(text: string): Instrument[] {
    return this.instrumentList.filter((instrument) => {
      const term = text.toLowerCase();
      return (
        instrument.instrument_type.toLowerCase().includes(term) ||
        instrument.brand.toLowerCase().includes(term) ||
        instrument.model.toLowerCase().includes(term) ||
        instrument.serial_number.toLowerCase().includes(term)
        // pipe.transform(instrument.area).includes(term) ||
        // pipe.transform(instrument.population).includes(term)
      );
    });
  }

  onNewList(event: Instrument[]) {
    this.instrumentList = event
  }

  getQR(instrument_id: string) {
    this.qrSvc.getLoanQR(instrument_id, this.storeID)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(error))
  }
}
