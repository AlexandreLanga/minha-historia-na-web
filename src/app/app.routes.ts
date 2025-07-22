import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { MinhaHistoria } from './pages/minha-historia/minha-historia';
import { Professional } from './pages/professional/professional';
import { MaisSobreMim } from './pages/mais-sobre-mim/mais-sobre-mim';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'minha-historia', component: MinhaHistoria },
  { path: 'profissional', component: Professional },
  { path: 'mais-sobre-mim', component: MaisSobreMim },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
