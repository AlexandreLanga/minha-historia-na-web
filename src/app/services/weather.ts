import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators';

const API_STARTUP_TIMEOUT_MS = 120_000;
const TRANSIENT_RETRY_DELAY_MS = 3_000;

export interface WeatherData {
  temperature: number;
  city: string;
  country: string;
  timezone: number;
  localTime: string;
}

interface WeatherApiResponse {
  temperature?: number;
  temperatura?: number;
  temperaturaAtual?: number;
  temp?: number;
  main?: { temp?: number };
  city?: string;
  cidade?: string;
  name?: string;
  country?: string;
  pais?: string;
  sys?: { country?: string };
  timezone?: number;
  fusoHorario?: number;
}

const WEATHER_API_URL = '/api/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    return this.http
      .get<WeatherApiResponse>(WEATHER_API_URL)
      .pipe(
        timeout({ first: API_STARTUP_TIMEOUT_MS }),
        retry({
          count: 2,
          delay: (error, retryCount) => {
            if (
              error instanceof HttpErrorResponse &&
              [0, 502, 503, 504].includes(error.status)
            ) {
              return timer(TRANSIENT_RETRY_DELAY_MS * retryCount);
            }
            return throwError(() => error);
          },
        }),
        map((data) => {
          const temperature =
            data.temperature ??
            data.temperatura ??
            data.temperaturaAtual ??
            data.temp ??
            data.main?.temp;

          if (typeof temperature !== 'number' || !Number.isFinite(temperature)) {
            throw new Error('Weather API response does not include a valid temperature');
          }

          return {
            temperature,
            city: data.city ?? data.cidade ?? data.name ?? 'Chapecó',
            country: data.country ?? data.pais ?? data.sys?.country ?? 'BR',
            timezone: data.timezone ?? data.fusoHorario ?? -10800,
            localTime: new Date().toLocaleTimeString('pt-BR'),
          };
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | Error) {
    console.error('Weather API request error:', error);
    return throwError(
      () =>
        new Error(
          'Error while searching weather data. Reload the page or try again later'
        )
    );
  }
}
