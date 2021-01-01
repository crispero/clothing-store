import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesFilterDialogComponent } from './clothes-filter-dialog.component';

describe('ClothesFilterDialogComponent', () => {
  let component: ClothesFilterDialogComponent;
  let fixture: ComponentFixture<ClothesFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
