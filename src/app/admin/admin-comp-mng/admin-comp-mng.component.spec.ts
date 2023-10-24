import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompMngComponent } from './admin-comp-mng.component';

describe('AdminCompMngComponent', () => {
  let component: AdminCompMngComponent;
  let fixture: ComponentFixture<AdminCompMngComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCompMngComponent]
    });
    fixture = TestBed.createComponent(AdminCompMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
