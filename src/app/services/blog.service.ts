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
        date: new Date(2026, 4, 20),
        markdownPath: 'assets/blog/como_o_tsw_mudou_minha_visao_profissional.md',
        summary: 'BLOG.POSTS.STARTUP_WEEKEND_SUMMARY',
        slug: 'como_o_tsw_mudou_minha_visao_profissional'
      },
      {
        title: 'BLOG.POSTS.PHP_VELHO_OESTE_TITLE',
        date: new Date(2026, 4, 31),
        markdownPath: 'assets/blog/php_velho_oeste_2026_minha_experiencia.md',
        summary: 'BLOG.POSTS.PHP_VELHO_OESTE_SUMMARY',
        slug: 'minha_experiencia_com_o_php_velho_oeste_2026'
      }
    ];
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.getPosts().find(post => post.slug === slug);
  }
}