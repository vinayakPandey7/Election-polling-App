import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import $ from "jquery";
@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.css']
})
export class CreateElectionComponent implements OnInit {
  [x: string]: any;
  createElectionForm
  partyForm
  modalRef: BsModalRef;
  constructor(
    private apiService : ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit() {

    this.createElectionForm = this.formBuilder.group({
      OrganisationName: ['', Validators.required],
      // electionStartDateTime: ['', Validators.required],
      // electionEndDateTime: ['', Validators.required],
      parties: ['', Validators.required],
      email: ['', Validators.required],
      // username: ['', Validators.required],
      // location: ['', Validators.required],
      // address: ['', Validators.required],
      // role: ['', Validators.required]
    })


    this.partyForm = this.formBuilder.group({
      organisationName: [Validators.required],
      partyName : ['', Validators.required],
      founderName : ['', Validators.required],
      registeredOn : ['', Validators.required],
      address:['', Validators.required],
      partyEmail: ['', Validators.required],
      contactNo: ['', Validators.required]
    })


  }



  saveElectionForm(formVal){
    formVal.parties.split(',')
    let partyData: any = {}
    // for(let i =0;i<formVal.parties.length;i++){
    //   partyData.party = { 
    //     i: formVal.parties[i] 
    //   }
    // }
    console.log(formVal)
    this.apiService.postData('api/elect/new-elect',formVal)
    .subscribe((res:any)=> {
        console.log(res)
      // if (res.success == true) {
      //   console.log(res)
      //   this.modalRef.hide()
      //   this.toastr.success("User Details Edited Successfully!","Success!")
      // }else  {
      //   this.modalRef.hide()
      //   this.toastr.warning("Failed to update User Details","try again!")
      // }
    })
    this.createElectionForm.reset()
  }


  savePartyForm(partyData){
    console.log(partyData)

    this.modalRef.hide()
    this.apiService.postData('api/party/add-party',partyData)
    .subscribe((res:any)=> {
        console.log(res)
        alert()
      if (res.success == true) {
        console.log(res)
        this.modalRef.hide()
        this.toastr.success(res.message,"Success!")
      }else  {
        this.modalRef.hide()
        this.toastr.warning(res.message,"try again!")
      }
    })
  }


  openPartyForm(partyTemplate: TemplateRef<any>) {
    this.partyForm.patchValue({ 
      organisationName: $('#organisationName').val()
    })
    this.modalRef = this.modalService.show(partyTemplate);
  }


  checkAvailability(){
    let username = $('#organisationName').val();
    this.ApiService.getAll('user/avail-party-data',username)
    .subscribe((res:any)=> {
      if (res.success == true){
        $('#username').css('background-color','green');

      } else {
        $('#username').css('background-color','red')
      }
    })
  }


}
