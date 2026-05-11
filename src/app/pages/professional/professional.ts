import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Experience {
  company: string;    
  position: string;  
  period: string;     
  description: string;
  logoUrl?: string;
}

export enum EducationStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED'
}
export interface Education {
  course: string;
  institution: string;
  status: EducationStatus;
  period: string;
  logoUrl?: string;
}

const EXPERIENCES: Experience[] = [
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.DESCRIPTION',
    logoUrl: 'assets/img/expresso-sao-miguel.webp'
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.DESCRIPTION',
    logoUrl: 'assets/img/concert.webp'
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.DESCRIPTION',
    logoUrl: 'assets/img/vision.webp'
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.DESCRIPTION',
    logoUrl: 'assets/img/infogen.webp'
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.4.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.4.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.4.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.4.DESCRIPTION',
    logoUrl: 'assets/img/popiolski.webp'
  },
];

const EDUCATIONS: Education[] = [
  {
    course: 'PROFESSIONAL.EDUCATION.0.COURSE',
    institution: 'PROFESSIONAL.EDUCATION.0.INSTITUTION',
    status: EducationStatus.IN_PROGRESS,
    period: 'PROFESSIONAL.EDUCATION.0.PERIOD',
    logoUrl: 'assets/img/unochapeco.webp'
  },
  {
    course: 'PROFESSIONAL.EDUCATION.1.COURSE',
    institution: 'PROFESSIONAL.EDUCATION.1.INSTITUTION',
    status: EducationStatus.COMPLETED,
    period: 'PROFESSIONAL.EDUCATION.1.PERIOD',
    logoUrl: 'assets/img/wizard.webp'
  }
];

@Component({
  selector: 'app-professional',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './professional.html',
  styleUrls: ['./professional.css'],
})

export class Professional {
  experiences = EXPERIENCES;
  educations = EDUCATIONS;
  languageSelected: 'PT' | 'EN' = 'PT';
  resumeFiles = {
    PT: {
      path: 'assets/documents/Alexandre_Langa_CV_PT_BR.pdf',
      name: 'Alexandre_Langa_CV.pdf',
      label: 'Baixar Currículo'
    },
    EN: {
      path: 'assets/documents/Alexandre_Langa_CV_EN.pdf',
      name: 'Alexandre_Langa_CV_EN.pdf',
      label: 'Download Resume'
    }
  };
  constructor(private translate: TranslateService) {}

  getEducationStatus(status: EducationStatus) {
    return `PROFESSIONAL.EDUCATION_STATUS.${status}`;
  }

  setLanguage(lang: 'PT' | 'EN') {
    this.languageSelected = lang;
  }
}