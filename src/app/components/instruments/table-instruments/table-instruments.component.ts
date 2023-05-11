import { Component, Input, PipeTransform } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Instrument } from 'src/app/models/instrument';



@Component({
  selector: 'app-table-instruments',
  templateUrl: './table-instruments.component.html',
  styleUrls: ['./table-instruments.component.css']
})
export class TableInstrumentsComponent {
  @Input()
  instrumentList!: Instrument[]
  instruments$: Observable<Instrument[]>;

  filter = new FormControl('', { nonNullable: true });

  constructor() {
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
}
