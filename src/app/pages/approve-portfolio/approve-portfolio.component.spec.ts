import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePortfolioComponent } from './approve-portfolio.component';

describe('ApprovePortfolioComponent', () => {
  let component: ApprovePortfolioComponent;
  let fixture: ComponentFixture<ApprovePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovePortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
