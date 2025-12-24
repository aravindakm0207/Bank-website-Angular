import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beneficiary-list',
  imports: [CommonModule],
  templateUrl: './beneficiary-list.html',
  styleUrl: './beneficiary-list.css',
})
export class BeneficiaryList implements OnInit {
  beneficiaries: any[] = [];

  ngOnInit() {
    this.beneficiaries = JSON.parse(localStorage.getItem('beneficiaries') || '[]');
  }
}
