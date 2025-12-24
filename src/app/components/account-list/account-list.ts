import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account-list',
  imports: [CommonModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css',
})
export class AccountList implements OnInit {
  accounts: any[] = [];

  ngOnInit() {
    this.accounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');
  }
}
