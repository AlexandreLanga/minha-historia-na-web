import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-history',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-history.html',
  styleUrl: './my-history.css',
})
export class MyHistory {
  constructor(private translate: TranslateService) {}
}