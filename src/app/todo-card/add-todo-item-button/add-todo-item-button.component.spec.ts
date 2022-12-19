import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoItemButtonComponent } from './add-todo-item-button.component';

describe('AddTodoItemButtonComponent', () => {
  let component: AddTodoItemButtonComponent;
  let fixture: ComponentFixture<AddTodoItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTodoItemButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodoItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
