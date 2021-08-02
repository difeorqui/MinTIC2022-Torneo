import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPartidosComponent } from './registrar-partidos.component';

describe('RegistrarPartidosComponent', () => {
  let component: RegistrarPartidosComponent;
  let fixture: ComponentFixture<RegistrarPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPartidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
