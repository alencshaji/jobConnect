import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewApplicantsComponent } from './company-view-applicants.component';

describe('CompanyViewApplicantsComponent', () => {
  let component: CompanyViewApplicantsComponent;
  let fixture: ComponentFixture<CompanyViewApplicantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyViewApplicantsComponent]
    });
    fixture = TestBed.createComponent(CompanyViewApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
