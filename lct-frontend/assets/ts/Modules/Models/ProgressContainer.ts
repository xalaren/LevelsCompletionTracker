import {Progress} from "./Progress.ts";
export interface ProgressContainer {
    id: number;
    levelId: number;
    createdAt: string;
    progresses: Progress[];
}