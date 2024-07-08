import { CircleRun } from "./Modules/Models/CircleRun.ts";
import { Level } from "./Modules/Models/Level";
import {Progress} from "./Modules/Models/Progress.ts";

const url: string = '/api/';

export async function shutdownServer(): Promise<void> {
    const endpointName = 'shutdown';
    try {
        await fetch(url + endpointName,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

    }
    catch (error: any) {
        throw new Error(error.message);
    }
}


export async function getLevelQueryAsync(levelId: number): Promise<Level | undefined> {
    const endpointName: string = 'LevelController/get?id=' + levelId;
    let level: Level | undefined = undefined;

    try {
        const serverResponse = await fetch(url + endpointName);

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
                level = data.value;
            });

        return level;
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getAllLevelsQueryAsync(): Promise<Level[]> {
    const endpointName: string = 'LevelController/get-all';
    let levels: Level[] = [];

    try {
        const serverResponse = await fetch(url + endpointName);

        await serverResponse.json()
           .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
                levels = data.value;
           });
    }
    catch (error: any) {
        throw new Error(error.message);
    }

    return levels;
}

export async function createLevelQueryAsync(level: Level): Promise<void> {
    const endpointName: string = 'LevelController/create';

    try {
        const serverResponse = await fetch(url + endpointName,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(level),
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function removeLevelQueryAsync(levelId: number) {
    const endpointName: string = 'LevelController/remove';

    try {
        const serverResponse = await fetch(`${url}${endpointName}?id=${levelId}`,
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(levelId),
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function changeLevelStatusQueryAsync(id: number, status: string) {
    const endpointName: string = 'LevelController/change-status';

    try {
        const serverResponse = await fetch(`${url}${endpointName}?id=${id}&state=${status}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function changeLevelPriorityQueryAsync(id: number, increase: boolean) {
    const endpointName: string = 'LevelController/change-priority';
    try {
        const serverResponse = await fetch(`${url}${endpointName}?id=${id}&increase=${increase}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function setAttemptsQueryAsync(id: number, attempts: number, append: boolean) {
    const endpointName: string = 'LevelController/set-attempts';
    try {
        const serverResponse = await fetch(`${url}${endpointName}?id=${id}&attempts=${attempts}&append=${append}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function setMainProgressQueryAsync(id: number, progress: number) {
    const endpointName: string = 'LevelController/set-main-progress';
    try {
        const serverResponse = await fetch(`${url}${endpointName}?id=${id}&progress=${progress}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createProgressQueryAsync(progress: Progress, levelId: number) {
    const endpointName: string = `ProgressController/create`;
    try {
        const serverResponse = await fetch(`${url}${endpointName}?levelId=${levelId}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(progress),
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function removeProgressQueryAsync(progressId: number) {
    const endpointName: string = `ProgressController/remove`;
    try {
        const serverResponse = await fetch(`${url}${endpointName}?progressId=${progressId}`,
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function clearAllProgressesQueryAsync(levelId: number) {
    const endpointName: string = `ProgressController/remove-all`;
    try {
        const serverResponse = await fetch(`${url}${endpointName}?levelId=${levelId}`,
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createCircleRunQueryAsync(circleRun: CircleRun) {
    const endpointName: string = `CircleRunController/create`;
    try {
        const serverResponse = await fetch(`${url}${endpointName}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(circleRun),
            });

        await serverResponse.json()
            .then(data => {
                if(data.error) {
                    throw new Error(data.resultMessage);
                }
            });
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}
