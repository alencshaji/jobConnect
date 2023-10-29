import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedJobComponent } from './saved-job.component';

describe('SavedJobComponent', () => {
  let component: SavedJobComponent;
  let fixture: ComponentFixture<SavedJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedJobComponent]
    });
    fixture = TestBed.createComponent(SavedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
