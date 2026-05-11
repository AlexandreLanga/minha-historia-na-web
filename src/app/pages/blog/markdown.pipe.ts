import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    let html = value;

    // Escape HTML characters but preserve markdown syntax
    html = this.escapeHtml(html);

    // Imagens
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // Títulos
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr>');

    // Negrito
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Itálico
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Código inline
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Listas
    const lines = html.split('\n');
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;
    const processedLines: string[] = [];

    for (let line of lines) {
      if (line.trim().startsWith('* ')) {
        if (!inList || listType !== 'ul') {
          if (inList) {
            processedLines.push(`</${listType}>`);
          }
          processedLines.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        processedLines.push('<li>' + line.replace(/^\* /, '') + '</li>');
      } else if (/^\d+\. /.test(line.trim())) {
        if (!inList || listType !== 'ol') {
          if (inList) {
            processedLines.push(`</${listType}>`);
          }
          processedLines.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        processedLines.push('<li>' + line.replace(/^\d+\. /, '') + '</li>');
      } else {
        if (inList && line.trim() !== '') {
          processedLines.push(`</${listType}>`);
          inList = false;
          listType = null;
        }
        processedLines.push(line);
      }
    }
    if (inList && listType) {
      processedLines.push(`</${listType}>`);
    }

    html = processedLines.join('\n');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Line breaks within paragraphs
    html = html.replace(/<\/p><p>/g, '</p>\n<p>'); // Temporarily separate paragraphs
    html = html.replace(/\n/g, '<br>'); // Convert all remaining newlines to <br>
    html = html.replace(/<\/p>\n<p>/g, '</p><p>'); // Restore paragraph separation

    // Cleanup
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><(h[1-6]|ul|ol|hr)/g, '<$1');
    html = html.replace(/<\/(h[1-6]|ul|ol|hr)><\/p>/g, '</$1>');

    return this.sanitizer.bypassSecurityTrustHtml(html);
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
