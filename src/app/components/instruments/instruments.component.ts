import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Instrument } from 'src/app/models/instrument';
import { User } from 'src/app/models/user';
import { StoreDataService } from 'src/app/services/store-data.service';
import { FormAddinstrumentComponent } from './form-addinstrument/form-addinstrument.component';

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


  constructor(
    private storeSvc: StoreDataService,
    private modalService: NgbModal,
    config: NgbModalConfig) {
    config.backdrop = 'static';
  }


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

  openPopup() {
    const modalRef = this.modalService.open(FormAddinstrumentComponent);
    modalRef.result
      .then((result) => {
        // access formgroup in FormAddinstrumentComponent
        const newInstrument = modalRef.componentInstance.addInstrumentForm.value as Instrument
        // call SB
        this.storeSvc.addNewInstrument(this.currentStoreID, newInstrument)
      },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`)
        })
      .catch(error => console.error(error))
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
