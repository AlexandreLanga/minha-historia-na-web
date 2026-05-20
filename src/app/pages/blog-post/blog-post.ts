import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post = this.blogService.getPostBySlug(slug) || null;
      if (this.post) {
        this.loadContent();
      }
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

    if (/^(?:>|&gt;)\s?/.test(trimmed)) {
      return this.parseBlockquote(trimmed);
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
    const lines = block.split('\n').map((line) => line.replace(/^(?:>|&gt;)\s?/, ''));
    const content = lines.join('\n').trim();
    if (!content) {
      return '<blockquote></blockquote>';
    }

    const paragraphs = content.split(/\n\n+/).map((para) => {
      const trimmedPara = para.trim();
      if (!trimmedPara) return '';
      const paraLines = trimmedPara.split('\n');
      if (paraLines.length === 1) {
        return `<p>${this.parseInline(trimmedPara)}</p>`;
      }
      const processedLines = paraLines.map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
          return '<br>';
        }
        return this.parseInline(trimmedLine);
      });
      return `<p>${processedLines.join('<br>')}</p>`;
    }).filter((p) => p);

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
