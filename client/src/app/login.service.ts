import { PostsService } from './posts.service';
import { StorageService } from './storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080/';
  loggedIn = false;

  constructor(private http: HttpClient, private storage: StorageService, private postService: PostsService) { }

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
