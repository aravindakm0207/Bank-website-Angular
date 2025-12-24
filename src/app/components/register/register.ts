import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  isSubmitted = false;

  userData: any = null;
  ngOnInit() {
    const data = localStorage.getItem('user');
    if (data) {
      this.userData = JSON.parse(data);
    }
  }

  signup(form: NgForm) {
    this.isSubmitted = true;

    if (form.invalid) {
      return;
    }

    const savedUser = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      mobile: form.value.mobile,
    };

    localStorage.setItem('user', JSON.stringify(savedUser));
    this.userData = savedUser;
    console.log('Signup Data:', savedUser);
    this.isSubmitted = false;
    form.resetForm();
  }
}
