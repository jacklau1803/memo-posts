import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginResponse } from './model/login-response';
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Memo Posts';
  loginSubscription: Subscription;
  constructor(public storage: StorageService, public login: LoginService, public router: Router) {}

  ngOnInit(): void {
    const token = this.storage.get('token');
    if (token && token !== '') {
      this.loginSubscription = this.login.verify(token).subscribe({
        next: (res: LoginResponse) => {
          this.storage.set('username', res.username);
          this.login.loggedIn = true;
        },
        error: (err) => {
          console.log(err);
          this.login.loggedIn = false;
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
