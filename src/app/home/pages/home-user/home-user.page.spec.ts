import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetApi } from 'api-client';
import { of } from 'rxjs';
import { symbolName } from 'typescript';

import { HomeUserPage } from './home-user.page';

fdescribe('HomeUserPage', () => {
  let component: HomeUserPage;
  let fixture: ComponentFixture<HomeUserPage>;
  let api: PetApi;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUserPage],
      providers: [
        {
          provide: HttpClient,
          useValue: {},
        }
      ],
    }).compileComponents();

    // mock
    api = TestBed.inject(PetApi);

    const pets$ = of([
      {id: 1, name: 'fluffy'},
    ]);

    spyOn(api, 'findPetsByStatus').and.returnValue(pets$ as any);

    // create component
    fixture = TestBed.createComponent(HomeUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(api.findPetsByStatus).toHaveBeenCalledTimes(1)
    const text = fixture.nativeElement.querySelector('pre').textContent;
    expect(text).toContain('fluffy')
  });
});
