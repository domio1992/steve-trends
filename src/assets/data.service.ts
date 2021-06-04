import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  async getData() {
    return await import('./data.json');
  }
}
