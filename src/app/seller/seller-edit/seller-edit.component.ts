import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { NodeService } from '../../services/Nodeservice';
// import { StateListService } from '../../services/statelist.service';
// import { List } from '../../services/statelist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeNodeService } from '../../services/HomeNodeService';
import { EquipmentService } from '../../services/equipment.service';
import { ProcessService } from '../../services/process.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

const URL = 'http://localhost:3010/api/upload/edit';
const SECURL = 'http://localhost:3010/api/upload/multi';
const licenseURL = 'http://localhost:3010/api/upload/license';
const socialSecurityURL = 'http://localhost:3010/api/upload/social';
const premiseURL = 'http://localhost:3010/api/upload/prelease';
const bankReportURL = 'http://localhost:3010/api/upload/bankRep';
const licenseFinURL = 'http://localhost:3010/api/upload/licenseRep';
const certificatesURL = 'http://localhost:3010/api/upload/certificateRep';
const reportsURL = 'http://localhost:3010/api/upload/reportsRep';
const financialStatementsURL = 'http://localhost:3010/api/upload/finsRep';
const InsuranceURL = 'http://localhost:3010/api/upload/insuranceRep';
const ndaURL = 'http://localhost:3010/api/upload/ndaData';

const libilURL = 'http://localhost:3010/api/upload/libil';
const retireURL = 'http://localhost:3010/api/upload/retirePlan';
const keyContactURL = 'http://localhost:3010/api/upload/keyConract';
const federalURL = 'http://localhost:3010/api/upload/federal';

@Component({
  selector: 'app-seller-edit',
  templateUrl: './seller-edit.component.html',
  styleUrls: ['./seller-edit.component.scss']
})
export class SellerEditComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('closeLogin') closeLogin: ElementRef;
  @ViewChild('tab') public tabs: NgbTabset;
  licensePdfSrc: string;
  socPdfSrc :string;
  premisePdfSrc :string;
  bankPdfSrc :string;
  licenseReportPdfSrc :string;
  certPdfSrc :string;
  reportsPdfSrc :string;
  finsPdfSrc:string;
  insPdfSrc :string;
  ndaPdfSrc:string;
  showLicensePdf: boolean = false;
  showSocPdf: boolean = false;
  showBankPdf:boolean = false;
  showLicenseReportPdf :boolean =false;
  showPremisePdf:boolean =false;
  showCertPdf:boolean =false;
  showReportsPdf:boolean = false;
  showFinsPdf:boolean =false;
  showInsPdf :boolean =false;
  SecondaryImageData: any = [];
  saveProperty: boolean = false;
  ser_name: any;
  licensePDF: any = [];
  maxFileSize = 1048576; 
  page: number = 1; 
  id: any;
  place: any;
  center: any;
  position: any;
  address: any;
  currentUser: any;
  businessRegisterData: FormGroup;
  ImageRegisterData: FormGroup;
  EquipmentRegisterData: FormGroup;
  isUpload = false;
  submitted = false;
  state_default = true;
  Data: any;
  Comp_id = [];

  CompanyID = '';
  getEquip: any = [];
  deleteEquipment: any = [];
  tabsInitialized = false;
  currentState: string;
  //currentState:string;
  minList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  maxList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  Equip: any;
  currentCounty: string;
  currentPrice: string;
  currentRevenue: string;
  currentCashflow: string;
  subbuilding_types: any = [];
  currentAnnualRevenue: string;
  curCashflow: string;
  curCmpType: string;
  curCmpStatus: string;
  curEmpCount: string;
  stateList: any = [];
  countyList: any = [];
  citiesList: any = [];
  building_types: any = [];
  building_subtypes: any = [];
  SubcatList: any = [];
  safeURL: any;
  curCategory: string;
  curExpense: string;
  curEquipment: string;
  currentBuildingSubType: string;
  currentBuildingType: string;
  curSubCategory: string;
  imageList: any = [];
  primaryImage: any = [];
  SecondaryImage: any = [];
  Title: any;
  Data1: any;
  Equipment_Details: any = [];
  subcategoryList: any;
  subChildList: any;
  currentChild: string;
  baseCategoryList: any = [];
  childCategoryList: any = [];
  subchildCategoryList: any = [];
  list = [];
  submit = false;
  equipID = 0;
  equipmentId = 0;
  EquipName: string;
  Equip_Nos: string;
  curSellType: string;
  equip_data = [];
  getlist = [];
  currentcounty: any;
  editEquipment_Details: any = [];
  prime_Image: any;
  sec_Images: any = [];
  img: boolean;
  user_name: any;
  licenseData: boolean = false;
  socData: boolean = false;
  licenseReportData: boolean = false;
  bankData: boolean = false;
  certData: boolean = false;
  reportsdata: boolean = false;
  finsData: boolean = false;
  InsData: boolean = false;
  preData: boolean = false;
  ndaData: boolean = false;
  priImage: boolean = false;
  secImage: boolean = false;
  retirePlanData:boolean =false;
  keyContractData:boolean =false;
  federalPlanData:boolean =false;
  liblsData:boolean =false;
  showLibilsPdf:boolean=false;
  showRetirePlanPdf :boolean =false;
  showKeyContractPdf :boolean =false;
  showCompliancePdf :boolean =false;
  userData:any=[];
  sellTypeList = [{ name: 'Sell', value: 0 }, { name: 'Lease', value: 1 }]
  companyStatus = ['Running', 'Dormant'];
  employeesCount = ['1-10', '11-25', '26-50', '51-100', '101-200', '200+']
  priceList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  companyTypeList = ['Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited', 'Trust', 'Co-Operative'];
  //public uploader: FileUploader = new FileUploader({url: SECURL, itemAlias: 'SecondaryImage'});

  //public uploader: FileUploader = new FileUploader({url: SECURL, itemAlias: 'SecondaryImage'});
  public federalPlanUploader: FileUploader = new FileUploader({ url: federalURL, itemAlias: 'federalImage' });
  public keyContractPlanUploader: FileUploader = new FileUploader({ url: keyContactURL, itemAlias: 'keyContractImage' });
  public liabilitiesUploader: FileUploader = new FileUploader({ url: libilURL, itemAlias: 'libilsImage' });
  public retirementPlanUploader: FileUploader = new FileUploader({ url:retireURL, itemAlias: 'retirePlanImage' });
  public licenseUploader: FileUploader = new FileUploader({ url: licenseURL, itemAlias: 'license' });
  public socialSecurityUploader: FileUploader = new FileUploader({ url: socialSecurityURL, itemAlias: 'socialSecurity' });
  public primaryImageUploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'PrimaryImage' });
  public SecondaryImageUploader: FileUploader = new FileUploader({ url: SECURL, itemAlias: 'SecondaryImage' });
  public premiseUploader: FileUploader = new FileUploader({ url: premiseURL, itemAlias: 'preLeaseImage' });
  public bankReportUploader: FileUploader = new FileUploader({ url: bankReportURL, itemAlias: 'bankPDF' });
  public licenseReportUploader: FileUploader = new FileUploader({ url: licenseFinURL, itemAlias: 'licenseRep' });
  public certificateUploader: FileUploader = new FileUploader({ url: certificatesURL, itemAlias: 'certificateRep' });
  public reportsUploader: FileUploader = new FileUploader({ url: reportsURL, itemAlias: 'reports' });
  public finStatementsUploader: FileUploader = new FileUploader({ url: financialStatementsURL, itemAlias: 'finState' });
  public insuranceUploader: FileUploader = new FileUploader({ url: InsuranceURL, itemAlias: 'insurance' });
  public NDAUploader: FileUploader = new FileUploader({ url: ndaURL, itemAlias: 'ndaImage' });
  processMstr: any;
  selectAction: any;
  order_num: any;
  seller_processList = [];
  user_id: any;
  constructor(private fb: FormBuilder, private user: NodeService,
    private _sanitizer: DomSanitizer, private process: ProcessService,
    private router: Router, private route: ActivatedRoute,
    public home: HomeNodeService, public equip: EquipmentService) {

    this.route.queryParams
      .filter(params => params.com_id)
      .subscribe(params => {
        console.log(params);
        this.id = params.com_id;
      });


    this.businessRegisterData = this.fb.group({
      userId: [''],
      CompanyId: [''],
      Name: ['', Validators.required],
      agentName: ['', Validators.required],
      agentEmail: ['', Validators.required],
      homeAddress: ['', Validators.required],
      agentContact: ['', Validators.required],
      emailAddress: ['', Validators.required],
      faxNumber: [''],
      cellPhone: [''],
      homePhone: [''],
      secName: [''],
      secNum: [''],
      bestTelePhone: [''],
      dob: [''],
      birthPlace: [''],
      homeTelePhone: [''],
      Title: ['', Validators.required],
      State: ['', Validators.required],
      County: ['', Validators.required],
      Price: [''],
      Revenue: ['', Validators.required],
      CashFlow: ['', Validators.required],
      Description: ['', Validators.required],
      Category: ['', Validators.required],
      SubCategory: ['', Validators.required],
      SubChildCategory: [''],
      CmpType: ['', Validators.required],
      SellType: ['', Validators.required],
      EmpCount: [''],
      YoutubeUrl: ['', Validators.required],
      Latitude: [''],
      Longitude: [''],
      Address: ['', Validators.required],
      ZipCode: [''],
      BuildingType: ['', Validators.required],
      BuildingSubTypes: ['', Validators.required],
      BuildingSize: [''],
      builtYear: [''],
      restRoom: [''],
      buildingZone: [''],
      buildingPark: [''],
      totalAreaSize: [''],
      rentDetail: [''],
      industryDetail: ['',],
      zoningDetail: ['',],
      Expense: ['', Validators.required],
      accountant: ['', Validators.required],
      attorney: ['', Validators.required],
      bussinessBrokerDetails: [''],
      saleAmount: [''],
      whySell: ['', Validators.required],
      desiredTime: [''],
      fees: [''],
      escrow: [''],
      legal: [''],
      accounting: [''],
      valuation: ['']
    });
    this.EquipmentRegisterData = this.fb.group({
      equipmentName: [''],
      equipmentCount: [''],
    });

  }

  get f() { return this.businessRegisterData.controls; }
  get add() { return this.EquipmentRegisterData.controls; }
  ngOnInit() {

    if (sessionStorage.length) {
      if (sessionStorage.getItem('Bizops_User')) {
        this.currentUser = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = this.currentUser.USER_FIRSTNAME;
        this.user_id = this.currentUser.ID;
        // this.isUser = true;       
      }
    }


    this.user.getBizbyid(this.id).subscribe(
      data => {
        this.Data = data;
        this.list = this.Data;
        console.log(this.list);
        const load = this.list[0];
        this.userData.push(this.list[0]);
        console.log(this.userData );
        this.Title = load.TITLE;
        this.curCategory = load.CATEGORY;
        this.curSubCategory = load.SUBCATEGORY;
        this.currentPrice = load.PRICE;
        this.currentState = load.STATE;
        this.currentCounty = load.COUNTY;
        this.curCmpType = load.COMPANY_TYPE;
        this.currentcounty = load.COUNTY;
        this.curSellType = load.SELL_TYPE;
        this.curEmpCount = load.EMPLOYEE_COUNT;
        this.currentRevenue = load.REVENUE;
        this.currentCashflow = load.CASH_FLOW;
        this.curExpense = load.EXPENSE;
        this.currentBuildingType = load.BUILDING_TYPE;
        this.currentBuildingSubType = load.BUILDING_SUBTYPE;
        this.prime_Image = load.IMG_NAME;
        this.businessRegisterData.patchValue({
          Title: load.TITLE,
          Description: load.LONG_DESC,
          State: load.STATE,
          County: load.COUNTY,
          Price: load.PRICE,
          Category: load.CATEGORY,
          SubCategory: load.SUBCATEGORY,
          SubChildCategory: load.SUBCHILD,
          CmpType: load.COMPANY_TYPE,
          SellType: load.SELL_TYPE,
          CmpStatus: load.COMPANY_STATUS,
          EmpCount: load.EMPLOYEE_COUNT,
          YoutubeUrl: load.YOUTUBE_URL,
          Address: load.ADDRESS,
          Latitude: load.LATITUDE,
          Longitude: load.LONGITUDE,
          Flag: load.PUBLISHED,
          ZipCode: load.ZIPCODE,
          BuildingType: load.BUILDING_TYPE,
          BuildingSubTypes: load.BUILDING_SUBTYPE,
          BuildingSize: load.BUILDING_SIZE,
          builtYear: load.BUILT_YEAR,
          restRoom: load.NO_OF_RESTROOMS,
          buildingZone: load.BUILDING_ZONE,
          buildingPark: load.PARKING,
          totalAreaSize: load.PRE_SIZE,
          rentDetail: load.RENT,
          industryDetail: load.INDUSTRY_SPECIFIC,
          zoningDetail: load.ZONING,
          Revenue: load.REVENUE,
          CashFlow: load.CASH_FLOW,
          Expense: load.EXPENSE,
          accountant: load.ACCOUNTANT,
          attorney: load.ATTORNEY,
          bussinessBrokerDetails: load.BUSINESS_BROKER,
          Name: load.NAME,
          agentName: load.AGENT_NAME,
          agentEmail: load.AGENT_EMAIL,
          homeAddress: load.HOME_ADDRESS,
          agentContact: load.AGENT_CONTACT,
          emailAddress: load.EMAIL_ADDRESS,
          faxNumber: load.FAX_NUMBER,
          cellPhone: load.CELL_NUMBER,
          homePhone: load.HOME_NUMBER,
          secName: load.SECURITY_NAME,
          secNum: load.SECURITY_NUMBER,
          bestTelePhone: load.TELEPHONE,
          dob: load.DOB,
          birthPlace: load.BIRTH_PLACE,
          homeTelePhone: load.HOME_TELEPHONE,
          saleAmount: load.SALE_AMOUNT,
          whySell: load.WHY_SELLING,
          desiredTime: load.DESIRED_TIME_TO_CLOSE,
          fees: load.FEES,
          escrow: load.ESCROW,
          legal: load.LEGAL,
          accounting: load.ACCOUNTING,
          valuation: load.VALUATION
        })

        this.user.getImage(this.id).subscribe(
          data => {
            //   this.blockUI.stop();
            const secImgList = data;
            if (secImgList.length > 0) {
              this.img = true;
              this.sec_Images = secImgList;
            } else {
              this.img = false;
            }
            this.home.getBaseCategory().subscribe(
              data => {
                this.baseCategoryList = data;
                this.home.getChildCategory().subscribe(
                  data => {
                    this.childCategoryList = data;
                    this.home.getSubchildCategory().subscribe(
                      data => {
                        this.subchildCategoryList = data;
                        this.home.getStateList().subscribe(
                          data => {
                            this.stateList = data;
                            this.home.getCountyList().subscribe(
                              data => {
                                this.countyList = data;
                                this.home.getProcessMstr().subscribe(
                                  processData => {
                                    this.processMstr = processData;

                                    this.equip.getEquip(this.id).subscribe(
                                      data => {
                                        this.Equip = data;
                                        this.equip_data = this.Equip;
                                        for (let i = 0; i < this.equip_data.length; i++) {
                                          const equipList = {
                                            id: this.equip_data[i].ID,
                                            name: this.equip_data[i].EQUIPMENT_NAME,
                                            value: this.equip_data[i].NO_OF_EQUIPMENTS
                                          }
                                          this.Equipment_Details.push(equipList);
                                        }

                                      });

                                  });
                              });
                          });
                      });
                  });
              });

          });
      },
      error => {
        alert('Server Error');
      });


    this.licenseUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#license");
        this.licenseData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.licensePdfSrc = e.target.result;
            this.showLicensePdf = true;
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
    this.socialSecurityUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#socialSecurity");
        this.socData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.socPdfSrc = e.target.result;
            this.showSocPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            // this.pdfFiles.push(list);
          }
          if (img.size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
            this.isUpload = true;
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
    this.primaryImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        console.log(file);
        this.priImage = true;
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.primaryImage.push(list);
          console.log(this.primaryImage)
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };

    this.SecondaryImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        this.secImage = true;
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.SecondaryImageData.push(list);
          console.log(this.SecondaryImageData);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };

    this.premiseUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#preLeaseImage");
        this.preData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.premisePdfSrc = e.target.result;
            this.showPremisePdf = true;
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
    this.bankReportUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#bankPDF");
        this.bankData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.bankPdfSrc = e.target.result;
            this.showBankPdf = true;
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
    this.licenseReportUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#licenseRep");
        this.licenseReportData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.licenseReportPdfSrc = e.target.result;
            this.showLicenseReportPdf = true;
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
        let img: any = document.querySelector("#certificateRep");
        this.certData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.certPdfSrc = e.target.result;
            this.showCertPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          console.log(img.files[0]);
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };

    this.reportsUploader.onAfterAddingFile = (file) => {
      if (file) {
        this.reportsdata = true;
        let img: any = document.querySelector("#reports");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.reportsPdfSrc = e.target.result;
            this.showReportsPdf = true;
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
        let img: any = document.querySelector("#finState");
        this.finsData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.finsPdfSrc = e.target.result;
            this.showFinsPdf = true;
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
        let img: any = document.querySelector("#insurance");
        this.InsData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.insPdfSrc = e.target.result;
            this.showInsPdf = true;
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
    this.NDAUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#ndaImage");
        this.ndaData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.ndaPdfSrc = e.target.result;
            // this.showNDAPdf = true;
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
    this.liabilitiesUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#libilsImage");
        this.liblsData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            // this.libilsPdfSrc = e.target.result;
            this.showLibilsPdf = true;
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
    this.retirementPlanUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#retirePlanImage");
        this.retirePlanData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            // this.pdfSrc = e.target.result;
            this.showRetirePlanPdf = true;
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
    this.keyContractPlanUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#keyContractImage");
        this.keyContractData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            // this.pdfSrc = e.target.result;
            this.showKeyContractPdf = true;
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
    this.federalPlanUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#federalImage");
        this.federalPlanData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            // this.pdfSrc = e.target.result;
            this.showCompliancePdf = true;
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


  changeState($event) {
    if ($event == undefined) { this.citiesList = []; } else { this.citiesList = this.countyList.filter((item) => { return item.state_code === $event.state_code; }); }
  }

  changeCategory($event) {
    this.subcategoryList = [];
    this.subChildList = [];
    if ($event == undefined) { this.subcategoryList = []; this.subChildList = []; } else { this.subcategoryList = this.childCategoryList.filter((item) => { return item.cid === $event.cid; }); }
  }

  changesubCategory($event) {
    this.subChildList = [];
    if ($event == undefined) { this.subChildList = []; } else { this.subChildList = this.subchildCategoryList.filter((item) => { return item.subcid === $event.subid; }); }
  }

  changeBuildingType($event) {
    this.subbuilding_types = [];
    if ($event == undefined) { this.subbuilding_types = []; }
    this.subbuilding_types = this.building_subtypes.filter((item) => { return item.TYPE_ID === $event.TYPE_ID; });
  }

  clearFile() {
    this.fileInput.nativeElement.value = '';
    this.SecondaryImage = [];
  }

  clearPrimaryImage() {
    this.fileInput.nativeElement.value = '';
    this.primaryImage = [];
  }

  processAction(value) {
    console.log(value);
    this.selectAction = value;
  }

  selectProcess(value) {
    if (this.seller_processList.length == 0) {
      this.order_num = 1
    }
    else {
      this.order_num = this.order_num + 1;
    }
    // var process = this.processMstr.filter((item) => item.PROCESS_ID == value);
    var process = this.processMstr.filter((item) => item.STEP_NAME == value);
    var _obj = {
      Order_num: this.order_num,
      Instruction: process[0].STEP_NAME,
    }
    this.seller_processList.push(_obj);
    console.log(this.seller_processList);
  }

  placeChanged(place) {
    this.place = place;
    this.center = place.geometry.location;
    this.address = place.formatted_address;
    const lng = place.geometry.location.lng();
    const lat = place.geometry.location.lat();
    this.position = [lat, lng];

    this.businessRegisterData.patchValue({
      Latitude: this.position[0],
      Longitude: this.position[1],
      Address: this.address,
    });
  }

  businessRegister() {
    this.submitted = true;
    if (this.businessRegisterData.invalid) {
      return

    }
    else {
      this.businessRegisterData.patchValue({
        userId: this.currentUser.ID,
        CompanyId: this.id,
      });

      console.log(this.businessRegisterData.value);
      this.user.createBiz(this.businessRegisterData.value).subscribe(
        data => {
          this.Data = data;
          this.CompanyID = data;
          this.equip.deleteEquip(this.id).subscribe(
            data => {
              this.Data = data;
              if (this.Data) {
                const details = {
                  com_id: this.CompanyID,
                  values: this.Equipment_Details
                }

                // this.user.createEquip(details).subscribe(
                //   data => {
                //     this.Data = data;
                //     if (this.Data) {

                this.process.deleteProcess(this.CompanyID).subscribe(data => {

                  var res = data;
                  if (res > 0) {


                    var processList = {
                      companyId: this.CompanyID,
                      UserId: this.user_id,
                      list: this.seller_processList
                    }
                    this.process.createBusinessProcess(processList).subscribe(
                      data => {
                        var res = data;
                        if (res > 0) {

                          this.primaryImageUploader.setOptions({
                            additionalParameter: { Company_ID: this.CompanyID }
                          });
                          if (this.primaryImage.length > 0) {
                            if (this.priImage) {
                              this.primaryImageUploader.uploadAll();
                              this.primaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                                if (this.SecondaryImageData.length > 0) {
                                  this.user.deleteSecImages(this.id).subscribe(
                                    data => {
                                      this.Data = data;
                                      if (this.secImage) {
                                        this.SecondaryImageUploader.setOptions({
                                          additionalParameter: { Company_ID: this.CompanyID }
                                        });
                                        this.SecondaryImageUploader.uploadAll();
                                        this.SecondaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                                        };
                                      }
                                    });
                                }
                              };
                            }
                          }

                          if (this.licenseData) {
                            this.licenseUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.licenseUploader.uploadAll();
                            this.licenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.socData) {
                            this.socialSecurityUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.socialSecurityUploader.uploadAll();
                            this.socialSecurityUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.licenseReportData) {
                            this.licenseReportUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.licenseReportUploader.uploadAll();
                            // }                                                                      
                            this.licenseReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.preData) {
                            this.premiseUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.premiseUploader.uploadAll();
                            this.premiseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.bankData) {
                            this.bankReportUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.bankReportUploader.uploadAll();
                            this.bankReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.certData) {
                            this.certificateUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.certificateUploader.uploadAll();
                            this.certificateUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          };
                          if (this.reportsdata) {
                            this.reportsUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.reportsUploader.uploadAll();
                            this.reportsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.finsData) {
                            this.finStatementsUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.finStatementsUploader.uploadAll();
                            this.finStatementsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.InsData) {
                            this.insuranceUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.insuranceUploader.uploadAll();
                            this.insuranceUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.ndaData) {
                            this.NDAUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.NDAUploader.uploadAll();
                            this.NDAUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.liblsData) {
                            this.liabilitiesUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.liabilitiesUploader.uploadAll();
                            this.liabilitiesUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.retirePlanData) {
                            this.retirementPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.retirementPlanUploader.uploadAll();
                            this.retirementPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.retirePlanData) {
                            this.retirementPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.retirementPlanUploader.uploadAll();
                            this.retirementPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.keyContractData) {
                            this.keyContractPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.keyContractPlanUploader.uploadAll();
                            this.keyContractPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          if (this.federalPlanData) {
                            this.federalPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                            this.federalPlanUploader.uploadAll();
                            this.federalPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            };
                          }
                          alert('Created Successfully !!!');
                          this.router.navigate(['/list/addedlist']);
                        }
                      },
                      error => {
                        alert('Server Error');
                        console.log(error);
                      });
                  }
                });


              }
            });
        },
        error => {
          alert('Server Error');
          console.log(error);
        });
    }
  }
  EquipRegister() {
    this.submit = true;
    if ((this.EquipmentRegisterData.value.equipmentName == null) || (this.EquipmentRegisterData.value.equipmentCount == null)) {
      alert('Invalid Fields');
    } else {
      if (this.editEquipment_Details.length != 0) {
        for (let i = 0; i < this.Equipment_Details.length; i++) {
          if (this.Equipment_Details[i].id == this.editEquipment_Details[0].id) {
            this.Equipment_Details[i].name = this.EquipmentRegisterData.value.equipmentName;
            this.Equipment_Details[i].value = this.EquipmentRegisterData.value.equipmentCount;
            this.editEquipment_Details = [];
            this.EquipmentRegisterData.reset();
            { this.closeLogin.nativeElement.click(); }
          }
        }
      } else {
        const Details = this.EquipmentRegisterData.value;
        const equipmentList = {
          id: this.equipID,
          name: Details.equipmentName,
          value: Details.equipmentCount,
        }
        this.Equipment_Details.push(equipmentList);
        alert('Successfully Created')
        this.equipID = this.equipID + 1;
        this.EquipmentRegisterData.reset();
        { this.closeLogin.nativeElement.click(); }
      }
    }
  }
  deleteEquip(val) {
    this.Equipment_Details = this.Equipment_Details.filter((item) => {
      return item.id != val;
    });
  }
  editEquip(val) {
    this.editEquipment_Details = this.Equipment_Details.filter((item) => {
      return item.id === val;
    });
    this.EquipName = this.editEquipment_Details[0].name;
    this.Equip_Nos = this.editEquipment_Details[0].value;
  }
  personalInfoNext() {
    this.tabs.select('tab-business');
  }
  bussinessInfoNext() {
    this.tabs.select('tab-finance');
  }
  financialInfoNext() {
    this.tabs.select('tab-building');
  }
  buidingInfoNext() {
    this.tabs.select('tab-premises');
  }
  premisesInfoNext() {
    this.tabs.select('tab-equipment');
  }
  equipmentInfoNext() {
    this.tabs.select('tab-agent');
  }
  agentInfoNext() {
    this.tabs.select('tab-terms');
  }
  TermsInfoNext() {
    this.tabs.select('tab-services');
  }
  ServicesInfoNext() {
    this.tabs.select('tab-process_overview');
  }
  ProcessOverviewNext(){   
    this.tabs.select('tab-other-documents');
  }
  otherDocsNext(){
    this.saveProperty =true;
  }
  viewLicense(){
    this.showLicensePdf =true;
  }
  viewSoc(){
    this.showSocPdf = true;
  }
  viewBankData(){
    this.showBankPdf = true;
  }
  viewLicenseReport(){
    this.showLicenseReportPdf = true;
  }
  viewCertData(){
    this.showCertPdf = true;
  }
  viewReport(){
    this.showReportsPdf = true;
  }
  viewFinancialData(){
    this.showFinsPdf = true;
  }
  viewInsData(){
    this.showInsPdf = true;
  }
  viewPremiseData(){
    this.showPremisePdf = true;
  }
  viewLibilsData(){
    this.showLibilsPdf = true;
  }
  viewRetirePlandata(){
    this.showRetirePlanPdf = true;
  }
  viewKeyContractData(){
    this.showKeyContractPdf = true;
  }
  viewComplianceData(){
    this.showCompliancePdf = true;
  }
}
