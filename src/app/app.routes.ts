import { Routes } from '@angular/router';

import { Training } from '../presentation/training/training';
import { Progressie } from '../presentation/progress/progressie';
import { Clubs } from '../presentation/clubs/clubs';
import { Home } from '../presentation/home/home';
import { Weight } from '../presentation/weight/weight';
import { Login } from '../presentation/login/login';
import { RegisterComponent} from '../presentation/register/register';
import {authGuard} from '../infrastructure/auth.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: Home
  },
  {
    path: 'training',
    component:Training
  },
  {
    path: 'progressie',
    component:Progressie
  },
  {
    path: 'clubs',
    component:Clubs
  },
  {
    path: 'weight',
    component:Weight,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {
     path: 'register',
     component: RegisterComponent
  }

];
