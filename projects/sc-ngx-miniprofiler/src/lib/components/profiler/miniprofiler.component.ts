import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScNgxMiniProfilerService } from '../../services/sc-ngx-mini-profiler.service';
import { ProcessedMiniProfilerResult } from '../../data/mini-profiler-result';

@Component({
  selector: 'sc-ngx-miniprofiler-profiler',
  templateUrl: './miniprofiler.component.html',
  styleUrls: ['./miniprofiler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScNgxMiniProfilerComponent {
  profilerData: ProcessedMiniProfilerResult[] = [];
  /**
   * API calls from up to x amount of seconds ago will be displayed. Defaults to 5.
   */
  @Input() cacheSeconds = 5;

  /**
   * Repeating palette to use for colour coding.
   */
  @Input() palette = [
    '#8ac6d1',
    '#bbded6',
    '#fae3d9',
    '#ffb6b9'
  ];

  constructor(private _profilerService: ScNgxMiniProfilerService, private _sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {
    _profilerService.idUpdated.subscribe(id => {
      this._profilerService.getDataForId(id).subscribe(profilerData => {
        // Delete anything older than 5 sec
        let newData = this.profilerData.filter(x => new Date(x.Started).getTime() + (this.cacheSeconds * 1000) >= (new Date()).getTime());
        newData = newData.concat(profilerData
          .slice(1))
          .sort((x,y) => (new Date(x.Started).getTime() - new Date(y.Started).getTime()))
          .reverse()
          .map((x, i) => ({...x, ...{colour: this.palette[i % this.palette.length]}}));
        this.profilerData = newData;
        cd.markForCheck();
      });
    });
  }

}
