import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseiraComponent } from './pulseira.component';

describe('PulseiraComponent', () => {
  let component: PulseiraComponent;
  let fixture: ComponentFixture<PulseiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulseiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
