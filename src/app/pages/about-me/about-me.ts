import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SafeUrlPipe } from '../../safe-url.pipe';
export interface ShowVideo {
  id: number;
  tittle: string;
  place: string;
  year: number;
  plataform: 'youtube' | 'vimeo' | 'local';
  url: string;
  description?: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule, SafeUrlPipe],
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

  videos: ShowVideo[] = [
    {
      id: 1,
      tittle: 'We go one more',
      place: 'Allianz Parque - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/ouad00k969U',
      description: 'I mean, wtf is going on?'
    },
    {
      id: 2,
      tittle: 'THOOOONE',
      place: 'Allianz Parque - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/fLBD_NvZoLg',
      description: 'A great end, for their biggest show'
    },
    {
      id: 3,
      tittle: 'GETTING INTO SP',
      place: 'São Paulo - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/pi3B62kq5w0',
      description: 'Airplane landing in São Paulo city'
    },
    {
      id: 4,
      tittle: 'CHOOSING ANTIVIST',
      place: 'São Paulo - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/rPucOxio7iE',
      description: 'Oliver pulled MCLan and DiFerrero to sing ANTIVIST, they tried'
    },
    {
      id: 5,
      tittle: 'SENTA',
      place: 'Allianz Parque - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/Yp8w3J4P0_0',
      description: 'We burned a lot in the end, literally'
    },
    {
      id: 6,
      tittle: 'MANTRA',
      place: 'Allianz Parque - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/TkYCCWZ7zV0',
      description: 'One of my favorites (all are)'
    },
    {
      id: 7,
      tittle: 'TODO MUNDO PULA',
      place: 'Allianz Parque - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/C3kVAGqqkTU',
      description: 'The vibe of this moment is unforgetable'
    },
    {
      id: 8,
      tittle: 'DARK TRINITY',
      place: 'Allianz Parque - SP',
      year: 2024,
      plataform: 'youtube',
      url: 'https://www.youtube.com/embed/C3kVAGqqkTU',
      description: 'MCLan, DiFerrero and Oliver dicided to sing together'
    },
  ];

  showDescription(desc: string) {
    this.description = desc;
  }
}