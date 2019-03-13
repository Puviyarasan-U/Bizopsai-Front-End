import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../services/Nodeservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.scss']
})
export class SavedListComponent implements OnInit {
p:any;
  Data: any;
  list: any;
  user_name: any;
  user_id: any;
  isList = true;

  constructor( private user: NodeService,public router: Router,) {  }

  ngOnInit() {

    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }        
    }

    this.user.getSavedList(this.user_id).subscribe(
      data => {
      
            this.Data = data;
            let rows = this.Data;
            if (rows.length > 0) {
              if (rows[0].status) {
                    this.isList = false;
                 } else {
                  this.list = rows;
                }
             } else {
                 alert('No Data');
             }
       },
      error => {
          alert('Server Error');
       });
  }
  
  detail(value) {
    this.router.navigate(['/home/detail'], { queryParams: { com_id: value } });
  }

  remove(value){
    let detail={
      user_id: this.user_id,
      com_id: value
    }
    this.user.removeSavedList(detail).subscribe(
      data => {
       if(data>0){
        alert('Removed Successfully !!!');
        this.ngOnInit();
        }    
    })

  }

}
