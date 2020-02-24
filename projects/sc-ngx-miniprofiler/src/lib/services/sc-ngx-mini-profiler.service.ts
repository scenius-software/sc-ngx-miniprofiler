import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { MiniProfilerResult } from '../data/mini-profiler-result';
import { ScNgxMiniProfilerOptions } from './sc-ngx-mini-profiler-options';

@Injectable({
  providedIn: 'root'
})
export class ScNgxMiniProfilerService {

  private _miniProfilerIds = [];
  idUpdated = new EventEmitter<Array<string>>();

  constructor(private _http: HttpClient, private options: ScNgxMiniProfilerOptions) {
  }

  SetIds(ids: Array<string>) {
    if (this._miniProfilerIds !== ids) {
      this._miniProfilerIds = ids;
      this.idUpdated.emit(this._miniProfilerIds);
    }
  }

  getDataForId(ids: Array<string>): Observable<Array<MiniProfilerResult>> {
    const headers: HttpHeaders = new HttpHeaders({Accept: 'application/json'});

    const requests: Array<Observable<MiniProfilerResult>> = [];
    for (const id of ids) {
      const apiCall = `${this.options.api}/results?id=${id}`;
      requests.push(this._http.get<MiniProfilerResult>(apiCall, {headers, responseType: 'json'}));
    }

    return forkJoin(requests);
  }
}

