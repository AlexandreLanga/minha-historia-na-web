import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export type ProjectStatus = 'completed' | 'inProgress' | 'future';

export interface Project {
  id: number;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  details: string;
  status: ProjectStatus;
  favorite: boolean;
  technologies: string[];
  collaborators: string[];
  impact: string;
  demoLink: string | null;
  serviceLink: string | null;
  repoLink: string | null;
  downloadLink: string | null;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Booker',
    image: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1791510145/booker_pk66ih.png',
    imageAlt: 'PROJECTS_PAGE.PROJECTS.BOOKER.IMAGE_ALT',
    description: 'PROJECTS_PAGE.PROJECTS.BOOKER.DESCRIPTION',
    details: 'PROJECTS_PAGE.PROJECTS.BOOKER.DETAILS',
    status: 'completed',
    favorite: false,
    technologies: ['Python', 'SQLite'],
    collaborators: [],
    impact: 'PROJECTS_PAGE.PROJECTS.BOOKER.IMPACT',
    demoLink: 'https://www.youtube.com/watch?v=H6F6T3UzRi0',
    serviceLink: null,
    repoLink: 'https://github.com/AlexandreLanga/booker',
    downloadLink: 'https://drive.google.com/file/d/1j36Hm7uLQqp7ZlGCHbL2Mt3I5TCUE1AZ/view?usp=sharing',
  },
  {
    id: 2,
    name: 'api-utilidades',
    image: 'https://res.cloudinary.com/diizw3dqm/image/upload/v1791509561/api_utilidades_giqogo.png',
    imageAlt: 'PROJECTS_PAGE.PROJECTS.API_UTILIDADES.IMAGE_ALT',
    description: 'PROJECTS_PAGE.PROJECTS.API_UTILIDADES.DESCRIPTION',
    details: 'PROJECTS_PAGE.PROJECTS.API_UTILIDADES.DETAILS',
    status: 'inProgress',
    favorite: false,
    technologies: ['Java 21', 'Spring Boot', 'ViaCEP', 'OpenWeatherMap', 'OpenAPI', 'Docker'],
    collaborators: [],
    impact: 'PROJECTS_PAGE.PROJECTS.API_UTILIDADES.IMPACT',
    demoLink: null,
    serviceLink: 'https://api-utilidades.onrender.com/',
    repoLink: 'https://github.com/AlexandreLanga/api-utilidades',
    downloadLink: null,
  },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly projects = MOCK_PROJECTS;
  selectedProject: Project | null = null;

  openDetails(project: Project, dialog: HTMLDialogElement): void {
    this.selectedProject = project;
    dialog.showModal();
  }

  closeOnBackdrop(event: MouseEvent, dialog: HTMLDialogElement): void {
    if (event.target === dialog) {
      dialog.close();
    }
  }
}