import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface WeatherData {
  temperatura: number;
  cidade: string;
  pais: string;
  timezone: number;
  horario: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '1bf1bc485352caaa00c1d201a8826fb6';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${
      this.apiKey
    }&units=metric&lang=pt_br`;

    return this.http.get<any>(url).pipe(
      map((data) => ({
        temperatura: data.main.temp,
        cidade: data.name,
        pais: data.sys.country,
        timezone: data.timezone,
        horario: new Date(Date.now() + data.timezone * 1000).toLocaleTimeString(
          'pt-BR'
        ),
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro na requisição da API:', error);
    return throwError(
      () =>
        new Error(
          'Erro ao buscar dados climáticos. Tente novamente mais tarde.'
        )
    );
  }
}
