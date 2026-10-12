import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_PROJECTS, Projects } from './projects';

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

describe('Project data', () => {
  it('should include the langa-ai-agents project', () => {
    const project = MOCK_PROJECTS.find(item => item.name === 'langa-ai-agents');

    expect(project).toBeTruthy();
    expect(project?.image).toBe(
      'https://res.cloudinary.com/diizw3dqm/image/upload/v1791783512/copilot_image_inecsi.png'
    );
    expect(project?.repoLink).toBe('https://github.com/AlexandreLanga/langa-ai-agents');
    expect(project?.status).toBe('continuous');
  });
});