import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from 'src/app/models/store';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  storeList!: Store[]
  createStoreForm!: FormGroup

  constructor(
    private storeSvc: StoreDataService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.storeSvc.getManagedStores()
      .then(response => {
        this.storeList = response
      })
    this.createStoreForm = this.fb.group({
      storeName: this.fb.control<string>('', [Validators.required]),
    })
  }


  openPopup(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.warn(this.createStoreForm.value['storeName'])
        // TODO: call service to create store
        console.log(`Closed with: ${result}`)
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
      },
    );
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
