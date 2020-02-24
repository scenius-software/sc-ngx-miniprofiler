import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScNgxMiniProfilerService } from '../services/sc-ngx-mini-profiler.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ScNgxMiniProfilerInterceptor implements HttpInterceptor {
  constructor(private _profilerService: ScNgxMiniProfilerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        const headers = event.headers.getAll('x-miniprofiler-ids');
        if (!headers) {
          return;
        }

        headers.forEach(miniprofilerIdHeader => {
          const ids = JSON.parse(miniprofilerIdHeader) as string[];
          if (ids.length > 0) {
            this._profilerService.SetIds(ids);
          }
        });
      }
    }));
  }
}
