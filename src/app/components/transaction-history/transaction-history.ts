import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit {
  transactions: any[] = [];

  ngOnInit() {
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  }
}
