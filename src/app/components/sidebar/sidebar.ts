import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private translate: TranslateService) {}

  get currentLang(): string {
    return (this.translate && (this.translate.currentLang || (this.translate.getDefaultLang && this.translate.getDefaultLang()))) || 'en';
  }

  switchLang(lang: string) {
    if (this.currentLang === lang) {
      return; // already selected
    }

    this.translate.use(lang);
  }
}
