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
  posts = signal<Post[]>([]);
  searchTerm = signal('');
  filtersOpen = signal(false);
  selectedTags = signal<string[]>([]);
  tagDropdownOpen = signal(false);
  tagSearchTerm = signal('');
  dateFrom = signal('');
  dateTo = signal('');

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

  constructor(
    private router: Router,
    private blogService: BlogService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts.set(posts);
    });
  }

  get isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
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
  }

  clearDateFilters() {
    this.dateFrom.set('');
    this.dateTo.set('');
  }

  toggleTag(tag: string) {
    const current = this.selectedTags();
    const index = current.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.set(current.filter(item => item !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  clearTags() {
    this.selectedTags.set([]);
  }

  selectPost(post: Post) {
    this.router.navigate(['/blog', post.slug]);
  }
}