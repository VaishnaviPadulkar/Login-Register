import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userFrm: FormGroup = new FormGroup({});
  users: User[] = [];

  constructor(private f_d: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userFrm = this.f_d.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    const userData = localStorage.getItem('user');
    if (userData) {
      this.users = JSON.parse(userData);
    }
  }

  login() {
    if (this.userFrm.valid) {
      const formData = this.userFrm.value;
      const isUserExist = this.users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (isUserExist) {
        localStorage.setItem(
          'loggedUser',
          JSON.stringify({ name: isUserExist.name, email: isUserExist.email })
        );
        this.router.navigate(['/user']);
      } else {
        alert('Invalid email or password');
      }
    }
  }

  // console.log(formData.value);
  // console.log(formData.valid);
}
