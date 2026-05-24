import { Injectable } from '@angular/core';

export interface Post {
  title: string;
  date: Date;
  markdownPath: string;
  summary: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  getPosts(): Post[] {
    return [
      {
        title: 'BLOG.POSTS.STARTUP_WEEKEND_TITLE',
        date: new Date('2026-05-20'),
        markdownPath: 'assets/blog/como_o_tsw_mudou_minha_visao_profissional.md',
        summary: 'BLOG.POSTS.STARTUP_WEEKEND_SUMMARY',
        slug: 'como_o_tsw_mudou_minha_visao_profissional'
      }
    ];
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.getPosts().find(post => post.slug === slug);
  }
}