import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-addinstrument',
  templateUrl: './form-addinstrument.component.html',
  styleUrls: ['./form-addinstrument.component.css']
})
export class FormAddinstrumentComponent implements OnInit {

  addInstrumentForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.addInstrumentForm = this.fb.group({
      instrument_type: this.fb.control<string>('', [Validators.required]),
      brand: this.fb.control<string>('', [Validators.required]),
      model: this.fb.control<string>('', [Validators.required]),
      serial_number: this.fb.control<string>('', [Validators.required]),
      isRepairing: this.fb.control<boolean>(false, [Validators.required]),
    })
  }

}
