import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgRecRowComponent } from './ag-rec-row.component';

describe('AgRecRowComponent', () => {
  let component: AgRecRowComponent;
  let fixture: ComponentFixture<AgRecRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgRecRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgRecRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
