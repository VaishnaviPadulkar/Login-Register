import { Routes } from '@angular/router';
import { DashboardComponent } from './auth/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((n) => n.AuthModule),
  },
  { path: 'user', component: DashboardComponent },
  { path: '**', redirectTo: '/auth/login' },
  // {
  //   path: 'dash',
  //   loadChildren: () =>
  //     import('./dash/dash.module').then((m) => m.DashboardModule),
  // },
];
