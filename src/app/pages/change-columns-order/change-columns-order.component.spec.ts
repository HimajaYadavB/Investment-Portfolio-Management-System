import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeColumnsOrderComponent } from './change-columns-order.component';

describe('ChangeColumnsOrderComponent', () => {
  let component: ChangeColumnsOrderComponent;
  let fixture: ComponentFixture<ChangeColumnsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeColumnsOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeColumnsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
