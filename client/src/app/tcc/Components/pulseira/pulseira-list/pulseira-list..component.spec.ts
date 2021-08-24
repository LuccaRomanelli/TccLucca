import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseiraListComponent } from './pulseira-list.component';

describe('PulseiraListComponent', () => {
  let component: PulseiraListComponent;
  let fixture: ComponentFixture<PulseiraListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulseiraListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseiraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
