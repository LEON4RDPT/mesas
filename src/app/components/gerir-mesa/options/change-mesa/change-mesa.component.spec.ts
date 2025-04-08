import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMesaComponent } from './change-mesa.component';

describe('ChangeMesaComponent', () => {
  let component: ChangeMesaComponent;
  let fixture: ComponentFixture<ChangeMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
