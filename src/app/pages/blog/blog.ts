import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from './markdown.pipe';

interface Post {
  title: string;
  date: Date;
  markdownPath: string;
  summary: string;
  content?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog {
  selectedPost: Post | null = null;
  selectedPostContent = '';
  isLoading = false;

  posts: Post[] = [
    {
      title: 'Reforma Tributária: O Impacto no Setor de Software e TI',
      date: new Date('2026-05-10'),
      markdownPath: 'assets/blog/reforma-tributaria.md',
      summary: 'Como o novo modelo tributário brasileiro afeta empresas de software, SaaS e provedores de TI.'
    }
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  selectPost(post: Post) {
    this.selectedPost = post;
    this.selectedPostContent = '';
    this.isLoading = true;

    this.http.get(post.markdownPath, { responseType: 'text' }).subscribe({
      next: (content) => {
        this.selectedPostContent = content;
        this.isLoading = false;
        this.cdr.markForCheck(); 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Falha no carregamento:', err);
        this.selectedPostContent = 'Erro ao carregar o post.';
        this.isLoading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }

  backToList() {
    this.selectedPost = null;
    this.selectedPostContent = '';
    this.isLoading = false;
  }
}