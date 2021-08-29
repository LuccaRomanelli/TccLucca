import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexaoFormComponent } from './conexao-form.component';

describe('ConexaoFormComponent', () => {
  let component: ConexaoFormComponent;
  let fixture: ComponentFixture<ConexaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
