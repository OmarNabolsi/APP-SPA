import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'http://localhost:5000/api/posts/';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.baseUrl);
  }

  getPost(id: number) {
    return this.http.get(this.baseUrl + id);
  }

  createPost(post: Post) {
    return this.http.post(this.baseUrl, post);
  }

  updatePost(id: number, post: Post) {
    return this.http.put(this.baseUrl + id, post);
  }

  deletePost(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
