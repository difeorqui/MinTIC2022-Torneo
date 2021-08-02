import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPartidosComponent } from './listar-partidos.component';

describe('ListarPartidosComponent', () => {
  let component: ListarPartidosComponent;
  let fixture: ComponentFixture<ListarPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPartidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
