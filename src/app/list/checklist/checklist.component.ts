import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";

const pdfURL = 'http://localhost:3010/api/checklist/doc-upload';


@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.scss"]
})
export class ChecklistComponent implements OnInit {

  public checklistUploader: FileUploader = new FileUploader({url: pdfURL, itemAlias: 'Checklist_DOC' });

  public myModal;
  @ViewChild("close") close: ElementRef;
  @ViewChild("showModal") showModal: ElementRef;


  instruct: string;
  createInstructionForm: FormGroup;
  Data: any;
  instructionList: any;
  isProductList: boolean = true;
  stateList: any = [];
  countyList: any = [];
  citiesList: any = [];
  baseCategoryList: any = [];
  childCategoryList: any = [];
  subchildCategoryList: any = [];
  subcategoryList: any;

  submitted = false;
  userId: string;
  currentState: string ;
  currentCity: string ;
  currentSubCategory: string ;
  currentCategory: string ;
  searchData: any = [];
  showInput: boolean = true;
  textAreasList: any = [];
  instructData: string = "";
  instructList: any = [];
  CheckList: any = [];
  line: any;
  isList = false;
  hideButton = false;

  listDetail:any;
  tranId:any;
  isExisting = false;
  maxListId:any;
  pdfSrc:string;
  pdfFiles: any =[]; 
  professionalData: any;

  constructor(
    private user: NodeService, private route: ActivatedRoute,
    private home: HomeNodeService,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    var userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
    this.userId = userdata.ID;    

    this.createInstructionForm = this.fb.group({
      State: ["", Validators.required],
      City: ["", Validators.required],
      Category: ["", Validators.required],
      SubCategory: ["", Validators.required],
      Instruction: ["", Validators.required],
      UserId: [""]
    });
    this.home.getStateList().subscribe(data => {
      this.stateList = data;
      this.home.getCountyList().subscribe(data => {
        this.countyList = data;
        this.home.getBaseCategory().subscribe(data => {
          this.baseCategoryList = data;
          this.home.getChildCategory().subscribe(data => {
            this.childCategoryList = data;
            this.home.getInstructionList().subscribe(data => {
              this.instructionList = data;
              this.home.getProfessional(this.userId).subscribe(data =>{
                this.professionalData = data[0];
              })
              this.home.getMaxListId().subscribe(data =>{
                 var maxListId = data[0].LIST_ID;
                  this.maxListId = +maxListId + 1;
                 
              });              
            });
          });
        });
      });
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
         }  
          reader.readAsArrayBuffer(img.files[0]);     
        }
       }
     };
  }

  changeCategory($event) {
    this.subcategoryList = [];
    if ($event == undefined) {
      this.subcategoryList = [];
    } else {
      this.subcategoryList = this.childCategoryList.filter(item => {
        return item.cid === $event.cid;
      });
    }
  }

  changeState($event) {
    if ($event == undefined) {
      this.citiesList = [];
    } else {
      this.citiesList = this.countyList.filter(item => {
        return item.state_code === $event.state_code;
      });
    }
  }

  addLine(){
    this.isList = true;
    this.showModal.nativeElement.click();
  }

  add() {
    this.CheckList.push(this.line);
    this.line = "";
    //this.isList = false;
    this.close.nativeElement.click();
  }

  clear(){
    this.currentCategory = "";
    this.currentSubCategory = "";
    this.currentState = "";
    this.currentState = "";
    this.CheckList = [];
    this.isList = false;
    this.pdfSrc =''; 
  }

  clearPDF(){ 
    this.pdfSrc =''; 
   // this.showPdf=false;
  }

  createChecklist(){

    if(this.CheckList.length>0){
      var main = {
           ProfId: this.userId,
           ListId: this.maxListId,
           State: this.currentState,
           County: this.currentCity,
           Category: this.currentCategory,
           SubCategory : this.currentSubCategory
      }
      var post = {
        detail : main,
        list : this.CheckList
      }
      if(!this.tranId){    
      this.user.createChecklist(post).subscribe( result =>{
        var data =result;
        if(data>0){
          this.checklistUploader.setOptions({
            additionalParameter: { UserName: this.maxListId }
           });
          this.checklistUploader.uploadAll();
          this.checklistUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            alert("created Sucessfully!!!");
            this.clear();
          };         
        }
      },
      err =>{
        console.log(err);
        alert('servor error!!');
      });
    }

    else{

      // this.user.assignChecklist(post).subscribe( result =>{
      //   var data =result;
      //   if(data>0){
      //     alert("created Sucessfully!!!");
      //     this.clear();
      //   }
      // },
      // err =>{
      //   console.log(err);
      //   alert('servor error!!');
      // });
    }
    }
     
  }
}
