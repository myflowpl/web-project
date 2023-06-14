import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditDeactivateDialog } from './song-edit-deactivate.dialog';

describe('SongEditDeactivateDialog', () => {
  let component: SongEditDeactivateDialog;
  let fixture: ComponentFixture<SongEditDeactivateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SongEditDeactivateDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongEditDeactivateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
