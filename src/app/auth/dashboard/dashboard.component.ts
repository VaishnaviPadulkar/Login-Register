import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  editIndex: number | null = null;
  userName: string | null = null;
  selectedId: number | null = null;
  searchTerm: string = '';

  userFrm: FormGroup = new FormGroup({});
  user: any[] = [];
  // users: any[] = [];
  // editIndex: null | number = null;

  constructor(private f_d: FormBuilder, private router: Router) {
    const localuser = localStorage.getItem('loggedUser');
    if (localuser) {
      this.userName = JSON.parse(localuser).name;
    }
  }

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
  editUser(index: number) {
    this.editIndex = index;
    const user = this.user[index];
    this.userFrm.setValue({
      name: user.name,
      email: user.email,
      dob: user.dob,
      password: user.password,
    });
    // const modal = document.getElementById('exampleModal');
    // if (modal) {
    //   (modal as any).show();
    // }
  }

  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.user.splice(index, 1);
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  submit() {
    if (this.userFrm.valid) {
      const formData = this.userFrm.value;
      if (this.editIndex !== null) {
        this.user[this.editIndex] = formData;
        this.editIndex = null;
      } else {
        this.user.push(formData);
      }
      localStorage.setItem('user', JSON.stringify(this.user));
      this.userFrm.reset();
    }
  }
  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/auth']);
  }
}
