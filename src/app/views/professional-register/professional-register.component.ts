import { Component, OnInit,ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader} from "ng2-file-upload/ng2-file-upload";
import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
const URL = "http://localhost:3010/api/profile/upload";
const profLicenseURL = "http://localhost:3010/api/professional/profLicense";
const driverLicenseURL = 'http://localhost:3010/api/professional/driverLicense';
const socialSecurityURL = 'http://localhost:3010/api/professional/profSocialSecurity';
@Component({
  selector: "app-professional-register",
  templateUrl: "./professional-register.component.html",
  styleUrls: ["./professional-register.component.scss"]
})
export class ProfessionalRegisterComponent implements OnInit {
  @ViewChild('tab') public tabs: NgbTabset;
  public profileImgUploader: FileUploader = new FileUploader({url: URL,itemAlias: "profileImage"});
  public profLicenseUploader: FileUploader = new FileUploader({url: profLicenseURL,itemAlias: "profLicense"  });
  public licenseUploader: FileUploader = new FileUploader({url: driverLicenseURL, itemAlias: 'license' });
  public socialSecurityUploader: FileUploader = new FileUploader({ url: socialSecurityURL, itemAlias: 'profSocialSecurity' });
  professionalRegisterData: FormGroup;
  submitted = false;
  justified:string='justified';
  showPreview = false;
  isUpload = false;
  isImage=false;
  Data: any=[];
  prof_ID='';
  profileData: any;
  driverLicenseFiles: any = [];
  profLicenseFiles:any =[];
  socFiles:any=[];
  pdfPage: any = [];
  showPdf: boolean = false;
  page: number = 1;
  pdfSrc: string;
  category: string;
  saveProperty:boolean =true;
  //subCategory: string;
  prof_Category:any;
  subCategoryList: any = [];
  primaryImage: any = [];
  user_name: any;
  user_id: any;
  place: any;
  center: any;
  position: any;
  address: any;
  maxFileSize = 1048576;  
  isProf = false;
  profCategory: string;
  socData:boolean=false;
  driverLicenseData:boolean = false;
  profLicenseData:boolean = false;
  specialtyList = [
    { value: 1, label: "Architect" },
    { value: 2, label: "Landscaper" }
  ];

  categoryList = [
    "Accounting & Finance",
    "Construction",
    "Human Resources",
    "Information Technology",
    "Legal",
    "Logistics & Transportation",
    "Marketing, Advertising & Promotions",
    "Real Estate",
    "Telecommunications & Cable",
    "Priciple Agent"
  ];

  baseCategory = [
    { id: 1, value: "Accounting & Finance" },
    { id: 2, value: "Construction" },
    { id: 3, value: "Human Resources" },
    { id: 4, value: "Information Technology" },
    { id: 5, value: "Legal" },
    { id: 6, value: "Logistics & Transportation" },
    { id: 7, value: "Marketing, Advertising & Promotions" },
    { id: 8, value: "Real Estate" },
    { id: 9, value: "Telecommunications & Cable" },
    { id: 10, value: "Priciple Agent" }
  ];

  subCategory = [
    { id: 2, value: "Architect" },
    { id: 2, value: "Landscape" },
    { id: 2, value: "Surveyor" },
    { id: 2, value: "Contractor" },
    { id: 2, value: "Engineer" },
    { id: 4, value: "Cybersecurity" },
    { id: 4, value: "Software development" },
    { id: 4, value: "IT Support" },
    { id: 4, value: "Systems analyst" }
  ];
  constructor(
    private fb: FormBuilder,
    private user: NodeService,
    private route: ActivatedRoute,
    public router: Router,
    private home: HomeNodeService
  ) {}
    ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        // this.isUser = true;
      }
    }
    this.route.queryParams
      .filter(params => params.Type)
      .subscribe(params => {
        this.profCategory = params.Type;
        this.isProf = true;
      });
    this.professionalRegisterData = this.fb.group({
      UserId: [""],
      Id: [''],
      UserName:[''],
      Name: ['',Validators.required],     
      homeAddress: ['',Validators.required],     
      emailAddress: ['',Validators.required],
      faxNumber: [''],
      cellPhone: [''],
      homePhone: [''],  
      dob: [''],
      birthPlace: [''],
      homeTelePhone: [''],
      companyName: ['',Validators.required],
      businessAddress: ['',Validators.required],
      businessEmail: ['',Validators.required],
      telePhoneNumber: [''],
      bestTelePhone :[''],
      websiteName: [''],
      insName :['',Validators.required],
      insTelePhoneNumber :[''],
      insAddress :['',Validators.required],
      insuranceType :['',Validators.required],
      insEmail :['',Validators.required],
      Category :[''],
      SubCategory:['']
    });

    this.profileImgUploader.onAfterAddingFile = file => {
      if (file) {
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        this.isImage=true;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(",")[1]
          };
          this.primaryImage.push(list);
        };
        reader.readAsDataURL(imageFile);
        this.isUpload = true;
      }
    };
    this.profLicenseUploader.onAfterAddingFile = file => {
      if (file) {
        let img: any = document.querySelector("#profLicense");
        this.profLicenseData = true;
        if (typeof FileReader !== "undefined") {
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
            this.profLicenseFiles.push(list);
          };
          reader.readAsArrayBuffer(img.files[0]);
        }
      }
    };
    this.licenseUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#license");
        this.driverLicenseData = true;
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
            this.driverLicenseFiles.push(list);     
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
        let img: any = document.querySelector("#profSocialSecurity");
        this.socData = true;
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
             this.socFiles.push(list);
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
  }

  get f() {
    return this.professionalRegisterData.controls;
  }

  changeCategory($event) {
    this.subCategoryList = this.subCategory.filter(item => {
      return item.id == $event.id;
    });
  }

  ProfessionalRegister() {
    this.submitted = true;
    // if (!this.isProf) {
    //   this.professionalRegisterData.patchValue({
    //     UserId: this.user_id
    //   });
    // } else {
    //   this.professionalRegisterData.patchValue({
    //     UserId: this.user_id,
    //     Category: "Priciple Agent"
    //   });
    // }
    if (this.professionalRegisterData.invalid) {
      return;
    } else {
      this.professionalRegisterData.patchValue({
        UserId: this.user_id,
        UserName :this.user_name,
        Id:0       
      });
      this.user
        .createProfessional(this.professionalRegisterData.value)
        .subscribe(
          data => {           
            this.prof_ID = data;
            this.Data = data;
            const rows = this.Data;
            if (rows > 0) {
              if(this.isImage){
              this.profileImgUploader.setOptions({additionalParameter: {ID:this.prof_ID,UserName: this.professionalRegisterData.value.UserName}});
              this.profileImgUploader.uploadAll();
              this.profileImgUploader.onCompleteItem = (item: any,response: any,status: any,headers: any) => { 
                if (this.profLicenseData) {
                  this.profLicenseUploader.setOptions({additionalParameter: {ID:this.prof_ID,UserName: this.professionalRegisterData.value.UserName,user_id :this.user_id}});
                  this.profLicenseUploader.uploadAll();
                  this.profLicenseUploader.onCompleteItem = (item: any,response: any,status: any,headers: any) => {  
                    if (this.driverLicenseData) {
                      this.licenseUploader.setOptions({ additionalParameter: {ID:this.prof_ID,UserName: this.professionalRegisterData.value.UserName,user_id :this.user_id} });
                      this.licenseUploader.uploadAll();
                      this.licenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        if (this.socData) {
                          this.socialSecurityUploader.setOptions({ additionalParameter: {ID:this.prof_ID,UserName: this.professionalRegisterData.value.UserName,user_id :this.user_id}});
                          this.socialSecurityUploader.uploadAll();
                          this.socialSecurityUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            alert("Created Successfully !!!");
                            this.router.navigate(["/operate/hire"]);
                            this.professionalRegisterData.reset();
                          };
                        
                        }
                       
                      };
                    }              
                  };
                }             
              };
            }
             
              
           
            }
          },
          error => {
            alert("Server Error");
            console.log(error);
          }
        );
    }
  }

  preview() {
    if (this.professionalRegisterData.invalid) {
      alert("fill all the fields !!!");
    } else {
      this.showPreview = !this.showPreview;
      this.profileData = this.professionalRegisterData.value;
    }
  }
  clearPDF() {
    this.pdfSrc = "";
    this.showPdf = false;
  }

  clearPrimaryImage() {
    this.primaryImage = [];
  }
  businessInfoNext(){   
    this.tabs.select('tab-ins');
  }
  insInfoNext(){
    this.saveProperty = true;   
  }
  personalInfoNext(){
    this.tabs.select('tab-business');
  }
  placeChanged(place) {
    this.place = place;
    this.center = place.geometry.location;
    this.address = place.formatted_address;
    const lng = place.geometry.location.lng();
    const lat = place.geometry.location.lat();
    this.position = [lat, lng];
  }
  beforeChange(event: NgbTabChangeEvent) {
    if (event.nextId === 'tab-preventchange2') {
      event.preventDefault();
    }
  }
  clearDriverLicense(){
    this.driverLicenseFiles =[];
  }
  clearProfileImage(){
    this.primaryImage =[];
  }
  clearSocFile(){
    this.socFiles = [];
  }
  clearProfessionalLicense(){
    this.profLicenseFiles = [];
  }
}
