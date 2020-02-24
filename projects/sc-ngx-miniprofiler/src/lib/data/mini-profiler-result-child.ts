import { MiniProfilerCustomTiming } from './mini-profiler-custom-timing';

export interface MiniProfilerResultChild {
    Id: string;
    Name: string;
    DurationMilliseconds: number;
    StartMilliseconds: number;
    CustomTimings: MiniProfilerCustomTiming;
}
