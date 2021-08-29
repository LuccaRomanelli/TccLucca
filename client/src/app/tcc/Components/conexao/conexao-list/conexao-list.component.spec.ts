import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexaoListComponent } from './conexao-list.component';

describe('ConexaoListComponent', () => {
  let component: ConexaoListComponent;
  let fixture: ComponentFixture<ConexaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
