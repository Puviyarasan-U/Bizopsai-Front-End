import { Component, Output, EventEmitter, OnInit, Input, } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

const bankReportURL = 'http://localhost:3010/api/upload/bankRep';
const licenseFinURL = 'http://localhost:3010/api/upload/licenseRep';
const certificatesURL = 'http://localhost:3010/api/upload/certificateRep';
const reportsURL = 'http://localhost:3010/api/upload/reportsRep';
const financialStatementsURL = 'http://localhost:3010/api/upload/finsRep';
const InsuranceURL = 'http://localhost:3010/api/upload/insuranceRep';

@Component({
  selector: 'app-financial-info-form',
  templateUrl: './financial-info-form.component.html',
  styleUrls: ['./financial-info-form.component.scss']
})
export class FinancialInfoFormComponent implements  OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  financialForm: FormGroup;
  user_name: any;
  user_id: any;

  public bankReportUploader: FileUploader = new FileUploader({ url: bankReportURL, itemAlias: 'bankPDF' });
  public licenseReportUploader: FileUploader = new FileUploader({ url: licenseFinURL, itemAlias: 'licenseRep' });
  public certificateUploader: FileUploader = new FileUploader({ url: certificatesURL, itemAlias: 'certificateRep' });
  public reportsUploader: FileUploader = new FileUploader({ url: reportsURL, itemAlias: 'reports' });
  public finStatementsUploader: FileUploader = new FileUploader({ url: financialStatementsURL, itemAlias: 'finState' });
  public insuranceUploader: FileUploader = new FileUploader({ url: InsuranceURL, itemAlias: 'insurance' });
  

  constructor(private fb: FormBuilder,) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
       // this.isUser = true;
      }
    }    

  }
  saveFinancialInfo(){

  //   this.bankReportUploader.setOptions({ additionalParameter: { Company_ID: this.user_id, USERNAME: this.user_name } });
  //   this.bankReportUploader.uploadAll();
  
  //   this.bankReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //   if (response === 'Uploaded Sucessfully') {
  //     this.certificateUploader.setOptions({ additionalParameter: { Company_ID: this.user_id, USERNAME: this.user_name } });
  //     this.certificateUploader.uploadAll();
  //   }
  //   this.certificateUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //     if (response === 'Uploaded Sucessfully') {
  //       this.reportsUploader.setOptions({ additionalParameter: { Company_ID: this.user_id, USERNAME: this.user_name } });
  //       this.reportsUploader.uploadAll();
  //     }
  //     this.reportsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //       if (response === 'Uploaded Sucessfully') {
  //         this.finStatementsUploader.setOptions({ additionalParameter: { Company_ID: this.user_id, USERNAME: this.user_name } });
  //         this.finStatementsUploader.uploadAll();
  //       }
  //       this.finStatementsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //         if (response === 'Uploaded Sucessfully') {
  //           this.insuranceUploader.setOptions({ additionalParameter: { Company_ID: this.user_id, USERNAME: this.user_name } });
  //           this.insuranceUploader.uploadAll();
  //         }
  //         this.insuranceUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            
           
  //         };
  //       };
  //     };
  //   };
  //  };

  }

}
