import { Router } from '@angular/router';
import { passwordValidator } from './../password.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';
import { LoginResponse } from '../login-response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  signupToggle = false;

  constructor(private loginService: LoginService, private storage: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z]+[a-z0-9]*$'),
        Validators.maxLength(15),
        Validators.minLength(5),
      ]),
      password: new FormControl('', [Validators.required]),
    });
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z]+[a-z0-9]*$'),
        Validators.maxLength(15),
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordValidator });
  }

  ngAfterViewChecked(): void {
    if (this.loginService.loggedIn === true) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.loginForm.get('username').invalid) {
      alert('Please enter proper username');
      return;
    } else if (this.loginForm.get('password').invalid) {
      alert('Please enter password');
      return;
    }
    this.loginService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe({
      next: (res: LoginResponse) => {
        this.storage.set('token', res.token);
        this.storage.set('username', res.username);
        this.router.navigate(['/']);
      },
      error(err) {
        alert('Login failed!');
      }
    });
  }

  signup() {
    if (this.signupForm.get('username').invalid) {
      alert('Please enter proper username');
    } else if (this.signupForm.get('password').invalid) {
      alert('Please enter proper password');
    } else if (this.signupForm.invalid) {
      alert('Passwords do not match.');
    }
    this.loginService.signup(this.signupForm.get('username').value, this.signupForm.get('password').value).subscribe({
      next: (res) => {
        this.signupToggle = false;
        this.signupForm.reset();
      },
      error(err) {
        console.log(err);
      }
    });
  }
}
