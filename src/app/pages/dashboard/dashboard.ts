import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  clima: any;
  idadeAtual: number;
  dataNascimento = new Date('2004-10-16');

  constructor(private weatherService: WeatherService) {
    this.idadeAtual = this.calcularIdade(this.dataNascimento);
  }

  ngOnInit(): void {
    this.weatherService.getWeather('Chapecó').subscribe((res) => {
      this.clima = res;
    });
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNascimento = dataNascimento.getMonth();
    const diaNascimento = dataNascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  }
}
