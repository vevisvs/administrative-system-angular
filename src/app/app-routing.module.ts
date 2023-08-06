import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'board',
    canActivate: [authGuard],
    component: BoardComponent,
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**',
    redirectTo: '/authentication/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
