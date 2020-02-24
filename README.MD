# Scenius Angular MiniProfiler Component
[![npm](https://img.shields.io/npm/v/sc-ngx-miniprofiler?style=for-the-badge)](https://www.npmjs.com/package/sc-ngx-miniprofiler)

Angular Component for displaying MiniProfiler results. Works with default MiniProfiler & EF Core profiling. Works by extracting the `x-miniprofiler-ids` header value,
and making API calls to miniprofiler endpoints.

## Demo
![Demo](https://i.imgur.com/DN3C61T.png)

##### HTML
Include the `sn-ngx-miniprofiler-profiler` component where you want to render the results.
```html
<sc-ngx-miniprofiler-profiler id="profiler" [style.display]="showProfiler ? '' : 'none'"
                              [cacheSeconds]="5" [palette]="['#8ac6d1', '#bbded6', '#fae3d9', '#ffb6b9']">

</sc-ngx-miniprofiler-profiler>
```

##### TypeScript
Configure the miniprofiler API endpoint and use the http interceptor.

###### app.module.ts
```typescript
providers: [
    ...
    {provide: HTTP_INTERCEPTORS, useClass: ScNgxMiniProfilerInterceptor, multi: true},
    {provide: ScNgxMiniProfilerOptions, useValue: {
      api: '/api/profiler/'
      }},
    ...
],

```
