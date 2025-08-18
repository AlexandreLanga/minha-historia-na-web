import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  wheather: any;
  actualAge: number;
  bornDate = new Date('2004-10-16');

  constructor(
    private weatherService: WeatherService,
    private translate: TranslateService
  ) {
    this.actualAge = this.calculateAge(this.bornDate);
  }

  ngOnInit(): void {
    this.weatherService.getWeather('Chapecó').subscribe((res) => {
      this.wheather = res;
    });
  }

  calculateAge(bornDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - bornDate.getFullYear();
    const actualMonth = today.getMonth();
    const actualDay = today.getDate();
    const bornMonth = bornDate.getMonth();
    const bornDay = bornDate.getDate();

    if (actualMonth < bornMonth || (actualMonth === bornMonth && actualDay < bornDay)) age--;

    return age;
  }
}
