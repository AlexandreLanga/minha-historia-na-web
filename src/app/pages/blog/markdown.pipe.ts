import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    const normalized = value.replace(/\r\n?/g, '\n').trim();
    if (!normalized) {
      return '';
    }

    // Handle explicit line breaks before escaping HTML
    // Replace <br> tags with a placeholder so they are preserved during parsing
    const withBreaks = normalized.replace(/(<br\s*\/?\>)/gi, '§§BR§§');

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

    if (/^>\s?/.test(trimmed)) {
      return this.parseBlockquote(trimmed);
    }

    if (/^(\d+\.\s+|[-*+]\s+)/.test(trimmed)) {
      return this.parseList(block);
    }

    // Handle paragraphs with potential multiple line breaks
    const lines = trimmed.split('\n');
    if (lines.length === 1) {
      return `<p>${this.parseInline(trimmed)}</p>`;
    }

    // Process lines, preserving empty lines as <br> tags
    const processedLines = lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        return '<br>';
      }
      return this.parseInline(trimmedLine);
    });

    return `<p>${processedLines.join('')}</p>`;
  }

  private parseBlockquote(block: string): string {
    const lines = block.split('\n').map((line) => line.replace(/^>\s?/, ''));
    const content = lines.join('\n').trim();
    if (!content) {
      return '<blockquote></blockquote>';
    }

    // Process blockquote content as paragraphs, preserving line breaks
    const paragraphs = content.split(/\n\n+/).map((para) => {
      const trimmedPara = para.trim();
      if (!trimmedPara) return '';

      const paraLines = trimmedPara.split('\n');
      if (paraLines.length === 1) {
        return `<p>${this.parseInline(trimmedPara)}</p>`;
      }

      // Process lines, preserving empty lines as <br> tags
      const processedLines = paraLines.map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
          return '<br>';
        }
        return this.parseInline(trimmedLine);
      });

      return `<p>${processedLines.join('')}</p>`;
    }).filter((p) => p);

    return `<blockquote>${paragraphs.join('')}</blockquote>`;
  }

  private parseList(block: string): string {
    const lines = block.split('\n');
    const items: string[] = [];
    const ordered = /^\d+\.\s+/.test(lines[0].trim());
    const tag = ordered ? 'ol' : 'ul';

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
        // Continuação do item atual (linha indentada ou continuação)
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

    // Restore explicit line breaks placeholder to actual <br> tags
    result = result.replace(/§§BR§§/g, '<br>');
    result = result.replace(/<br\s*\/?>/gi, '<br>');

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
