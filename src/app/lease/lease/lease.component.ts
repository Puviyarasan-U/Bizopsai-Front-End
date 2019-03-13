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
import { Router } from "@angular/router";
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
  citySize = ['small', 'medium', 'large'];
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
  stateList: any;
  countyList: any;
  citiesList: any;
  currentState: any;

  constructor(
    public salelist: ListService,
    private user: NodeService,
    public router: Router,
    public home: HomeNodeService
  ) {}

  ngOnInit() {
    this.home.getLeaseList().subscribe(data => {
      //   this.blockUI.stop();
      this.masterProductList = data;
      this.productList = data;
      this.home.getBuildingTypes().subscribe(
        data => {
          this.building_types = data;
          this.home.getStateList().subscribe(
            data => {
              this.stateList = data;
              this.home.getCountyList().subscribe(
                data => {
                  this.countyList = data;

                });
            });
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

  leaseDetail(value) {
    this.router.navigate(["/lease/lease-detail"], {
      queryParams: { biz_id: value }
    });
  }

  userSearch() {}

  changeState($event) {
    let location: any = [];
    const geocoder = new google.maps.Geocoder();
    if ($event == undefined) { this.citiesList = []; } else {
      geocoder.geocode({ 'address': this.currentState }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.lat = (results[0].geometry.location.lat()).toString();
          this.lng = (results[0].geometry.location.lng()).toString();
          this.pos = [this.lat, this.lng];
          location = results;

          this.citiesList = this.countyList.filter((item) => {
            return item.state_code === $event.state_code;
          });
         
        }
      });
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
