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
    return this.http.get(`${environment.apiBaseUrl}/etcd/value`, {params: {key}, responseType: 'text' });
  }

  putKeyValue(key: string, value: string):Observable<any> {
    return this.http.put<string>(`${environment.apiBaseUrl}/etcd/keyvalue`, {key, value});
  }


  deleteKey(key: any) {
    return this.http.delete<string>(`${environment.apiBaseUrl}/etcd/key` ,{params: {key}});
  }
}
