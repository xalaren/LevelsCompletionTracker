import {ProgressContainer} from "./ProgressContainer.ts";

export class Level {
    id: number;
    name: string;
    author: string;
    attempts: number;
    priority: number;
    mainProgress: number;
    difficulty: string;
    status: Statuses;
    progressContainers: ProgressContainer[];
    constructor(name: string, author: string,
                difficulty: string, status:Statuses = Statuses.Active) {
        this.id = 0;
        this.name = name;
        this.author = author;
        this.attempts = 0;
        this.difficulty = difficulty;
        this.status = status;
        this.mainProgress = 0;
        this.priority = 0;

        this.progressContainers = [];
    }
}

export enum Difficulties {
    Easy = 'easy',
    Normal = 'normal',
    Hard = 'hard',
    Harder = 'harder',
    Insane = 'insane',
    EasyDemon = 'easy-demon',
    MediumDemon = 'medium-demon',
    HardDemon = 'hard-demon',
    InsaneDemon = 'insane-demon',
    ExtremeDemon = 'extreme-demon',
    Default = 'na',
}

export enum Statuses {
    Active = 'active',
    Abandoned = 'abandoned',
    Completed = 'completed',
}

export function getStatusColor(status: string): string {
    switch (status) {
        case 'active':
            return 'green';
        case 'abandoned':
            return 'orange';
        default:
            return 'black';
    }    }

export function getStatusText(status: string): string {
    switch (status) {
        case 'active':
            return 'Active';
        case 'abandoned':
            return 'Abandoned';
        case 'completed':
            return 'Completed';
        default:
            return 'N/A';
    }
}
