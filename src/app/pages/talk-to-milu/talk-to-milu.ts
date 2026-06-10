import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type MiluRequestStatus = 'initial' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-talk-to-milu',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './talk-to-milu.html',
  styleUrl: './talk-to-milu.css',
})
export class TalkToMilu {
  private readonly apiUrl = 'https://miluapi.onrender.com/chat';

  question = '';
  status: MiluRequestStatus = 'initial';
  answer = '';

  readonly miluImages: Record<MiluRequestStatus, string> = {
    initial: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/hello-milu_jqc352.png',
    loading: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/thinking-milu_edcho0.png',
    success: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/happy-milu_cayimk.png',
    error:   'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/sleepy-milu_o1njbg.png',
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  get currentImage(): string {
    return this.miluImages[this.status];
  }

  askMilu(): void {
    const message = this.question.trim();

    if (!message || this.status === 'loading') {
      return;
    }

    this.status = 'loading';
    this.answer = '';

    this.http.post<MiluResponse>(this.apiUrl, { message }).subscribe({
      next: (response) => {
        this.status = 'success';
        this.answer = this.getResponseMessage(response);
        this.cdr.detectChanges();
      },
      error: () => {
        this.status = 'error';
        this.cdr.detectChanges();
      },
    });
  }

  private getResponseMessage(response: MiluResponse): string {
    if (!response) {
      return '';
    }

    if (typeof response === 'string') {
      return response;
    }

    return response.response ?? response.answer ?? response.message ?? '';
  }
}

type MiluResponse =
  | string
  | {
      response?: string;
      answer?: string;
      message?: string;
    };
