import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatSectionComponent } from './bat-section.component';

describe('BatSectionComponent', () => {
  let component: BatSectionComponent;
  let fixture: ComponentFixture<BatSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
