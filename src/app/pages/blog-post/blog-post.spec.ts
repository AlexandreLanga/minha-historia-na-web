import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPost } from './blog-post';

describe('BlogPost', () => {
  let component: BlogPost;
  let fixture: ComponentFixture<BlogPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Audio Parser', () => {
    it('should parse single audio source', () => {
      const block = `[audio]
horse.mp3|audio/mpeg
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('<audio controls>');
      expect(result).toContain('<source src="horse.mp3" type="audio/mpeg">');
      expect(result).toContain('</audio>');
    });

    it('should parse multiple audio sources', () => {
      const block = `[audio]
horse.mp3|audio/mpeg
horse.ogg|audio/ogg
horse.wav|audio/wav
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('<source src="horse.mp3" type="audio/mpeg">');
      expect(result).toContain('<source src="horse.ogg" type="audio/ogg">');
      expect(result).toContain('<source src="horse.wav" type="audio/wav">');
    });

    it('should handle audio files with paths', () => {
      const block = `[audio]
/assets/audio/podcast.mp3|audio/mpeg
/assets/audio/podcast.ogg|audio/ogg
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('src="/assets/audio/podcast.mp3"');
      expect(result).toContain('src="/assets/audio/podcast.ogg"');
    });

    it('should handle src/type attribute format', () => {
      const block = `[audio]
src="horse.mp3" type="audio/mpeg"
src="horse.ogg" type="audio/ogg"
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('<source src="horse.mp3" type="audio/mpeg">');
      expect(result).toContain('<source src="horse.ogg" type="audio/ogg">');
    });

    it('should escape special characters in file paths', () => {
      const block = `[audio]
horse&more.mp3|audio/mpeg
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('src="horse&amp;more.mp3"');
    });

    it('should return empty string for empty audio block', () => {
      const block = `[audio]
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toBe('');
    });

    it('should ignore lines before [audio] tag', () => {
      const block = `[audio]
horse.mp3|audio/mpeg
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('<source src="horse.mp3"');
    });

    it('should stop parsing at [/audio] tag', () => {
      const block = `[audio]
horse.mp3|audio/mpeg
[/audio]
ignored.mp3|audio/mpeg`;
      const result = component['parseAudio'](block);
      expect(result).toContain('<source src="horse.mp3"');
      expect(result).not.toContain('ignored.mp3');
    });

    it('should include fallback message', () => {
      const block = `[audio]
horse.mp3|audio/mpeg
[/audio]`;
      const result = component['parseAudio'](block);
      expect(result).toContain('Your browser does not support the audio element');
    });
  });

  describe('Video Parser', () => {
    it('should parse YouTube links as responsive embeds', () => {
      const block = `[video]\nhttps://www.youtube.com/watch?v=abc123\n[/video]`;
      const result = component['parseVideo'](block);

      expect(result).toContain('class="video-embed"');
      expect(result).toContain('https://www.youtube-nocookie.com/embed/abc123?rel=0');
      expect(result).toContain('allowfullscreen');
    });

    it('should parse direct video sources with optional MIME types', () => {
      const block = `[video]\nhttps://cdn.example.com/video.mp4|video/mp4\n[/video]`;
      const result = component['parseVideo'](block);

      expect(result).toContain('<video controls');
      expect(result).toContain('src="https://cdn.example.com/video.mp4" type="video/mp4"');
    });

    it('should reject unsafe video URLs', () => {
      const block = `[video]\njavascript:alert(1)\n[/video]`;

      expect(component['parseVideo'](block)).toBe('');
    });
  });
});