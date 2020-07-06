import { MiniProfilerResultChild } from './mini-profiler-result-child';

export interface MiniProfilerResult {
    /**
     * Unique request ID
     */
    Id: string;

    /**
     * API Endpoint
     */
    Name: string;

    Started: Date;
    DurationMilliseconds: number;
    MachineName: string;
    User: string;
    HasUserViewed: boolean;
    Root: MiniProfilerResultChild;
    colour: string; /** set by app */
}

export interface ProcessedMiniProfilerResult {
  /**
   * Unique request ID
   */
  Id: string;

  /**
   * API Endpoint
   */
  Name: string;

  Started: Date;
  DurationMilliseconds: number;
  MachineName: string;
  User: string;
  HasUserViewed: boolean;
  FlattenedChildren: Array<MiniProfilerResultChild>
  colour: string; /** set by app */

}
