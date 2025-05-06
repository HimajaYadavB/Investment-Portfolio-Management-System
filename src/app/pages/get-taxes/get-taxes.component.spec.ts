import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTaxesComponent } from './get-taxes.component';

describe('GetTaxesComponent', () => {
  let component: GetTaxesComponent;
  let fixture: ComponentFixture<GetTaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTaxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
