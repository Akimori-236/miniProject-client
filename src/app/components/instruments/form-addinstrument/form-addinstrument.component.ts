import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Instrument } from 'src/app/models/instrument';

@Component({
  selector: 'app-form-addinstrument',
  templateUrl: './form-addinstrument.component.html',
  styleUrls: ['./form-addinstrument.component.css']
})
export class FormAddinstrumentComponent implements OnInit {

  addInstrumentForm!: FormGroup
  @Input()
  currentStoreID!: string
  @Input()
  currentStoreName!: string
  @Input()
  currentInstrument: Instrument | null = null

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.addInstrumentForm = this.fb.group({
      instrument_type: this.fb.control<string>('', [Validators.required]),
      brand: this.fb.control<string>('', [Validators.required]),
      model: this.fb.control<string>('', [Validators.required]),
      serial_number: this.fb.control<string>('', [Validators.required]),
    })
    if (this.currentInstrument) {
      this.addInstrumentForm.patchValue(this.currentInstrument);
    }
  }
}
