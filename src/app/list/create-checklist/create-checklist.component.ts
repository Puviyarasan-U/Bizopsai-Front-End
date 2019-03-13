import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";
import { ProcessService } from '../../services/process.service';

const pdfURL = 'http://localhost:3010/api/create-checklist/doc-upload';

@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.scss']
})
export class CreateChecklistComponent implements OnInit {

  public checklistUploader: FileUploader = new FileUploader({url: pdfURL, itemAlias: 'Checklist_DOC' });

  public myModal;
  @ViewChild("close") close: ElementRef;
  @ViewChild("showModal") showModal: ElementRef;

  Data: any;
  list: any;
  user_name: any;
  user_id: any;
  isList = true;
  businessList: any;
  businessTitle: string;
  CheckList: any = [];
  line: string;
  isChecklist=false;
  maxListId :any;

  order_num:number;
  pdfSrc:string;
  pdfFiles: any =[]; 

  constructor(
    private user: NodeService, private route: ActivatedRoute,
    private home: HomeNodeService,
    public router: Router,
    private fb: FormBuilder,
    private process: ProcessService
  ) {}

  ngOnInit() {

    if(sessionStorage.length){
        if(sessionStorage.getItem('Bizops_User')){
          let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
          this.user_name = userdata.USER_FIRSTNAME;
          this.user_id = userdata.ID;
        }        
      }

    this.user.getBizbyUser(this.user_id).subscribe(
      data => {      
            this.Data = data;
            let rows = this.Data;
            if (rows.length > 0) {
                if (rows[0].status) {
                      this.isList = false;
                  } 
                  else {
                    this.list = rows;
                  }
             } 
             else {
                 alert('No Data');
             }
             this.home.getMaxListId().subscribe(data =>{
                var maxListId = data[0].LIST_ID;
                this.maxListId = +maxListId + 1;              
           });  
       },
      error => {
          alert('Server Error');
       });

       this.checklistUploader.onAfterAddingFile = (file) => {
        if (file) {
          let img: any = document.querySelector("#pdfFile");    
        if(typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e:any) => {
            this.pdfSrc = e.target.result;        
            list = {
                      filename : img.name,
                      filetype : img.type,                   
                };
              //  this.pdfFiles.push(list);
           }  
            reader.readAsArrayBuffer(img.files[0]);     
          }
         }
       };

  }

  createChecklist(){  
   if( this.businessTitle) {
        let selectedBusiness = this.list.filter((item) => {
          return item.COMPANY_ID == this.businessTitle;
        });
        this.isChecklist = true;  
        this.showModal.nativeElement.click(); 
      }
      else{
         alert('You must select a business to add instruction!!!')
      }
  }

  clearChecklist(){
    this.CheckList = [];
  }

  clearPDF(){ 
    this.pdfSrc =''; 
   // this.showPdf=false;
  }

  create(){
    if(this.CheckList.length>0){
      var post = {
        companyId : this.businessTitle,
        UserId : this.user_id,
       // ListId : this.maxListId,
        //ListId: 10001,
        list : this.CheckList
      }
      // this.user.createBusinessChecklist(post).subscribe(
      //   data=>{
      //     var res = data;
      //     if(res>0){          
      //         this.checklistUploader.setOptions({
      //           additionalParameter: { CompanyId: this.businessTitle }
      //          });
      //         this.checklistUploader.uploadAll();
      //         this.checklistUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //           alert("created Sucessfully!!!");
      //           this.clearChecklist();
      //         };         
           
      //     }
      //   });
        
        this.process.createBusinessProcess(post).subscribe(
          data=>{
            var res = data;
            if(res>0){ 
              alert('Created Sucessfully!!!');
             }
          });

    }

  }

  addLine(){
    this.isList = true;
    this.showModal.nativeElement.click();
  }

  add() {
    if(this.CheckList.length == 0){
      this.order_num = 1
    }
    else{
      this.order_num = this.order_num + 1;
    }

    var instruction={
      Order_num : this.order_num,
      Instruction : this.line,
    }

    this.CheckList.push(instruction);
    this.line = "";
    //this.isList = false;
    this.close.nativeElement.click();
  }

}
