import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupCompComponent } from './login-signup-comp.component';

describe('LoginSignupCompComponent', () => {
  let component: LoginSignupCompComponent;
  let fixture: ComponentFixture<LoginSignupCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupCompComponent]
    });
    fixture = TestBed.createComponent(LoginSignupCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
