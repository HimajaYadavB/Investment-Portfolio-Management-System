import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerApprovalComponent } from './broker-approval.component';

describe('BrokerApprovalComponent', () => {
  let component: BrokerApprovalComponent;
  let fixture: ComponentFixture<BrokerApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
