import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userFrm: FormGroup = new FormGroup({});
  user: any[] = [];
  editIndex: null | number = null;

  constructor(private f_d: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userFrm = this.f_d.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(8)]),
      ],
    });

    const registerData = localStorage.getItem('user');
    if (registerData) {
      this.user = JSON.parse(registerData);
    }
  }

  submit() {
    const formData = this.userFrm.value;
    if (this.userFrm.valid) {
      if (this.editIndex != null) {
        this.user[this.editIndex] = formData;
        this.editIndex = null;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.user.push(formData);
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      this.userFrm.reset();
      this.router.navigate(['']);
      alert('Registered successfully!');
    }
  }
}
