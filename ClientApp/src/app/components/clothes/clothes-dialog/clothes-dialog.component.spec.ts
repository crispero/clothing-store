import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesDialogComponent } from './clothes-dialog.component';

describe('ClothesDialogComponent', () => {
  let component: ClothesDialogComponent;
  let fixture: ComponentFixture<ClothesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
