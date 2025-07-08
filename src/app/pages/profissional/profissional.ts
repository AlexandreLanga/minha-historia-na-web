import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
}

const EXPERIENCIAS: Experiencia[] = [
  {
    empresa: 'Concert Technologies',
    cargo: 'Analista de Software Júnior',
    periodo: 'jun 2025 - Atual',
    descricao:
      'Atuação com Angular e .NET, com foco em soluções para monitoramento e inspeção de redes elétricas com uso de drones e IA.',
  },
  {
    empresa: 'Vision System',
    cargo: 'Assistente de Apoio a Programação de Sistemas',
    periodo: 'set 2024 - jun 2025',
    descricao:
      'Desenvolvimento com .NET Framework, C#, TypeScript, Angular e PrimeNG. Utilização de PostgreSQL e SQL Server.',
  },
  {
    empresa: 'Infogen Software',
    cargo: 'Programador Trainee / Estagiário',
    periodo: 'fev 2023 - ago 2024',
    descricao:
      'Atuação de 1 ano de estágio e 7 meses como programador, atuando com C#, GeneXus, Oracle, SQL Server, deploy e manutenção de sistemas.',
  },
  {
    empresa: 'Supermercado Popiolski',
    cargo: 'Operador de Caixa / Jovem Aprendiz',
    periodo: 'jan 2019 - mai 2022',
    descricao:
      'Atuação de 1 ano e 5 meses como Jovem Aprendiz, e 1 ano e 4 meses como Operador de Caixa, atuando em serviços operacionais e de atendimento ao cliente.',
  },
];

@Component({
  selector: 'app-profissional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profissional.html',
  styleUrls: ['./profissional.css'],
})
export class Profissional {
  experiencias = EXPERIENCIAS;

  constructor() {}
}
