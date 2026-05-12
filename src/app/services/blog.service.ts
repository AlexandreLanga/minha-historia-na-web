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
        title: 'Novidades em tecnologia vindo aí!!!',
        date: new Date('2026-05-11'),
        markdownPath: 'assets/blog/introducao.md',
        summary: 'Estudos, inovação, insights e muito mais sobre o mundo da tecnologia.',
        slug: 'introducao.md'
      }
    ];
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.getPosts().find(post => post.slug === slug);
  }
}