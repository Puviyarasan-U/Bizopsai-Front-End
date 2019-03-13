import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NodeService } from '../../services/Nodeservice';
import { HomeNodeService } from "../../services/HomeNodeService";
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  user_name: any;
  user_id: any;
  isUser = false;
  Data: any;
  isData = false;
  userAdmin: any;
  dataroom_requests: any;
  adminNotifications: any = [];
  buyerNotifications: any = [];
  isBuyer: boolean = false;
  sellerNotifications: any = [];
  isSeller: boolean = false;
  professionalNotifications: any = [];
  isProfessional: boolean = false;
  allBuyers: any = [];
  allProfessionals: any = [];
  allSellers: any = [];
  constructor(private user: NodeService, public router: Router, private route: ActivatedRoute,
    private home: HomeNodeService, private admin: AdminService) { }

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem('Bizops_User')) {
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        // this.isUser = true;
      }
    }
    this.admin.getNotification().subscribe(data => {
      var rows = data;
      if (rows[0].ADMIN_FLAG == 1) {
        this.userAdmin = 'Admin';
      }
      this.home.getUserRequests(this.user_id).subscribe(
        userRequests => {
          var res = userRequests;
          if (res[0].status == 'No Data Found') {
          } else {
            this.Data = res;
            this.isData = true;

          }
          this.home.getDataRoomRequest(this.user_id).subscribe(
            data => {
              var res = data;
              if (res[0].status == 'No Data Found') {
              } else {
                this.dataroom_requests = res;
                this.isData = true;
              }
              this.admin.getAllBuyers().subscribe(data => {
                this.allBuyers = data;
                this.admin.getAllProfessionals().subscribe(data => {
                  this.allProfessionals = data;
                  this.admin.getAllBusiness().subscribe(data => {
                    this.allSellers = data;
                    this.admin.getBuyerNotification().subscribe(data => {
                      this.buyerNotifications = data;
                      this.admin.getSellerNotification().subscribe(data => {
                        this.sellerNotifications = data;
                        this.admin.getProfessionalNotification().subscribe(data => {
                          this.professionalNotifications = data;
                          for (var i = 0; i < this.allBuyers.length; i++) {
                            if (this.allBuyers[i].USER_ID == this.user_id && this.user_name.toLowerCase()!='admin') {
                              this.isBuyer = true;                             
                            }
                          }
                          for (var i = 0; i < this.allSellers.length; i++) {
                            if (this.allSellers[i].USER_ID == this.user_id && this.user_name.toLowerCase()!='admin') {
                              this.isSeller = true;                             
                            }
                          }
                          for (var i = 0; i < this.allProfessionals.length; i++) {
                            if (this.allProfessionals[i].USER_ID == this.user_id) {
                              this.isProfessional = true;                           
                            }
                          }
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
    });
  }

  moreDetail(value) {

    // this.

  }

  acceptRequest(value) {
    var post = {
      tran_id: value
    }

    this.home.acceptRequest(post).subscribe(
      data => {
        var Data = data;
        alert('Accepted !!!');
        if (Data) {
          this.router.navigate(['/home/buy']);
          this.ngOnInit();
        }

      },
      err => {
        console.log(err);
        alert('Servor Error');
      });

  }

  acceptDataroom(value) {
    var post = {
      TranId: value
    }

    this.home.acceptDataroom(post).subscribe(
      data => {
        var res = data;
        alert('Accepted !!!');
        this.ngOnInit();
      });

  }

}
