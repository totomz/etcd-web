import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EtcdappService {

  constructor(private http: HttpClient) { }

  getKeys(): Promise<string[]> {
    return this.http.get<string[]>(`${environment.apiBaseUrl}/etcd/keys`).toPromise().then(keys => {
      return keys.sort();
    });
  }

  getValue(key: string): Observable<any> {
    return this.http.get<string>(`${environment.apiBaseUrl}/etcd/value`, {params: {key}});
  }

}
