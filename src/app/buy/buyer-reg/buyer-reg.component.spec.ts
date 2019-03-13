import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRegComponent } from './buyer-reg.component';

describe('BuyerRegComponent', () => {
  let component: BuyerRegComponent;
  let fixture: ComponentFixture<BuyerRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
