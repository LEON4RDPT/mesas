import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadoresComponent } from './utilizadores.component';

describe('UtilizadoresComponent', () => {
  let component: UtilizadoresComponent;
  let fixture: ComponentFixture<UtilizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilizadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
