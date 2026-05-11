import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Post {
  title: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog {
  posts: Post[] = [
    {
      title: 'Introdução ao Angular',
      content: 'Angular é um framework para desenvolvimento de aplicações web...',
      date: new Date('2023-01-01')
    },
    {
      title: 'TypeScript Básico',
      content: 'TypeScript é um superset do JavaScript...',
      date: new Date('2023-02-01')
    },
    // Add up to 5 posts
  ];

  get limitedPosts(): Post[] {
    return this.posts.slice(0, 5);
  }
}