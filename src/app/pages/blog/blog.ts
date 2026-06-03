import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BlogService, Post } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog implements OnInit {
  posts = signal<Post[]>([]);
  searchTerm = signal('');

  filteredPosts = computed(() => {
    const posts = this.posts();
    const term = this.searchTerm().trim().toLowerCase();
    
    if (!term) {
      return posts;
    }
    
    return posts.filter(post => {
      const titleTranslated = this.translate.instant(post.title).toLowerCase();
      return titleTranslated.includes(term);
    });
  });

  constructor(
    private router: Router,
    private blogService: BlogService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts.set(posts);
    });
  }

  get isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }

  selectPost(post: Post) {
    this.router.navigate(['/blog', post.slug]);
  }
}