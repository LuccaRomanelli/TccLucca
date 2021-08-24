import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseiraFormComponent } from './pulseira-form.component';

describe('PulseiraFormComponent', () => {
  let component: PulseiraFormComponent;
  let fixture: ComponentFixture<PulseiraFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulseiraFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseiraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
