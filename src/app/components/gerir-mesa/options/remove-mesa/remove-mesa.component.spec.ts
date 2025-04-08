import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMesaComponent } from './remove-mesa.component';

describe('RemoveMesaComponent', () => {
  let component: RemoveMesaComponent;
  let fixture: ComponentFixture<RemoveMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
