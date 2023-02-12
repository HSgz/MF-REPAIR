import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { SuccessComponent } from './pages/success/success.component';
import { canActivate, redirectUnauthorizedTo }  from '@angular/fire/auth-guard'

export const formularioRouter: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registro',
        component: RegistroComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/inicio'])),
        title: 'MF - Registro'
      },
      {
        path: 'success',
        component: SuccessComponent,
        title: 'MF - Registro Exitoso'
      },
      {
        path: '**',
        redirectTo: 'registro'
      },
    ],
  },
];
