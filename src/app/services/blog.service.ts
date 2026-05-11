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
        title: 'Reforma Tributária: O Impacto no Setor de Software e TI',
        date: new Date('2026-05-10'),
        markdownPath: 'assets/blog/reforma-tributaria.md',
        summary: 'Como o novo modelo tributário brasileiro afeta empresas de software, SaaS e provedores de TI.',
        slug: 'reforma-tributaria'
      }
    ];
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.getPosts().find(post => post.slug === slug);
  }
}