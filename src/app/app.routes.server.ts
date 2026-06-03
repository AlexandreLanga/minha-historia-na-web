import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './services/blog.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blogService = inject(BlogService);
      const posts = await firstValueFrom(blogService.getPosts());
      return posts.map(post => ({ slug: post.slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
