import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { MyHistory } from './pages/my-history/my-history';
import { Professional } from './pages/professional/professional';
import { AboutMe } from './pages/about-me/about-me';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'my-history', component: MyHistory },
  { path: 'profissional', component: Professional },
  { path: 'about-me', component: AboutMe },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
