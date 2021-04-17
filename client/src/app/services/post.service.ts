import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = environment.apiUrl + 'posts';
  public posts: Post[];

  constructor(private http: HttpClient, private storage: StorageService) { }

  refreshPosts() {
    this.getPosts().subscribe(result => {
      this.posts = result;
    });
  }

  pushPost(post: Post) {
    this.posts.unshift(post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url, {headers: this.getHeader()}).pipe();
  }

  updatePost(post: Post) {
    return this.http.put(this.url, post, {headers: this.getHeader()});
  }

  createPost(post: Post) {
    return this.http.post(this.url, post, {headers: this.getHeader()});
  }

  deletePost(id: number) {
    return this.http.delete(this.url + `/${id}`, {headers: this.getHeader()});
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.storage.get('token')}`});
  }
}
