import { Component, OnInit, Input,TemplateRef , AfterViewInit , OnChanges} from '@angular/core';
import { UserDetails } from 'src/app/user-management/user-details';
import { ApiService } from '../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import $ from "jquery";
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  filterUserData = [];
  columns = [
    { prop: 'User Name' }, 
    { name: 'Account Level' },
    { name: 'Account Since', sortable: false }
  ];

  ColumnMode = 'ColumnMode';
  userDetails: any;
  modalRef: BsModalRef;
  rowData: any;
  userModalForm: any;
  constructor(private apiService : ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private formBuilder : FormBuilder,
    ) {  }

  ngOnInit() {
   
    this.getUserData()

    this.userModalForm = this.formBuilder.group({
      _id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required]
    })
  }


  getUserData(){
    this.apiService.getAllUserDetail('api/user/all-user')
      .subscribe( (res:any) => {
         this.userDetails = res.data;
         this.rows = [...res.data]
         this.filterUserData = this.rows;
         
      })
  }
  

  filterDatatable(event){
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();
    console.log(val)
    // get the amount of columns in the table
    let colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    console.log(colsAmt)
    let keys = Object.keys(this.rows[0]);
    console.log(this.rows)
    console.log(keys)
    // assign filtered matches to the active datatable
    this.rows = this.filterUserData.filter(function(item){
      // iterate through each row's column data
      for (let i=0; i<colsAmt; i++){
        // check for a match
        console.log(item[keys[i]])
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  removeUser(userId:String){

    this.apiService.delete('api/user/delete/' + userId)
      .subscribe( (res) => {
         
        if (res){
          this.toastr.success("Success!","User deleted Successfully.");
          this.getUserData()
        } else {
          this.toastr.warning("Warning!","Error occcured while Deleting user.")
        }
      })
  }

  

  openModal(template: TemplateRef<any>,rowData) {
   
    this.rowData = rowData;
    this.userModalForm.patchValue({
      firstname: rowData.firstname,
      lastname: rowData.lastname,
      username: rowData.username,
      gender: rowData.gender,
      age: rowData.age,
      location: rowData.location,
      email: rowData.email,
      role: (rowData.role == 3 ? 'Voter' : 'Admin') ,
      address: rowData.location,
      _id: rowData._id
      
    });
    this.modalRef = this.modalService.show(template)
  }

  

  saveUserDetail(editedValue){
    console.log(editedValue)
    if (editedValue.role == 'Voter') { editedValue.role = 3}
    this.modalRef.hide()
    this.apiService.update('api/user/edit-user',editedValue)
    .subscribe((res:any)=> {
        console.log(res)
      if (res.success == true) {
        console.log(res)
        this.modalRef.hide()
        this.toastr.success("User Details Edited Successfully!","Success!")
      }else  {
        this.modalRef.hide()
        this.toastr.warning("Failed to update User Details","try again!")
      }
    })
  }

}
