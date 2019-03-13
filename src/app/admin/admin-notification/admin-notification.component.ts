import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements OnInit {
  @ViewChild('closeContact') closeContact: ElementRef;
  notificationText: any;
  notificationResponse:any;
  notificationData:any=[];
  currentUserType:any;
  p:any;
  changeUserType:any;
  usersTypes = ['All', 'Buyer', 'Seller', 'Professional'];
  constructor(private admin : AdminService,private router : Router) { }

  ngOnInit() {
    this.admin.getNotification().subscribe(data=>{
      this.notificationData=data;       
    });
  }
  saveNotification() { 
    let detail = {
      notify: this.notificationText,
      user :this.currentUserType
    }
    this.admin.sendNotification(detail).subscribe(data=>{
      this.notificationResponse = data;
      if(this.notificationResponse == 1){
        alert("Send Successfully");
        this.ngOnInit();
        this.closeContact.nativeElement.click();       
      }else{
        alert('No Data');
      }
  });
  }
}
