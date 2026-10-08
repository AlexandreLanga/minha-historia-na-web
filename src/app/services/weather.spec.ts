import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WeatherData, WeatherService } from './weather';

describe('Weather', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads Chapecó weather from API Utilidades', () => {
    let weather: WeatherData | undefined;

    service.getWeather().subscribe((result) => {
      weather = result;
    });

    const request = httpTestingController.expectOne(
      'https://api-utilidades.onrender.com/api/v1/clima/Chapecó'
    );
    expect(request.request.method).toBe('GET');

    request.flush({
      temperatura: 18,
      cidade: 'Chapecó',
      pais: 'BR',
      fusoHorario: -10800,
    });

    expect(weather).toEqual(
      jasmine.objectContaining({
        temperature: 18,
        city: 'Chapecó',
        country: 'BR',
        timezone: -10800,
      })
    );
  });
});
