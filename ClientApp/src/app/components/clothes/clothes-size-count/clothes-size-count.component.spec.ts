import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesSizeCountComponent } from './clothes-size-count.component';

describe('ClothesSizeCountComponent', () => {
  let component: ClothesSizeCountComponent;
  let fixture: ComponentFixture<ClothesSizeCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesSizeCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesSizeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
