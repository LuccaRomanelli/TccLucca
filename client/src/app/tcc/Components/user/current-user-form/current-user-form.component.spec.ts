import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserFormComponent } from './current-user-form.component';

describe('CurrentUserFormComponent', () => {
  let component: CurrentUserFormComponent;
  let fixture: ComponentFixture<CurrentUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
