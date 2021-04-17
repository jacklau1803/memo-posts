import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  loggedIn = false;

  constructor(private http: HttpClient, private storage: StorageService, private postService: PostService) { }

  login(username, password) {
    return this.http.post(this.url + `login?username=${username}&password=${password}`, {});
  }

  verify(token: string) {
    return this.http.post(this.url + `verify/${token}`, {});
  }

  signup(username, password) {
    return this.http.post(this.url + 'users', {username, password});
  }

  logout() {
    this.loggedIn = false;
    this.storage.clear();
    this.postService.posts = [];
  }
}
