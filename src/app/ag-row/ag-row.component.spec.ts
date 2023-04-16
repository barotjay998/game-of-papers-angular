import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgRowComponent } from './ag-row.component';

describe('AgRowComponent', () => {
  let component: AgRowComponent;
  let fixture: ComponentFixture<AgRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
