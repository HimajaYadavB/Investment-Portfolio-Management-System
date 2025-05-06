import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDividendsComponent } from './admin-add-dividends.component';

describe('AdminAddDividendsComponent', () => {
  let component: AdminAddDividendsComponent;
  let fixture: ComponentFixture<AdminAddDividendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddDividendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddDividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
