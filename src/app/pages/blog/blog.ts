import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BlogService, Post } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog implements OnInit {
  readonly pageOptions = [5, 10, 20];
  posts = signal<Post[]>([]);
  searchTerm = signal('');
  filtersOpen = signal(false);
  selectedTags = signal<string[]>([]);
  tagDropdownOpen = signal(false);
  tagSearchTerm = signal('');
  dateFrom = signal('');
  dateTo = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  availableTags = computed(() => {
    const postTags = this.posts().flatMap(post => post.tags);
    return Array.from(new Set([...postTags]));
  });

  filteredAvailableTags = computed(() => {
    const filter = this.tagSearchTerm().trim().toLowerCase();
    return this.availableTags().filter(tag => tag.toLowerCase().includes(filter));
  });

  filteredPosts = computed(() => {
    const posts = this.posts();
    const term = this.searchTerm().trim().toLowerCase();
    const selectedTags = this.selectedTags();
    const fromValue = this.dateFrom();
    const toValue = this.dateTo();
    let start: Date | undefined;
    let end: Date | undefined;

    if (fromValue) {
      start = new Date(fromValue);
    }

    if (toValue) {
      end = new Date(toValue);
    }

    if (start && end && start > end) {
      [start, end] = [end, start];
    }

    return posts.filter(post => {
      const matchesTag = selectedTags.length === 0
        ? true
        : selectedTags.some(tag => post.tags.includes(tag));

      if (!matchesTag) {
        return false;
      }

      if (start && post.date < start) {
        return false;
      }

      if (end && post.date > end) {
        return false;
      }

      if (!term) {
        return true;
      }

      const titleTranslated = this.translate.instant(post.title).toLowerCase();
      return titleTranslated.includes(term);
    });
  });

  totalPages = computed(() => {
    const filteredCount = this.filteredPosts().length;
    const total = Math.ceil(filteredCount / this.pageSize());
    return Math.max(1, total || 1);
  });

  paginatedPosts = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * this.pageSize();
    return this.filteredPosts().slice(start, start + this.pageSize());
  });

  constructor(
    private router: Router,
    private blogService: BlogService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts.set(posts);
      this.currentPage.set(1);
    });
  }

  get isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  setPageSize(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    const total = this.totalPages();
    const nextPage = Math.min(Math.max(1, page), total);
    this.currentPage.set(nextPage);
  }

  previousPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  toggleFilters() {
    this.filtersOpen.set(!this.filtersOpen());
    if (!this.filtersOpen()) {
      this.tagDropdownOpen.set(false);
    }
  }

  toggleTagDropdown() {
    this.tagDropdownOpen.set(!this.tagDropdownOpen());
  }

  onTagSearch(value: string) {
    this.tagSearchTerm.set(value);
  }

  onDateChange(value: string, field: 'from' | 'to') {
    if (field === 'from') {
      this.dateFrom.set(value);
    } else {
      this.dateTo.set(value);
    }

    this.currentPage.set(1);
  }

  clearDateFilters() {
    this.dateFrom.set('');
    this.dateTo.set('');
    this.currentPage.set(1);
  }

  toggleTag(tag: string) {
    const current = this.selectedTags();
    const index = current.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.set(current.filter(item => item !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }

    this.currentPage.set(1);
  }

  clearTags() {
    this.selectedTags.set([]);
    this.currentPage.set(1);
  }

  selectPost(post: Post) {
    this.router.navigate(['/blog', post.slug]);
  }
}