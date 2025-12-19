import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  next() {
    this.router.navigate(['']);
  }

  username = '';
  email = '';
  password = '';
  uname = '';

  userData: any[] = [];
  isSubmitted = false;
  constructor() {
    const saved = localStorage.getItem('users');
    if (saved) {
      this.userData = JSON.parse(saved);
    }
  }
  login(form: any) {
    this.isSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.userData.push(form.value);
    console.log(this.userData);
    localStorage.setItem('users', JSON.stringify(this.userData));
  }
}
