import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaHistoria } from './minha-historia';

describe('MinhaHistoria', () => {
  let component: MinhaHistoria;
  let fixture: ComponentFixture<MinhaHistoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhaHistoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhaHistoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
