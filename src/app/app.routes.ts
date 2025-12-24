import { Routes } from '@angular/router';
import { Bank } from './components/bank/bank';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AccountList } from './components/account-list/account-list';
import { TransactionHistory } from './components/transaction-history/transaction-history';
import { BeneficiaryList } from './components/beneficiary-list/beneficiary-list';
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
  { path: 'accounts', component: AccountList },
  { path: 'transactions', component: TransactionHistory },
  { path: 'beneficiaries', component: BeneficiaryList },
];
