import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBizAdminsComponent } from './manage-biz-admins.component';

describe('ManageBizAdminsComponent', () => {
  let component: ManageBizAdminsComponent;
  let fixture: ComponentFixture<ManageBizAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBizAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBizAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
