import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: ()=> import('./dashboard/dashboard.component').then(m => m.DashboardComponent)},
    {path: 'counter', loadComponent: ()=> import('./counter/counter.component').then(m => m.CounterComponent)},
    // loadComponent: ()=> import('./view/view.component').then(m => m.ViewComponent)
    {path: '**', redirectTo: ''},
];
