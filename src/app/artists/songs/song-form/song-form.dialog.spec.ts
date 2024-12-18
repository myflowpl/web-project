import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongFormDialog } from './song-form.dialog';

describe('SongFormDialog', () => {
  let component: SongFormDialog;
  let fixture: ComponentFixture<SongFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
