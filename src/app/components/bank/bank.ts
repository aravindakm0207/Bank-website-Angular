import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { About } from '../about/about';

@Component({
  selector: 'app-bank',
  imports: [FormsModule, CommonModule, About],
  templateUrl: './bank.html',
  styleUrl: './bank.css',
})
export class Bank {
  private router = inject(Router);
  next() {
    this.router.navigate(['register']);
  }
  log() {
    this.router.navigate(['login']);
  }

  // interpolation
  BankName: String = 'Folkslogic';
  form: any = {
    name: '',
    dob: '',
    email: '',
    gender: '',
    accountType: '',
    depositAmount: 0,
  };

  createdAccount: any = null;
  activeSection = '';
  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  bankaccounttransactions: any[] = [];

  createAccount() {
    const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');
    const newAccount = {
      accountNumber: 'BANK' + Date.now(),
      name: this.form.name,
      dob: this.form.dob,
      email: this.form.email,
      gender: this.form.gender,
      accountType: this.form.accountType,
      balance: Number(this.form.depositAmount),
    };

    accounts.push(newAccount);
    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
    this.router.navigate(['accounts']);
    this.createdAccount = newAccount;
  }
  ngOnInit() {
    const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');
    if (accounts.length > 0) {
      this.createdAccount = accounts[accounts.length - 1];
    }
  }

  transaction = {
    accountNumber: '',
    amount: 0,
  };
  // deposit() {
  //   const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');

  //   const account = accounts.find(
  //     (acc: any) => acc.accountNumber === this.transaction.accountNumber
  //   );

  //   if (!account) {
  //     alert('Account not found');
  //     return;
  //   }

  //   account.balance += Number(this.transaction.amount);
  //   this.bankaccounttransactions.push({
  //     type: 'Deposit',
  //     account: account.accountNumber,
  //     amount: this.transaction.amount,
  //     balance: account.balance,
  //   });

  //   localStorage.setItem('bankAccounts', JSON.stringify(accounts));
  // }

  saveTransaction(txn: any) {
    const history = JSON.parse(localStorage.getItem('transactions') || '[]');
    history.push(txn);
    localStorage.setItem('transactions', JSON.stringify(history));
  }
  viewTransactions() {
    this.router.navigate(['transactions']);
  }

  deposit() {
    const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');

    const account = accounts.find(
      (acc: any) => acc.accountNumber === this.transaction.accountNumber
    );

    if (!account) {
      alert('Account not found');
      return;
    }

    account.balance += Number(this.transaction.amount);

    // 🔹 SAVE TRANSACTION HERE
    this.saveTransaction({
      type: 'Deposit',
      account: account.accountNumber,
      amount: this.transaction.amount,
      balance: account.balance,
    });

    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
    alert('Deposit successful');
  }

  withdraw() {
    const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');

    const account = accounts.find(
      (acc: any) => acc.accountNumber === this.transaction.accountNumber
    );

    if (!account) {
      alert('Account not found');
      return;
    }

    if (account.balance < this.transaction.amount) {
      alert('Insufficient balance');
      return;
    }

    account.balance -= Number(this.transaction.amount);

    // this.bankaccounttransactions.push({
    //   type: 'Withdraw',
    //   account: account.accountNumber,
    //   amount: this.transaction.amount,
    //   balance: account.balance,
    // });

    this.saveTransaction({
      type: 'Withdraw',
      account: account.accountNumber,
      amount: this.transaction.amount,
      balance: account.balance,
    });

    localStorage.setItem('bankAccounts', JSON.stringify(accounts));

    this.createdAccount = account;
    alert('Withdrawal successful');
  }

  fromAccountNumber = '';
  toAccountNumber = '';
  transferAmount = 0;
  bankTransfer() {
    const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');

    const fromAcc = accounts.find((acc: any) => acc.accountNumber === this.fromAccountNumber);

    const toAcc = accounts.find((acc: any) => acc.accountNumber === this.toAccountNumber);

    if (!fromAcc || !toAcc) {
      alert('Invalid account number(s)');
      return;
    }

    if (fromAcc.balance < this.transferAmount) {
      alert('Insufficient balance');
      return;
    }

    fromAcc.balance -= Number(this.transferAmount);
    toAcc.balance += Number(this.transferAmount);
    // this.bankaccounttransactions.push({
    //   type: 'Transfer',
    //   account: this.fromAccountNumber,
    //   amount: this.transferAmount,
    //   balance: fromAcc.balance,
    // });
    this.saveTransaction({
      type: 'Transfer',
      account: this.fromAccountNumber,
      amount: this.transferAmount,
      balance: fromAcc.balance,
    });

    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
    alert('Transfer successful');
  }

  accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');

  beneficiary = {
    name: '',
    accountNumber: '',
  };

  beneficiaries: any[] = JSON.parse(localStorage.getItem('beneficiaries') || '[]');
  addBeneficiary() {
    const accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');

    const accountExists = accounts.some(
      (acc: any) => acc.accountNumber === this.beneficiary.accountNumber
    );

    if (!accountExists) {
      alert('Account number does not exist');
      return;
    }

    this.beneficiaries.push({ ...this.beneficiary });
    localStorage.setItem('beneficiaries', JSON.stringify(this.beneficiaries));

    this.beneficiary = { name: '', accountNumber: '' };
    alert('Beneficiary added successfully');
  }

  viewAccounts() {
    this.router.navigate(['accounts']);
  }
  viewBeneficiaries() {
    this.router.navigate(['beneficiaries']);
  }
}
