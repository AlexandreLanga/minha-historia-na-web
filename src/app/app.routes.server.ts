import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './services/blog.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blogService = inject(BlogService);
      return blogService.getPosts().map(post => ({ slug: post.slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
