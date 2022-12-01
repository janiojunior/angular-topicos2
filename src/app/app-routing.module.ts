import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './autenticacao/interceptors/auth.interceptor';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'autenticacao' },

  {
    path: 'autenticacao',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then(m => m.EstadoModule)
  },
  {
    path: 'cidade',
    loadChildren: () => import('./cidade/cidade.module').then(m => m.CidadeModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
