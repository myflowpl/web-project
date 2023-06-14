import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListNoUserPage } from './song-list-no-user.page';

describe('SongListNoUserPage', () => {
  let component: SongListNoUserPage;
  let fixture: ComponentFixture<SongListNoUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongListNoUserPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongListNoUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
