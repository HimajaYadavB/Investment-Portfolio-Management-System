import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDivComponent } from './asset-div.component';

describe('AssetDivComponent', () => {
  let component: AssetDivComponent;
  let fixture: ComponentFixture<AssetDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
