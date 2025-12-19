import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  next() {
    this.router.navigate(['']);
  }
  isSubmitted = false;

  signup(form: NgForm) {
    this.isSubmitted = true;

    if (form.invalid) {
      return;
    }

    const userData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      mobile: form.value.mobile,
    };

    console.log('Signup Data:', userData);

    // reset form after submit
    form.resetForm();
    this.isSubmitted = false;
  }
}
