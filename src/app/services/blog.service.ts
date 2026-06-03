import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, shareReplay } from 'rxjs';
import { of } from 'rxjs';

export interface Post {
  title: string;
  date: Date;
  markdownPath: string;
  summary: string;
  slug: string;
}

interface ManifestPost {
  title: string;
  summary: string;
  slug: string;
  date: string;
  file: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly MANIFEST_URL = 'https://raw.githubusercontent.com/AlexandreLanga/blog-content/main/manifest.json';
  private readonly POSTS_BASE_URL = 'https://raw.githubusercontent.com/AlexandreLanga/blog-content/main/posts/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<{ posts: ManifestPost[] }>(this.MANIFEST_URL).pipe(
      map(response => 
        response.posts.map(post => ({
          title: post.title,
          summary: post.summary,
          slug: post.slug,
          date: this.parseLocalDate(post.date),
          markdownPath: this.POSTS_BASE_URL + post.file
        }))
      ),
      catchError(error => {
        console.error('Erro ao carregar posts:', error);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  getPostBySlug(slug: string): Observable<Post | undefined> {
    return this.getPosts().pipe(
      map(posts => posts.find(post => post.slug === slug))
    );
  }

  private parseLocalDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);

    return new Date(
      year,
      month - 1, // Adjust month index (0-based)
      day
    );
  }
}