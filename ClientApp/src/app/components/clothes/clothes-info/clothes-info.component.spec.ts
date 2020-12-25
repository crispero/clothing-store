import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesInfoComponent } from './clothes-info.component';

describe('ClothesInfoComponent', () => {
  let component: ClothesInfoComponent;
  let fixture: ComponentFixture<ClothesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
