import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BlogService, Post } from '../../services/blog.service';
import { Blog } from './blog';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  const buildPosts = (count: number): Post[] => Array.from({ length: count }, (_, index) => ({
    title: `Post ${index + 1}`,
    date: new Date(2024, 0, index + 1),
    markdownPath: `/posts/${index + 1}.md`,
    summary: `Resumo ${index + 1}`,
    slug: `post-${index + 1}`,
    tags: index % 2 === 0 ? ['tag-1'] : ['tag-2'],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog, TranslateModule.forRoot()],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        {
          provide: BlogService,
          useValue: {
            getPosts: () => of(buildPosts(25)),
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate posts in groups of 10 by default', () => {
    component.posts.set(buildPosts(25));

    expect(component.currentPage()).toBe(1);
    expect(component.pageSize()).toBe(10);
    expect(component.filteredPosts().length).toBe(25);
    expect(component.paginatedPosts().length).toBe(10);
    expect(component.totalPages()).toBe(3);
  });

  it('should allow changing the page size to 5 or 20', () => {
    component.posts.set(buildPosts(25));

    component.setPageSize(5);
    expect(component.pageSize()).toBe(5);
    expect(component.paginatedPosts().length).toBe(5);

    component.setPageSize(20);
    expect(component.pageSize()).toBe(20);
    expect(component.paginatedPosts().length).toBe(20);
  });
});