import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
export interface WeatherData {
  temperature: number;
  city: string;
  country: string;
  timezone: number;
  localTime: string;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '1bf1bc485352caaa00c1d201a8826fb6';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric&lang=pt_br`;

    return this.http.get<any>(url).pipe(
      map((data) => ({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        timezone: data.timezone,
        localTime: new Date(Date.now() + data.timezone * 1000).toLocaleTimeString('pt-BR'),
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API requisition error:', error);
    return throwError(
      () =>
        new Error(
          'Error while searching weather data. Reload the page or try again later'
        )
    );
  }
}