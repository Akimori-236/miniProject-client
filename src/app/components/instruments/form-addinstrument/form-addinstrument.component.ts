import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { StoreDataService } from 'src/app/services/store-data.service';

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

  constructor(
    private fb: FormBuilder,
    private storeSvc: StoreDataService) { }

  ngOnInit(): void {
    this.addInstrumentForm = this.fb.group({
      instrument_type: this.fb.control<string>('', [Validators.required]),
      brand: this.fb.control<string>('', [Validators.required]),
      model: this.fb.control<string>('', [Validators.required]),
      serial_number: this.fb.control<string>('', [Validators.required]),
    })
  }

  submit() {

  }
}
