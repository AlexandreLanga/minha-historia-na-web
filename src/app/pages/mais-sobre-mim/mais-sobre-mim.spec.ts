import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisSobreMim } from './mais-sobre-mim';

describe('MaisSobreMim', () => {
  let component: MaisSobreMim;
  let fixture: ComponentFixture<MaisSobreMim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisSobreMim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisSobreMim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
