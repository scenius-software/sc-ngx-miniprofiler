export interface MiniProfilerSqlCustomTiming {
    Id: string;
    CommandString: string;
    ExecuteType: string;
    StackTraceSnippet: string;
    StartMilliseconds: number;
    DurationMilliseconds: number;
    Errored: boolean;
}
