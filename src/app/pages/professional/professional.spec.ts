import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Professional } from './professional';

describe('Professional', () => {
  let component: Professional;
  let fixture: ComponentFixture<Professional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Professional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Professional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
