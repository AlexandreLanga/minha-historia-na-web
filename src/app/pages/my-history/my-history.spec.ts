import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHistory } from './my-history';

describe('MinhaHistoria', () => {
  let component: MyHistory;
  let fixture: ComponentFixture<MyHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
