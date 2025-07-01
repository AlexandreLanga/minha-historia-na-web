import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { MinhaHistoria } from './pages/minha-historia/minha-historia';
import { Profissional } from './pages/profissional/profissional';
import { MaisSobreMim } from './pages/mais-sobre-mim/mais-sobre-mim';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'minha-historia', component: MinhaHistoria },
  { path: 'profissional', component: Profissional },
  { path: 'mais-sobre-mim', component: MaisSobreMim },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
