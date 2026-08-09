import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type MiluRequestStatus = 'initial' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-talk-to-milu',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './talk-to-milu.html',
  styleUrl: './talk-to-milu.css',
})
export class TalkToMilu implements OnInit, OnDestroy {
  private readonly apiUrl = 'https://miluapi.onrender.com/chat';
  private readonly socketUrl = 'wss://miluapi.onrender.com/chat';
  private socket?: WebSocket;
  private socketReconnectTimer?: ReturnType<typeof setTimeout>;

  question = '';
  status: MiluRequestStatus = 'initial';
  answer = '';
  modalOpen = false;
  socketConnected = false;
  socketError = false;
  readonly MAX_CHARS = 1000;
  private streamBuffer = '';
  private streamTimer?: ReturnType<typeof setTimeout>;
  private streamCompleted = false;

  readonly miluImages: Record<MiluRequestStatus, string> = {
    initial: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/hello-milu_jqc352.png',
    loading: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/thinking-milu_edcho0.png',
    success: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/happy-milu_cayimk.png',
    error:   'https://res.cloudinary.com/diizw3dqm/image/upload/v1781131087/sleepy-milu_o1njbg.png',
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private translate: TranslateService) {}

  get currentImage(): string {
    return this.miluImages[this.status];
  }

  ngOnInit(): void {
    this.initializeSocket();
  }

  ngOnDestroy(): void {
    this.closeSocket();
  }

  openInstructions(): void {
    this.modalOpen = true;
  }

  closeInstructions(): void {
    this.modalOpen = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: any) {
    if (this.modalOpen) {
      this.closeInstructions();
    }
  }

  onQuestionInput(): void {
    if (this.question && this.question.length > this.MAX_CHARS) {
      this.question = this.question.slice(0, this.MAX_CHARS);
    }
  }

  handleEnter(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (!this.question.trim() || this.status === 'loading') {
      return;
    }

    event.preventDefault();
    this.askMilu();
  }

  askMilu(): void {
    const message = this.question.trim();

    if (!message || this.status === 'loading') {
      return;
    }

    this.status = 'loading';
    this.resetStreamState();
    this.answer = '';

    if (this.sendViaSocket(message)) {
      return;
    }

    this.http.post<MiluResponse>(this.apiUrl, { message, language: this.translate.currentLang }).subscribe({
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

  private initializeSocket(): void {
    if (typeof WebSocket === 'undefined') {
      return;
    }

    this.connectSocket();
  }

  private connectSocket(): void {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      this.socket = new WebSocket(this.socketUrl);

      this.socket.onerror = () => {
        this.socketError = true;
        this.socketConnected = false;
        this.cdr.detectChanges();
      };

      this.socket.onopen = () => {
        this.socketError = false;
        this.socketConnected = true;
        this.cdr.detectChanges();
      };

      this.socket.onmessage = (event) => this.handleSocketMessage(event);

      this.socket.onclose = () => {
        this.socketConnected = false;
        this.scheduleReconnect();
        this.cdr.detectChanges();
      };
    } catch {
      this.socketError = true;
      this.socketConnected = false;
    }
  }

  private scheduleReconnect(): void {
    this.clearReconnectTimer();
    this.socketReconnectTimer = setTimeout(() => this.connectSocket(), 5000);
  }

  private clearReconnectTimer(): void {
    if (this.socketReconnectTimer) {
      clearTimeout(this.socketReconnectTimer);
      this.socketReconnectTimer = undefined;
    }
  }

  private closeSocket(): void {
    this.clearReconnectTimer();
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
  }

  private sendViaSocket(message: string): boolean {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return false;
    }

    try {
      this.socket.send(JSON.stringify({ message, language: this.translate.currentLang }));
      return true;
    } catch {
      return false;
    }
  }

  private resetStreamState(): void {
    this.clearStreamTimer();
    this.streamBuffer = '';
    this.streamCompleted = false;
  }

  private clearStreamTimer(): void {
    if (this.streamTimer) {
      clearTimeout(this.streamTimer);
      this.streamTimer = undefined;
    }
  }

  private queueStreamText(text: string): void {
    if (!text) {
      return;
    }

    this.streamBuffer += text;
    this.startStreaming();
  }

  private startStreaming(): void {
    if (this.streamTimer) {
      return;
    }

    this.streamTimer = setTimeout(() => this.renderNextStreamChunk(), 25);
  }

  private renderNextStreamChunk(): void {
    if (this.streamBuffer.length > 0) {
      this.answer += this.streamBuffer.charAt(0);
      this.streamBuffer = this.streamBuffer.slice(1);
      this.cdr.detectChanges();
      this.streamTimer = setTimeout(() => this.renderNextStreamChunk(), 25);
      return;
    }

    if (this.streamCompleted) {
      this.status = 'success';
      this.cdr.detectChanges();
      this.clearStreamTimer();
      return;
    }

    this.clearStreamTimer();
  }

  private handleSocketMessage(event: MessageEvent): void {
    const rawData = event.data;
    let payload: any = rawData;

    if (typeof rawData === 'string') {
      const text = rawData.trim();
      if (text.startsWith('{') || text.startsWith('[')) {
        try {
          payload = JSON.parse(text);
        } catch {
          payload = text;
        }
      }
    }

    if (payload && typeof payload === 'object') {
      if (payload.type === 'chunk' || payload.type === 'update') {
        this.queueStreamText(payload.data ?? payload.chunk ?? payload.text ?? '');
        this.status = 'loading';
      } else if (payload.type === 'complete' || payload.type === 'done') {
        this.queueStreamText(payload.data ?? payload.text ?? payload.response ?? '');
        this.streamCompleted = true;
        this.status = 'loading';
      } else if (payload.type === 'error') {
        this.clearStreamTimer();
        this.answer = payload.message ?? payload.error ?? '';
        this.status = 'error';
      } else {
        this.queueStreamText(this.getResponseMessage(payload));
        this.streamCompleted = true;
        this.status = 'loading';
      }
    } else if (typeof payload === 'string') {
      this.queueStreamText(payload);
      this.streamCompleted = true;
      this.status = 'loading';
    }

    this.cdr.detectChanges();
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
