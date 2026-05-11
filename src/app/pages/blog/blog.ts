import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BlogService, Post } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog {
  posts: Post[];
  searchTerm = '';

  constructor(private router: Router, private blogService: BlogService) {
    this.posts = this.blogService.getPosts();
  }

  get filteredPosts(): Post[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.posts;
    }
    return this.posts.filter(post => post.title.toLowerCase().includes(term));
  }

  onSearch(value: string) {
    this.searchTerm = value;
  }

  selectPost(post: Post) {
    this.router.navigate(['/blog', post.slug]);
  }
}