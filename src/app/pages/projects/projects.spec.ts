import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects]
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display continuous development status', () => {
    component.projects[0].status = 'continuous';
    fixture.detectChanges();

    const status = fixture.nativeElement.querySelector('.status-continuous');
    expect(status).toBeTruthy();
    expect(status.querySelector('.fa-arrows-rotate')).toBeTruthy();
  });
});