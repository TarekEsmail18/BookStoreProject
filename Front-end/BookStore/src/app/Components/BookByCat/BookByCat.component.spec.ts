/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookByCatComponent } from './BookByCat.component';

describe('BookByCatComponent', () => {
  let component: BookByCatComponent;
  let fixture: ComponentFixture<BookByCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookByCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
