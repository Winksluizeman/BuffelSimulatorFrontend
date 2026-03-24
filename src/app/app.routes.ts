import { Routes } from '@angular/router';
import { Training } from '../presentation/components/training/training';
import { Progressie } from '../presentation/components/progressie/progressie';
import { Clubs} from '../presentation/components/clubs/clubs'
import { HomeCalender } from '../presentation/components/home/home';

export const routes: Routes = [
  {
    path:'',
    component: HomeCalender,
    pathMatch: 'full'
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
