import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { MiniProfilerResult, ProcessedMiniProfilerResult } from '../data/mini-profiler-result';
import { ScNgxMiniProfilerOptions } from './sc-ngx-mini-profiler-options';
import { map } from 'rxjs/operators';
import { MiniProfilerResultChild } from 'projects/sc-ngx-miniprofiler/src/lib/data/mini-profiler-result-child';

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

  getDataForId(ids: Array<string>): Observable<Array<ProcessedMiniProfilerResult>> {
    const flattenNetCoreThreeRequestFormat = (results: Array<MiniProfilerResultChild>, current: MiniProfilerResultChild) => {
      let localResults = results.concat([ current ]);
      if(current.Children) {
        for(const c of current.Children) {
          localResults = flattenNetCoreThreeRequestFormat(localResults, c);
        }
      }
      return localResults;
    }
    return new Observable<Array<ProcessedMiniProfilerResult>>((obs) => {
      const headers: HttpHeaders = new HttpHeaders({ Accept: 'application/json' });
      const requests: Array<unknown> = [];
      for (const id of ids) {
        const apiCall = `${this.options.api}/results?id=${id}`;
        requests.push(this._http.get<MiniProfilerResult>(apiCall, { headers, responseType: 'json' }).pipe(map(x => x)));
      }
       forkJoin(requests).subscribe((result: Array<MiniProfilerResult>) => {
         // .pipe(map(x => flattenNetCoreThreeRequestFormat([], x)))
         const newResult = result.map(x => ({
           DurationMilliseconds: x.DurationMilliseconds,
           colour: x.colour,
           FlattenedChildren: flattenNetCoreThreeRequestFormat([], x.Root),
           HasUserViewed: x.HasUserViewed,
           Id: x.Id,
           MachineName: x.MachineName,
           Name: x.Name,
           Started: x.Started,
           User: x.User
         } as ProcessedMiniProfilerResult));
         obs.next(newResult);
         obs.complete();
       })
    });
  }
}

