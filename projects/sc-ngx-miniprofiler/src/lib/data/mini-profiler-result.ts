import { MiniProfilerResultRoot } from './mini-profiler-result-root';

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
    Root: MiniProfilerResultRoot;
    colour: string; /** set by app */
}
