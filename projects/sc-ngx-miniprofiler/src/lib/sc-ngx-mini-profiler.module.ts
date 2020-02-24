import { NgModule } from '@angular/core';
import { ScNgxMiniProfilerComponent } from './components/profiler/miniprofiler.component';
import { CommonModule } from '@angular/common';
import { ScNgxMiniProfilerInterceptor } from './guards/sc-ngx-mini-profiler-interceptor.service';



@NgModule({
  declarations: [ScNgxMiniProfilerComponent],
  imports: [
    CommonModule
  ],
  providers: [
    ScNgxMiniProfilerInterceptor
  ],
  exports: [ ScNgxMiniProfilerComponent ]
})
export class ScNgxMiniProfilerModule { }
