import { Component, OnInit, ViewChild, ElementRef, Input, Directive, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { NodeService } from '../services/Nodeservice';
import { HomeNodeService } from '../services/HomeNodeService';

declare const google: any;

@Component({
  selector: 'app-home',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbPaginationConfig]
})
export class HomeComponent implements OnInit {

  p:any;

  public pieChartLabels: string[] = [ 'Alaska','Albama','Arizona','Colorado','California','Indiana'];
  public pieChartData: number[] = [45, 50, 20, 15, 36, 18];
  public pieChartType = 'pie';

  public polarAreaChartLabels: string[] = [ 'Alaska','Albama','Arizona','Colorado','California','Indiana'];
  public polarAreaChartData: number[] = [195064, 155054, 90067, 115064, 205089, 85044];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  @ViewChild('myDrop') myDrop: ElementRef;
  masterProductList: any = [];
  marked = false;
  theCheckbox = false;
  isUser = false;
  userName: string;
  id: any;
  list: any = [];
  sta1: any = [];
  sta: any = [];
  location: string;
  lat = '41.850033';
  lng = '-87.6500523';
  pos: any = [this.lat, this.lng];
  distance: any;
  showDropDown = false;
  stateList: any = [];
  countyList: any = [];
  citiesList: any = [];
  currentState: string;
  currentCategory: string;
  currentsubCategory: string;
  currentChild: string;
  currentcounty: string;
  countyclick = false;
  minPrice: string;
  maxPrice: string;
  minCashflow: string;
  maxCashflow: string;
  minRevenue: string;
  maxRevenue: string;
  Data: any;
  baseCategoryList: any = [];
  childCategoryList: any = [];
  subchildCategoryList: any = [];
  productList: any = [];
  autoClose = false;
  public isCollapsed = true;
  subcategoryList: any;
  subChildList: any;
  zipcode: string;
  productData: any;
  productImage: any;
  productTitle: any;
  productDesc: any;
  productPrice: any;
  productPlace: any;
  enableMapview = false;
  user_request: any;
  minList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000];
  maxList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000];
  citySize = ['small', 'medium', 'large'];
  selectedCitySize: string;
  showSubcat = false;
  topCategory: any = [];
  topSubCategory: any = [];
  showVar: any = [];
  isActiveMain = false;
  isCategory = false;
  selectedCategory: any = [];
  categoryFilteredList: any = [];
  isfiltered = false;
  searchCategory: string;
  page = 4;
  dataTableView = false;

  constructor(public salelist: ListService, private user: NodeService,
    public router: Router, public home: HomeNodeService, config: NgbPaginationConfig) {
    config.size = 'sm';
    config.boundaryLinks = true;
    //  var userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
    //  if(userdata){
    //     this.userName = userdata.USER_FIRSTNAME;
    //     this.isUser = true;
    //   }
  }


  ngOnInit() {
    this.list = [];
    this.home.getProductList().subscribe(
      data => {
        //   this.blockUI.stop();
        this.masterProductList = data;
        this.productList = data;
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

                          });
                      });
                  });
              });
          });
      },
      error => {
        alert('Server Error');
      });
  }

  marker = {
    display: true,
    lat: null,
    lng: null,
  };

  search_Mapview() {
    this.enableMapview = true;
    this.dataTableView = false;

  }

  search_Datatable() {
    this.enableMapview = false;
    this.dataTableView = true;
    this.clearFilter();

  }
  search_Streetview() {
    this.enableMapview = false;
    this.dataTableView = false;
    this.clearFilter();
  }

  userSearch() {
    this.clearFilter();
    const string = this.user_request;
    const x = string.split(' ');
    console.log(x);
    const searchState = this.stateList.filter(item => x.find(f => f == item.state.toLowerCase()));
    const searchCategory = this.baseCategoryList.filter(item => x.some(f => {
      if (f.length >= 4) { return item.cname.toLowerCase().indexOf(f.toLowerCase()) !== -1 }
    })
    );
    console.log(searchState);
    if (searchState.length > 0) { const state = searchState[0].state; this.currentState = state; }
    if (searchCategory.length > 0) { const category = searchCategory[0].cname; this.searchCategory = category; }
    this.filter();
  }

  clicked({ target: marker }, id) {
    this.productData = this.productList.filter((item) => {
      return item.COMPANY_ID == id;
    });
    this.productImage = this.productData[0].IMG_NAME;
    this.productTitle = this.productData[0].TITLE;
    this.productDesc = this.productData[0].LONG_DESC;
    this.productPrice = this.productData[0].PRICE;
    this.productPlace = this.productData[0].STATE;
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  toggleVisibility() {
    this.theCheckbox = !this.theCheckbox;
    //this.marked= e.target.checked;
    this.filter();
    console.log(this.marked);
  }

  detail(value) {
    this.router.navigate(['/home/detail'], { queryParams: { com_id: value } });
  }

  changeState($event) {
    let location: any = [];

    const geocoder = new google.maps.Geocoder();
    if ($event == undefined) { this.citiesList = []; this.filter(); } else {
      geocoder.geocode({ 'address': this.currentState }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.lat = (results[0].geometry.location.lat()).toString();
          this.lng = (results[0].geometry.location.lng()).toString();
          this.pos = [this.lat, this.lng];
          location = results;

          this.citiesList = this.countyList.filter((item) => {
            return item.state_code === $event.state_code;
          });
          this.filter();
        }
      });
    }
  }

  label() {
    this.topCategory = [];
    this.isActiveMain = false;
    const popularList = this.baseCategoryList.filter((item) => {
      return item.popular === 1;
    });

    for (let i = 0; i < popularList.length; i++) {
      const id = popularList[i].cid;
      const mainCategory = popularList[i].cname;
      const subList = this.childCategoryList.filter((item) => {
        return item.cid === id;
      });
      if (subList.length) {
        for (let j = 0; j < subList.length; j++) {
          const subname = subList[j].scname;
          const list = {
            cname: mainCategory,
            scname: subname
          }
          this.topCategory.push(list);
        }
      }
    }
    console.log(this.topCategory);
  }

  labelTwo(value) {
    this.isCategory = !this.isCategory;
    const list = {
      name: value
    };
    const checkValid = this.showVar.filter((item) => { return item.name === value; });
    if (checkValid.length == 0) { this.showVar.push(list); } else { this.showVar = this.showVar.filter((item) => { return item.name != value; }); }
    //if(this.isCategory){
    this.isActiveMain = !this.isActiveMain;
  }

  changeCategory() {
    this.categoryFilteredList = [];
    const x = this.selectedCategory;
    // if(x.length>0){this.isfiltered=true;}
    const categorylist = this.baseCategoryList.filter(item => x.find(f => f.toLowerCase() == item.cname.toLowerCase()));
    const subcategorylist = this.childCategoryList.filter(item => x.find(f => f.toLowerCase() == item.scname.toLowerCase()));

    console.log(categorylist);
    if (categorylist.length > 0) {

      for (let i = 0; i < categorylist.length; i++) {
        const category = categorylist[i].cname;
        const filteredCategory = this.masterProductList.filter((item) => {
          return item.CATEGORY.toLowerCase() === category.toLowerCase();
        });
        if (filteredCategory.length > 0) {
          filteredCategory.forEach(obj => {
            this.categoryFilteredList.push(obj);
          })
        }
      }
    }
    if (subcategorylist.length > 0) {
      for (let i = 0; i < subcategorylist.length; i++) {
        const subcategory = subcategorylist[i].scname;
        const productList = this.masterProductList.filter((item) => {
          return item.SUBCATEGORY.toLowerCase() === subcategory.toLowerCase();
        });
        if (productList.length > 0) {
          productList.forEach(obj => {
            this.categoryFilteredList.push(obj);
          })
        }
      }
      console.log(this.categoryFilteredList);
    }
    if (x.length > 0) {
      this.productList = this.categoryFilteredList;
      this.isfiltered = true;
    } else { this.isfiltered = false; }
    // if(searchCategory.length>0){ var category = searchCategory[0].cname; this.currentCategory=category; }
    this.filter();
  }

  onZipcodeChange(value) {
    this.zipcode = value;
    if (value.length == 5) {
      this.filter();
    }
  }

  openFilter() {
    this.showDropDown = !this.showDropDown;
    if (!this.showDropDown) {
      this.clearFilter();
    }
  }

  checkbutton(value) {
    console.log(value)
  }


  filter() {
    if (this.isfiltered) {
      this.productList = this.categoryFilteredList;
    } else { this.productList = this.masterProductList; }

    if (this.searchCategory != undefined && this.searchCategory != null) {
      this.productList = this.productList.filter((item) => {
        return item.CATEGORY === this.searchCategory;
      });
    }

    if (this.currentState != undefined && this.currentState != null) {
      this.productList = this.productList.filter((item) => {
        return item.STATE === this.currentState;
      });
      if (this.currentcounty != undefined && this.currentcounty != null) {
        this.productList = this.productList.filter((item) => {
          return item.COUNTY === this.currentcounty;
        });
      }
    }
    if (this.minPrice != undefined && this.minPrice != null) {
      this.productList = this.productList.filter((item) => {
        return item.PRICE >= this.minPrice;
      });
    }
    if (this.minRevenue != undefined && this.minRevenue != null) {
      this.productList = this.productList.filter((item) => {
        return item.REVENUE >= this.minRevenue;
      });
    }
    if (this.minCashflow != undefined && this.minCashflow != null) {
      this.productList = this.productList.filter((item) => {
        return item.CASH_FLOW >= this.minCashflow;
      });
    }
    if (this.maxPrice != undefined && this.maxPrice != null) {
      this.productList = this.productList.filter((item) => {
        return item.PRICE <= this.maxPrice;
      });
    }
    if (this.maxRevenue != undefined && this.maxRevenue != null) {
      this.productList = this.productList.filter((item) => {
        return item.REVENUE <= this.maxRevenue;
      });
    }
    if (this.maxCashflow != undefined && this.maxCashflow != null) {
      this.productList = this.productList.filter((item) => {
        return item.CASH_FLOW <= this.maxCashflow;
      });
    }

    // if(this.zipcode.length == 5){
    //   var zipCodeList=this.productList.filter((item) =>{
    //     return item.ZIPCODE == this.zipcode;
    //   });
    //   if(zipCodeList.length>0){
    //     var state=zipCodeList[0].COUNTY;
    //     this.productList=this.productList.filter((item) =>{
    //       return item.COUNTY === state;
    //    });
    //   }
    //   else{
    //     this.productList=[];
    //   }
    // };
  }

  clearFilter() {
    this.searchCategory = undefined;
    this.currentCategory = undefined;
    this.currentsubCategory = undefined;
    this.currentChild = undefined;
    this.currentState = undefined;
    this.currentcounty = undefined;
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.minRevenue = undefined;
    this.maxRevenue = undefined;
    this.minCashflow = undefined;
    this.maxCashflow = undefined;
    this.theCheckbox = false;
    this.isfiltered = false;
    this.zipcode = '';
    this.lat = '41.850033';
    this.lng = '-87.6500523';
    this.pos = [this.lat, this.lng];
    // this.toggleVisibility();
    this.productList = this.masterProductList;
  }
}
