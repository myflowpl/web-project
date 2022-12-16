import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { User } from '../../api/api.model';
import { HasRoleDirective } from '../../auth/directives/has-role.directive';
import { AuthService } from '../../auth/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: Partial<AuthService>;
  let user$:  BehaviorSubject<User | null>;
  const user: User = {
    id: 1,
    name: 'Piotr',
    email: ''
  }
  beforeEach(async () => {
    // const user$ = jasmine.createSpy().and.returnValue()
    user$ = new BehaviorSubject<User | null>(null);
    authServiceMock = {
      user$,
      logout() { user$.next(null) }
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, HasRoleDirective],
      providers: [
        {
          provide: BASE_URL,
          useValue: 'http://localhost:3000',
        }, {
          provide: AuthService,
          useValue: authServiceMock
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have login button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-cy=login-btn]')?.textContent).toContain('Login');
    expect(compiled.querySelector('[data-cy=logout-btn]')).toBeFalsy();
    expect(compiled.querySelector('[data-cy=contact-btn]')).toBeFalsy();
    expect(compiled.querySelector('[data-cy=artists-btn]')).toBeFalsy();
  });

  it('should logout when logout btn clicked', fakeAsync(() => {

    user$.next(user);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    fixture.debugElement.nativeElement.querySelector('[data-cy=logout-btn]')?.click()
    tick()
    fixture.detectChanges();
    expect(compiled.querySelector('[data-cy=logout-btn]')).toBeFalsy();
    expect(compiled.querySelector('[data-cy=login-btn]')).toBeTruthy();
  }));

  it('should login ', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    user$.next(user);
    fixture.detectChanges();

    expect(compiled.querySelector('[data-cy=user-hello]')?.textContent).toEqual('Hello Piotr');
    expect(compiled.querySelector('[data-cy=login-btn]')).toBeFalsy();
    expect(compiled.querySelector('[data-cy=logout-btn]')).toBeTruthy();

    expect(compiled.querySelector('[data-cy=contact-btn]')).toBeTruthy();
    expect(compiled.querySelector('[data-cy=artists-btn]')).toBeTruthy();
  });
});
