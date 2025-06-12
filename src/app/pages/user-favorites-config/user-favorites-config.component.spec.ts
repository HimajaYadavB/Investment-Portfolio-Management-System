import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoritesConfigComponent } from './user-favorites-config.component';

describe('UserFavoritesConfigComponent', () => {
  let component: UserFavoritesConfigComponent;
  let fixture: ComponentFixture<UserFavoritesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFavoritesConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFavoritesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
