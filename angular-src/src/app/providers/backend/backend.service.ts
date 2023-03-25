import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forEach, isUndefined } from 'lodash';
import { environment as AppConfig } from '../../../environments/environment';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private http: HttpClient) { }

  get(route, queryParam: any = {}, moreHeaderOptions = {}) {
    const headers = this.headers(moreHeaderOptions);
    const Params = this.QueryParamHelper(queryParam);
    return this.http.get<Response>(`${AppConfig.API_URL}${route}`, { headers, params: Params, withCredentials: true });
  }

  post(route, params, queryParam = {}, moreHeaderOptions = {}) {
    const headers = this.headers(moreHeaderOptions);
    const qParams = this.QueryParamHelper(queryParam);
    return this.http.post<Response>(`${AppConfig.API_URL}${route}`, params, { headers, params: qParams, withCredentials: true });
  }

  put(route, params, queryParam = {}, moreHeaderOptions = {}) {
    const headers = this.headers(moreHeaderOptions);
    const qParams = this.QueryParamHelper(queryParam);
    return this.http.put<Response>(`${AppConfig.API_URL}${route}`, params, { headers, params: qParams, withCredentials: true });
  }

  patch(route, params, queryParam = {}, moreHeaderOptions = {}) {
    const headers = this.headers(moreHeaderOptions);
    const qParams = this.QueryParamHelper(queryParam);
    return this.http.patch<Response>(`${AppConfig.API_URL}${route}`, params, { headers, params: qParams, withCredentials: true });
  }

  delete(route, queryParam = {}, moreHeaderOptions = {}) {
    const headers = this.headers(moreHeaderOptions);
    const qParams = this.QueryParamHelper(queryParam);
    return this.http.delete<Response>(`${AppConfig.API_URL}${route}`, { headers, params: qParams, withCredentials: true });
  }

  private headers(options = {}) {
    const header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return header;
  }

  private handleError(err) {
    return Observable.throw(err.error.meta.message || 'Server error');
  }

  private QueryParamHelper(queryParam = {}) {
    let Params = new HttpParams();
    if (!isUndefined(queryParam)) {
      forEach(queryParam, (v, k) => {
        Params = Params.append(k, v);
      });
    }
    return Params;
  }
}

