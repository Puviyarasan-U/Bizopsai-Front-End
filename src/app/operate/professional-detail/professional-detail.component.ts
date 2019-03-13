import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { HomeNodeService } from '../../services/HomeNodeService';
import { NodeService } from '../../services/Nodeservice';

@Component({
  selector: 'app-professional-detail',
  templateUrl: './professional-detail.component.html',
  styleUrls: ['./professional-detail.component.scss']
})
export class ProfessionalDetailComponent implements OnInit {

  contactProfessional: FormGroup;
  prof_id:any;
  profData: any;
  isDetail = false;


  constructor( private route: ActivatedRoute, public router: Router , private user: NodeService,
               private home: HomeNodeService,private fb: FormBuilder,  ) { }

  ngOnInit() {
    this.contactProfessional = this.fb.group({
      FullName: ['', Validators.required],     
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MessageBox: ['', Validators.required],
      profEmail: [''],
   });

    this.route.queryParams
        .filter(params => params.prof_id)
        .subscribe(params => {
                this.prof_id = params.prof_id;

                this.user.getProfbyId(this.prof_id).subscribe(
                  profDetails => {
                    //   this.blockUI.stop();
                        this.profData = profDetails[0];
                        this.isDetail = true;
                  });
        });
  }

}
