import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtLogoutComponent } from './eidt-logout.component';

describe('EidtLogoutComponent', () => {
  let component: EidtLogoutComponent;
  let fixture: ComponentFixture<EidtLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EidtLogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EidtLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
