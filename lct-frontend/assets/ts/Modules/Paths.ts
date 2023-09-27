export function getImagesPath(): string {
    return '/assets/img/';
}

export function getImagePathByDifficulty(difficulty: string): string {
    return getImagesPath() + difficulty + '.png';
}