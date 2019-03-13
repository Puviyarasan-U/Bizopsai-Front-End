import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Directive,
  ChangeDetectionStrategy,
  AfterViewInit
} from "@angular/core";
import { ListService } from "../../services/list.service";
// import { StateListService } from '../services/statelist.service';
// import { List } from '../services/statelist.service'
import { Router } from "@angular/router";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { ItemsList } from "@ng-select/ng-select/ng-select/items-list";
import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";

declare const google: any;

@Component({
  selector: "app-lease",
  templateUrl: "./lease.component.html",
  styleUrls: ["./lease.component.scss"]
})
export class LeaseComponent implements OnInit {
  @ViewChild("location") location: ElementRef;
  masterProductList: any = [];
  productList: any = [];
  enableMapview = false;
  lat = "41.850033";
  lng = "-87.6500523";
  pos: any = [this.lat, this.lng];
  productData: any;
  productImage: any;
  productTitle: any;
  productDesc: any;
  productPrice: any;
  productPlace: any;
  building_types: any = [];
  currentBuildingType: any;
  user_request = "";
  filteredBuildingType: any = [];
  zipBuild: any = [];
  zipSecBuild: any = [];
  filteredLocation: any = [];
  marker = {
    display: true,
    lat: null,
    lng: null
  };

  constructor(
    public salelist: ListService,
    private user: NodeService,
    public router: Router,
    public home: HomeNodeService
  ) {}

  ngOnInit() {
    this.home.getLeaseList().subscribe(
      data => {
      //   this.blockUI.stop();
      this.masterProductList = data;
      this.productList = data;
      this.home.getBuildingTypes().subscribe(
        data => {
          this.building_types = data;
          console.log(this.building_types);
        },
        error => {
          alert("Server Error");
        }
      );
    });
  }
  search_Mapview() {
    this.enableMapview = true;
  }
  search_Datatable() {
    this.enableMapview = false;
  }
  clicked({ target: marker }, id) {
    this.productData = this.productList.filter(item => {
      return item.COMPANY_ID == id;
    });
    this.productImage = this.productData[0].IMG_NAME;
    this.productTitle = this.productData[0].TITLE;
    this.productDesc = this.productData[0].LONG_DESC;
    this.productPrice = this.productData[0].PRICE;
    this.productPlace = this.productData[0].STATE;
    marker.nguiMapComponent.openInfoWindow("iw", marker);
  }

  // detail(value) {
  //   this.router.navigate(["/home/detail"], { queryParams: { com_id: value } });
  // }
  
  leaseDetail(value){
    this.router.navigate(["/home/detail"], { queryParams: { biz_id: value } });
  }

  userSearch() {
    // this.filteredBuildingType=this.productList;
    if (this.currentBuildingType != "" && this.user_request != "") {
      this.productList = this.filteredBuildingType;
      if (
        (this.user_request >= "a" && this.user_request <= "z") ||
        (this.user_request >= "A" && this.user_request <= "Z")
      ) {
        this.productList = this.productList.filter(item => {
          return item.STATE.toLowerCase() === this.user_request.toLowerCase();
        });
        console.log(this.productList);
        this.zipBuild = this.productList;
      } else {
        this.zipBuild = this.productList;
        this.productList = this.zipBuild.filter(item => {
          return item.ZIPCODE === this.user_request.toLowerCase();
        });
      }
    } else if (this.currentBuildingType != "" && this.user_request == "") {
      this.productList = this.masterProductList;
      this.productList = this.productList.filter(item => {
        return item.BUILDING_TYPE === this.currentBuildingType;
      });
    } else if (this.currentBuildingType == "" && this.user_request != "") {
      if (
        (this.user_request >= "a" && this.user_request <= "z") ||
        (this.user_request >= "A" && this.user_request <= "Z")
      ) {
        this.productList = this.masterProductList;
        this.productList = this.productList.filter(item => {
          return item.STATE.toLowerCase() === this.user_request.toLowerCase();
        });
      } else {
        this.productList = this.masterProductList;
        this.productList = this.productList.filter(item => {
          return item.ZIPCODE === this.user_request.toLowerCase();
        });
        console.log(this.productList);
      }
    } else {
      this.productList = this.masterProductList;
      return this.productList;
    }
  }
  changeBuildingType($event) {
    this.productList = this.masterProductList;
    if ($event != undefined) {
      this.filteredBuildingType = [];
      console.log($event.TYPES);
      this.productList = this.productList.filter(item => {
        return item.BUILDING_TYPE === $event.TYPES;
      });
      this.currentBuildingType = $event.TYPES;
      this.filteredBuildingType = this.productList;
    } else {
      this.currentBuildingType = "";
      this.productList = this.masterProductList;
      return this.productList;
    }
  }
  onSearchChange(value) {
    if (value == "") {
      this.clearFilter();
    }
  }
  clearFilter() {
    this.productList = this.masterProductList;
  }
}
