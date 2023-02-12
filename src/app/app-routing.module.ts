import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.component').then(c => c.InicioComponent),
    title: 'MF - Inicio'
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.component').then(c => c.ContactoComponent),
    title: 'MF - Contacto'
  },
  {
    path: 'formulario',
    loadChildren: () =>
      import('./formulario/formulario.router').then((c) => c.formularioRouter),
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
