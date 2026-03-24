import { Routes } from '@angular/router';
import { Training } from '../presentation/components/training/training';
import { Progressie } from '../presentation/components/progressie/progressie';
import { Clubs} from '../presentation/components/clubs/clubs';
import { Home} from '../presentation/components/home/home';

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
  }
];
