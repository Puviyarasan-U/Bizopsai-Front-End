import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LandlordService } from '../../services/landlord.service';

@Component({
  selector: 'app-building-info-form',
  templateUrl: './building-info-form.component.html',
  styleUrls: ['./building-info-form.component.scss']
})
export class BuildingInfoFormComponent implements  OnInit {

  @Input('building') public building: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  buildingInfoForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private landlord:LandlordService) {}
  

  ngOnInit() {
    // this.buildingInfoForm = this.fb.group({
    //   BuildingType: [''],
    //   BuildingSubTypes: [''],
    //   BuildingSize: [''],
    //   builtYear: [''],
    //   restRoom: [''],
    //   buildingZone: [''],
    //   buildingPark: [''],     
    // });
    // // Emit the form group to the father to do whatever it wishes
    // this.formReady.emit(this.buildingInfoForm);
  }

  get f() {
    return this.building.controls;
  }

  saveBuildingInfo(){
    this.submitted = true;

    this.landlord.insertBuildingInfo(this.building.value).subscribe(
      data => {                 
        var res = data;
        if (res > 0) { 
          this.talk.emit('3');
        }
      },
      error => {
        alert("Server Error Please Try After Sometime!!!");
        console.log(error);
      }
    );
  }
    
  

}
