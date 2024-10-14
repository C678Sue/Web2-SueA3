import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCardComponent } from './f-card.component';

describe('FCardComponent', () => {
  let component: FCardComponent;
  let fixture: ComponentFixture<FCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
