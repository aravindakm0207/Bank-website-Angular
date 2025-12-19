import { Routes } from '@angular/router';
import { Bank } from './components/bank/bank';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
export const routes: Routes = [
  { path: '', component: Bank },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
];
