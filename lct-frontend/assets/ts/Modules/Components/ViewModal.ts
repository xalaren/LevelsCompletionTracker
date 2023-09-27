import {Modal} from "./Modal.ts";
import {getStatusColor, getStatusText, Level, Statuses} from "../Models/Level.ts";
import {getImagePathByDifficulty} from "../Paths.ts";
import {Progress} from "../Models/Progress.ts";

export class ViewModal extends Modal {
    private readonly level: Level;
    constructor(level: Level) {
        super('','level-view');

        this.level = level;

        this.content = `
            <section class="level-view__head">
                <img src="${getImagePathByDifficulty(this.level.difficulty)}" alt="Difficulty image" class="level-view__image difficulty-big ${level.status == Statuses.Abandoned ? 'grayscale' : ''}">
                <div class="level-view__info">
                   <div class="level-view__name-block">
                        <h2 class="level-view__name medium-40 ${level.status === Statuses.Completed ? 'stroked' : ''}">${this.level.name}</h2>
                        <p class="name-block__label label-gray">by ${this.level.author}</p>
                        <p class="name-block__status label-${getStatusColor(level.status)}" id="level-status">${getStatusText(level.status)}</p>
                    </div>
                      
                </div>
            </section>
    
            <section class="level-view__progress">
                <p class="label-black">Main progress: </p>
    
                <div class="progress-block__content">
                    <div class="content__progress-bar progress-bar">
                        <div class="progress-bar__fill" id="main-progress-fill" style="width:${this.level.mainProgress}%"></div>
                    </div>
                    <h3 class="content__progress-percent medium-30-violet-shadow" id="main-progress-count">${this.level.mainProgress}%</h3>
                </div>
    
            </section>
    
            <section class="level-view__attempt-block">
                <h3 class="medium-30-violet-shadow attempt-block__total" id="attempts-counter">${this.level.attempts} attempts</h3>
                <nav class="attempt-block__controls ${level.status == Statuses.Abandoned ? 'disabled' : ''}">
                    <input type="text" class="input-gray" id="attempts-count-input">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-attempts">Add attempts</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-attempts">Clear current</button>
                </nav>
            </section>
    
            <section class="level-view__further-progresses">
                <h3 class="medium-30">Progresses:</h3>
                <nav class="further-progresses__controls ${level.status == Statuses.Abandoned ? 'disabled' : ''}">
                    <input type="text" class="input-gray" id="progress-input">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="set-main-progress">Set main progress</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-further-progress">Add further progress</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-progresses">Clear all</button>
                </nav>
    `

        level.progressContainers.forEach(container => {
            this.content += `
                <div class="further-progresses__content">
                    <p class="label-black">${container.createdAt}</p>
                    <ul class="progresses__container">
                        ${this.getProgressItems(level.id, container.progresses)}
                    </ul>
                </div>
            `;
            }
        )


        this.content += '</section>';
    }

    private getProgressItems(levelId: number, progresses: Progress[]): string {
        let content: string = '';
        progresses.forEach(progress => {
            content += `
            <li class="progress__item">
                <h3 class="medium-20">${progress.progressText}</h3>
                <button class="progress__delete-button" data-index="${levelId}" data-innerindex="${progress.id}" data-action="progress-remove">×</button>
            </li>
            `
        });

        return content;
    }
}