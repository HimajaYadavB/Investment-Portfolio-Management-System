import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortDivComponent } from './port-div.component';

describe('PortDivComponent', () => {
  let component: PortDivComponent;
  let fixture: ComponentFixture<PortDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortDivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
