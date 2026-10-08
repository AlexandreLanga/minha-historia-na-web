import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherData, WeatherService } from '../../services/weather';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let weatherResponse: Subject<WeatherData>;

  beforeEach(async () => {
    weatherResponse = new Subject<WeatherData>();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        provideZonelessChangeDetection(),
        {
          provide: WeatherService,
          useValue: { getWeather: () => weatherResponse.asObservable() },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a spinner until the weather data is loaded', () => {
    expect(
      fixture.nativeElement.querySelector('.weather-loading')
    ).not.toBeNull();

    weatherResponse.next({
      temperature: 18,
      city: 'Chapecó',
      country: 'BR',
      timezone: -10800,
      localTime: '12:00:00',
    });
    weatherResponse.complete();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.weather-loading')
    ).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Chapecó');
  });
});
