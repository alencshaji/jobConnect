import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreListComponent } from './more-list.component';

describe('MoreListComponent', () => {
  let component: MoreListComponent;
  let fixture: ComponentFixture<MoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreListComponent]
    });
    fixture = TestBed.createComponent(MoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
