import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditPage } from './song-edit.page';

describe('SongEditPage', () => {
  let component: SongEditPage;
  let fixture: ComponentFixture<SongEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongEditPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
