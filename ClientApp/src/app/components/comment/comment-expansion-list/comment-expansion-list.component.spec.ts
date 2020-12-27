import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentExpansionListComponent } from './comment-expansion-list.component';

describe('CommentExpansionListComponent', () => {
  let component: CommentExpansionListComponent;
  let fixture: ComponentFixture<CommentExpansionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentExpansionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentExpansionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
