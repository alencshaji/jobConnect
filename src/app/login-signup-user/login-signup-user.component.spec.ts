import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupUserComponent } from './login-signup-user.component';

describe('LoginSignupUserComponent', () => {
  let component: LoginSignupUserComponent;
  let fixture: ComponentFixture<LoginSignupUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupUserComponent]
    });
    fixture = TestBed.createComponent(LoginSignupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
