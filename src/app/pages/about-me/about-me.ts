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

  description: string = 'ABOUT_ME.DEFAULT_DESCRIPTION';

  cards = [
    {
      nome: 'ABOUT_ME.CARACTERS.0.NAME',
      img: 'ABOUT_ME.CARACTERS.0.IMG',
      desc: 'ABOUT_ME.CARACTERS.0.DESC'
    },
    {
      nome: 'ABOUT_ME.CARACTERS.1.NAME',
      img: 'ABOUT_ME.CARACTERS.1.IMG',
      desc: 'ABOUT_ME.CARACTERS.1.DESC'
    },
    {
      nome: 'ABOUT_ME.CARACTERS.2.NAME',
      img: 'ABOUT_ME.CARACTERS.2.IMG',
      desc: 'ABOUT_ME.CARACTERS.2.DESC'
    },
    {
      nome: 'ABOUT_ME.CARACTERS.3.NAME',
      img: 'ABOUT_ME.CARACTERS.3.IMG',
      desc: 'ABOUT_ME.CARACTERS.3.DESC'
    }
  ];

  phrases = [
    {
      title: "ABOUT_ME.PHRASES.0.TITLE",
      img: "ABOUT_ME.PHRASES.0.IMG",
      alt: "ABOUT_ME.PHRASES.0.ALT",
      phrase: "ABOUT_ME.PHRASES.0.PHRASE",
      author: "ABOUT_ME.PHRASES.0.AUTHOR"
    },
    {
      title: "ABOUT_ME.PHRASES.1.TITLE",
      img: "ABOUT_ME.PHRASES.1.IMG",
      alt: "ABOUT_ME.PHRASES.1.ALT",
      phrase: "ABOUT_ME.PHRASES.1.PHRASE",
      author: "ABOUT_ME.PHRASES.1.AUTHOR"
    },
    {
      title: "ABOUT_ME.PHRASES.2.TITLE",
      img: "ABOUT_ME.PHRASES.2.IMG",
      alt: "ABOUT_ME.PHRASES.2.ALT",
      phrase: "ABOUT_ME.PHRASES.2.PHRASE",
      author: "ABOUT_ME.PHRASES.2.AUTHOR"
    },
    {
      title: "ABOUT_ME.PHRASES.3.TITLE",
      img: "ABOUT_ME.PHRASES.3.IMG",
      alt: "ABOUT_ME.PHRASES.3.ALT",
      phrase: "ABOUT_ME.PHRASES.3.PHRASE",
      author: "ABOUT_ME.PHRASES.3.AUTHOR"
    },
    {
      title: "ABOUT_ME.PHRASES.4.TITLE",
      img: "ABOUT_ME.PHRASES.4.IMG",
      alt: "ABOUT_ME.PHRASES.4.ALT",
      phrase: "ABOUT_ME.PHRASES.4.PHRASE",
      author: "ABOUT_ME.PHRASES.4.AUTHOR"
    }
  ];

  showDescription(desc: string) {
    this.description = desc;
  }
}
