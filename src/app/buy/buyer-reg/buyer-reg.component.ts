import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BuyerService } from '../../services/buyer.service';
import { HomeNodeService } from '../../services/HomeNodeService';
const bankReportURL = 'http://localhost:3010/api/upload/buybankRep';
const licenseFinURL = 'http://localhost:3010/api/upload/buylicenseRep';
const certificatesURL = 'http://localhost:3010/api/upload/buycertificateRep';
const financialStatementsURL = 'http://localhost:3010/api/upload/buyfinsRep';
const InsuranceURL = 'http://localhost:3010/api/upload/buyinsuranceRep';
@Component({
  selector: 'app-buyer-reg',
  templateUrl: './buyer-reg.component.html',
  styleUrls: ['./buyer-reg.component.scss']
})
export class BuyerRegComponent implements OnInit {
  maxFileSize = 1048576;
  Data: any = [];
  user_name:any;
  user_id:any;
  Id = '';
  showPdf: boolean = false;
  licensePDF: any = [];
  isUpload = false;
  page: number = 1;
  pdfSrc: string;
  submitted: boolean = false;
  username: string = "";
  ID: any;
  @Input()
  BuyerId: any=[];
  splitID:string='';
  comapny_id:any;
  BuyerRegisterData: FormGroup;
  public bankReportUploader: FileUploader = new FileUploader({ url: bankReportURL, itemAlias: 'buy-bankPDF' });
  public licenseReportUploader: FileUploader = new FileUploader({ url: licenseFinURL, itemAlias: 'buy-licenseRep' });
  public certificateUploader: FileUploader = new FileUploader({ url: certificatesURL, itemAlias: 'buy-certificateRep' });
  public finStatementsUploader: FileUploader = new FileUploader({ url: financialStatementsURL, itemAlias: 'buy-finState' });
  public insuranceUploader: FileUploader = new FileUploader({ url: InsuranceURL, itemAlias: 'buy-insurance' });
  constructor(public router: Router,private fb: FormBuilder, private buy: BuyerService,private route: ActivatedRoute,private home : HomeNodeService ) { }
  ngOnInit() {
    let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
    this.user_name = userdata.USER_FIRSTNAME;
    this.user_id = userdata.ID;
    this.username = this.user_name;
    this.route.queryParams
    .filter(params => params.com_id)
    .subscribe(params => {
      this.comapny_id = params.com_id;
    });
    this.BuyerRegisterData = this.fb.group({
      User_Id :[''],
      Name: [''],
      agentName:[''],
      agentEmail:[''],
      homeAddress: [''],
      agentContact: [''],
      emailAddress: [''],
      faxNumber: [''],
      cellPhone: [''],
      homePhone: [''],
      secName: [''],
      secNum: [''],
      bestTelePhone: [''],
      dob: [''],
      birthPlace: [''],
      homeTelePhone: ['']
    });
    this.licenseReportUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#buy-licenseRep");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            this.licensePDF.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
    this.bankReportUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#buy-bankPDF");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
    this.certificateUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#buy-certificateRep");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
    this.finStatementsUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#buy-finState");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
    this.insuranceUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#buy-insurance");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
  }
 
  buyerRegister() {
    this.submitted = true;
    if (this.BuyerRegisterData.invalid) {
      return;
    } else {
        this.BuyerRegisterData.patchValue({     
          User_Id: this.user_id       
      });
      this.buy.buyerBiz(this.BuyerRegisterData.value).subscribe(
        data => {
          this.Data = data;
          this.ID = data;
          if (this.Data) {
            this.licenseReportUploader.setOptions({ additionalParameter: { id: this.ID } });
            this.licenseReportUploader.uploadAll();
            this.licenseReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
              if (response === 'Uploaded Sucessfully') {
                this.bankReportUploader.setOptions({ additionalParameter: { id: this.ID } });
                this.bankReportUploader.uploadAll();
              }
              this.bankReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                if (response === 'Uploaded Sucessfully') {
                //   this.certificateUploader.setOptions({ additionalParameter: { id: this.ID } });
                //   this.certificateUploader.uploadAll();
                // }
                // this.certificateUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                  // if (response === 'Uploaded Sucessfully') {
                    this.finStatementsUploader.setOptions({ additionalParameter: { id: this.ID } });
                    this.finStatementsUploader.uploadAll();
                    let detail = {
                      user_id: this.user_id,
                      com_id: this.comapny_id
                    }
                    this.home.saveList(detail).subscribe(
                      data => {
                        if (data > 0) {
                          alert('Saved Successfully !!!');                           
                          // this.router.navigate(['/buyer-reg']);
                        }
                      });
                   }
                  // this.finStatementsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                  //   if (response === 'Uploaded Sucessfully') {
                  //     this.insuranceUploader.setOptions({ additionalParameter: { id: this.ID } });
                  //     this.insuranceUploader.uploadAll();
                  //     // alert('Created Successfully !!!');
                     
                  //   }
                  // };
                // };
              };
            };
          }
        },
        error => {
          alert('Server Error');
          console.log(error);
        });
    }
  }
}
