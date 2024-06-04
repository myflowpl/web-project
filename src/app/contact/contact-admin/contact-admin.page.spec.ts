import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdminPage } from './contact-admin.page';

describe('ContactAdminPage', () => {
  let component: ContactAdminPage;
  let fixture: ComponentFixture<ContactAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactAdminPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
