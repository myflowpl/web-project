import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSectionComponent } from './cat-section.component';

describe('CatSectionComponent', () => {
  let component: CatSectionComponent;
  let fixture: ComponentFixture<CatSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
