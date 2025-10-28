import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe {
  constructor(private translate: TranslateService){}

  description: string = 'Clique em um dos cards para ver a descrição aqui.';

  cards = [
    {
      nome: 'Oliver Scott Sykes',
      img: 'assets/img/oliver-sykes.jpg',
      desc: 'Oliver Sykes é vocalista da banda Bring Me The Horizon, conhecido por sua versatilidade musical e autenticidade. Inspira pela capacidade de se reinventar e usar a arte como expressão de superação.'
    },
    {
      nome: 'Monkey D Luffy',
      img: 'assets/img/monkey-d-luffy.jpg',
      desc: 'Monkey D. Luffy, protagonista de One Piece, é símbolo de coragem, amizade e determinação. Representa a busca pela liberdade e a capacidade de inspirar outros com seu espírito otimista.'
    },
    {
      nome: 'Francisco',
      img: 'assets/img/pope-francis.jpg',
      desc: 'Papa Francisco é admirado pela humildade, empatia e compromisso com causas sociais. Inspira pelo foco em inclusão, solidariedade e humanidade.'
    },
    {
      nome: 'Satoru Gojo',
      img: 'assets/img/satoru-gojo.jpg',
      desc: 'Satoru Gojo, de Jujutsu Kaisen, é considerado o feiticeiro mais poderoso. Representa confiança, senso de humor e a importância de proteger aqueles que se importam conosco.'
    }
  ];

  showDescription(desc: string) {
    this.description = desc;
  }
}
