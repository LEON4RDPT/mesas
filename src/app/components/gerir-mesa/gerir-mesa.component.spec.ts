import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirMesaComponent } from './gerir-mesa.component';

describe('GerirMesaComponent', () => {
  let component: GerirMesaComponent;
  let fixture: ComponentFixture<GerirMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerirMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerirMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
