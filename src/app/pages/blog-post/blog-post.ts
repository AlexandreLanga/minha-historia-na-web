import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../blog/markdown.pipe';
import { BlogService, Post } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css'],
})
export class BlogPost implements OnInit {
  post: Post | null = null;
  content = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
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
}