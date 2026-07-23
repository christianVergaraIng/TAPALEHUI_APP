import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio').then((m) => m.InicioComponent)
  },
  {
    path: 'la-comunidad',
    loadComponent: () => import('./pages/la-comunidad/la-comunidad').then((m) => m.LaComunidadComponent)
  },
  {
    path: 'vive-en-tapalehui',
    loadComponent: () => import('./pages/vive/vive').then((m) => m.ViveComponent)
  },
  {
    path: 'participa',
    loadComponent: () => import('./pages/participa/participa').then((m) => m.ParticipaComponent)
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/proyectos/proyectos').then((m) => m.ProyectosComponent)
  },
  {
    path: 'historias',
    loadComponent: () => import('./pages/historias/historias').then((m) => m.HistoriasComponent)
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/noticias/noticias').then((m) => m.NoticiasComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then((m) => m.ContactoComponent)
  },
  { path: '**', redirectTo: 'inicio' }
];
