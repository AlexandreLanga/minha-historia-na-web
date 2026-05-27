import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService, Post } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css'],
})
export class BlogPost implements OnInit {
  post: Post | null = null;
  content = '';
  safeContent: SafeHtml = '';
  isLoading = false;
  showEmailOptions = false;

  private readonly feedbackEmail = 'alexandrelangadeveloper@gmail.com';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post = this.blogService.getPostBySlug(slug) || null;

      this.translate.getTranslation('pt').subscribe(translations => {
        if (this.post) {
          this.post.title = this.translate.getParsedResult(translations, this.post.title);
          this.post.summary = this.translate.getParsedResult(translations, this.post.summary);
          this.loadContent();
        }
      });
    }
  }

  private loadContent() {
    if (!this.post) return;
    this.isLoading = true;
    this.http.get(this.post.markdownPath, { responseType: 'text' }).subscribe({
      next: (content) => {
        this.content = content;
        this.safeContent = this.renderMarkdown(content);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading post content:', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  openFeedbackOptions() {
    this.showEmailOptions = !this.showEmailOptions;
  }

  sendFeedback(service: 'gmail' | 'outlook') {
    const title = this.post?.title ?? 'sobre o post';
    const feedbackSubject = `Feedback - ${title}`;
    const bodyPlain = 
      `Olá Alexandre Langa,
      \n\nGostaria de deixar minha opinião sobre o post "${title}".
      \nNota: (deixe aqui sua nota de 1 a 5, sendo 1 a pior e 5 a melhor)
      \nAqui está meu feedback:\n\n\n`;

    const email = this.feedbackEmail;
    const encodedSubject = encodeURIComponent(feedbackSubject);
    const encodedBody = encodeURIComponent(bodyPlain);

    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodedSubject}&body=${encodedBody}`;
    const outlookWeb = `https://outlook.office.com/mail/deeplink/compose?path=/mail/action/compose&to=${encodeURIComponent(email)}&subject=${encodedSubject}&body=${encodedBody}`;
    const mailto = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    const openWithFallback = (appUrl: string, webUrl: string) => {
      try {
        window.location.href = appUrl;
      } catch (e) {
      }
      setTimeout(() => {
        window.location.href = webUrl;
      }, 800);
    };

    if (isMobile) {
      if (service === 'gmail') {
        const gmailApp = `googlegmail://co?to=${encodeURIComponent(email)}&subject=${encodedSubject}&body=${encodedBody}`;
        openWithFallback(gmailApp, gmailWeb);
      } else {
        const outlookApp = `ms-outlook://compose?to=${encodeURIComponent(email)}&subject=${encodedSubject}&body=${encodedBody}`;
        openWithFallback(outlookApp, outlookWeb);
      }
    } else {
      if (service === 'gmail') {
        window.open(gmailWeb, '_blank');
      } else {
        window.open(outlookWeb, '_blank');
      }
      setTimeout(() => {}, 0);
    }
  }

  private renderMarkdown(value: string): SafeHtml {
    if (!value) {
      return '' as SafeHtml;
    }

    const normalized = value.replace(/\r\n?/g, '\n').trim();
    if (!normalized) {
      return '' as SafeHtml;
    }

    const withBreaks = normalized.replace(/(<br\s*\/?>)/gi, '§§BR§§');
    const escaped = this.escapeHtml(withBreaks);
    const content = escaped
      .replace(/```([\s\S]*?)```/g, (_match, code) => `<pre><code>${code.trim()}</code></pre>`)
      .split(/\n\n+/)
      .map((block) => this.parseBlock(block))
      .join('\n\n');

    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  private parseBlock(block: string): string {
    const trimmed = block.trim();

    if (!trimmed) {
      return '';
    }

    if (/^<pre><code>/.test(trimmed)) {
      return trimmed;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (!match) return `<p>${this.parseInline(trimmed)}</p>`;
      const level = Math.min(match[1].length, 6);
      return `<h${level}>${this.parseInline(match[2].trim())}</h${level}>`;
    }

    if (/^(\*|-|_)\s*\1\s*\1\s*$/.test(trimmed)) {
      return '<hr>';
    }

    if (/^\s*(?:>|&gt;)/m.test(block)) {
      return this.parseBlockquote(block);
    }

    if (/^(\d+\.\s+|[-*+]\s+)/.test(trimmed)) {
      return this.parseList(block);
    }

    const lines = trimmed.split('\n');
    if (lines.length === 1) {
      return `<p>${this.parseInline(trimmed)}</p>`;
    }

    const processedLines = lines.map((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        return '<br>';
      }
      return this.parseInline(trimmedLine);
    });

    return `<p>${processedLines.join('<br>')}</p>`;
  }

  private parseBlockquote(block: string): string {
    const lines = block.split('\n').map((line) => line.replace(/^\s*(?:>|&gt;)\s?/, ''));
    const content = lines.join('\n').trim();
    if (!content) {
      return '<blockquote></blockquote>';
    }

    const rawParagraphs = content.split(/\n\n+/).map((para) => para.trim()).filter(Boolean);
    let authorLine = '';
    if (rawParagraphs.length) {
      const lastRaw = rawParagraphs[rawParagraphs.length - 1];
      const authorMatch = lastRaw.match(/^[\s\-–—]+(.+)$/);
      if (authorMatch) {
        authorLine = authorMatch[1].trim();
        rawParagraphs.pop();
      }
    }

    const paragraphs = rawParagraphs.map((para) => {
      const paraLines = para.split('\n');
      if (paraLines.length === 1) {
        return `<p>${this.parseInline(para)}</p>`;
      }
      const processedLines = paraLines.map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
          return '<br>';
        }
        return this.parseInline(trimmedLine);
      });
      return `<p>${processedLines.join('<br>')}</p>`;
    });

    if (authorLine) {
      paragraphs.push(`<footer class="quote-cite">${this.parseInline(authorLine)}</footer>`);
    }

    return `<blockquote>${paragraphs.join('')}</blockquote>`;
  }

  private parseList(block: string): string {
    const lines = block.split('\n');
    const ordered = /^\d+\.\s+/.test(lines[0].trim());
    const tag = ordered ? 'ol' : 'ul';
    const items: string[] = [];
    let currentItem = '';
    let inItem = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        if (inItem) {
          currentItem += '<br>';
        }
        continue;
      }
      const isListItem = ordered ? /^\d+\.\s+/.test(trimmed) : /^[-*+]\s+/.test(trimmed);
      if (isListItem) {
        if (inItem) {
          items.push(`<li>${this.parseInline(currentItem.trim())}</li>`);
        }
        currentItem = trimmed.replace(/^(\d+\.\s+|[-*+]\s+)/, '').trim();
        inItem = true;
      } else if (inItem) {
        currentItem += ' ' + trimmed;
      }
    }

    if (inItem) {
      items.push(`<li>${this.parseInline(currentItem.trim())}</li>`);
    }

    return `<${tag}>${items.join('')}</${tag}>`;
  }

  private parseInline(text: string): string {
    let result = text;
    result = result.replace(/§§BR§§/g, '<br>');
    result = result.replace(/<br\s*\/?\>/gi, '<br>');
    result = result.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    result = result.replace(/___(.*?)___/g, '<strong><em>$1</em></strong>');
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/__(.*?)__/g, '<strong>$1</strong>');
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
    result = result.replace(/_(.*?)_/g, '<em>$1</em>');
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
    return result;
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (char) => map[char] || char);
  }
}
