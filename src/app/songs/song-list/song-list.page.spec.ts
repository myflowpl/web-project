import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListPage } from './song-list.page';

describe('SongListPage', () => {
  let component: SongListPage;
  let fixture: ComponentFixture<SongListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongListPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
