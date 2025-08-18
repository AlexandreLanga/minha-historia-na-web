import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Experience {
  company: string;    
  position: string;  
  period: string;     
  description: string;
}

const EXPERIENCES: Experience[] = [
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.0.DESCRIPTION',
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.1.DESCRIPTION',
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.2.DESCRIPTION',
  },
  {
    company: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.COMPANY',
    position: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.POSITION',
    period: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.PERIOD',
    description: 'PROFESSIONAL.PROFESSIONAL_EXPERIENCE.3.DESCRIPTION',
  },
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
  constructor(private translate: TranslateService) {}
}