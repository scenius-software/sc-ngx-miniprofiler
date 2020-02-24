import { MiniProfilerResultChild } from './mini-profiler-result-child';

export interface MiniProfilerResultRoot {
    Id: string;
    Name: string;
    DurationMilliseconds: number;
    StartMilliseconds: number;
    Children: Array<MiniProfilerResultChild>;
}
