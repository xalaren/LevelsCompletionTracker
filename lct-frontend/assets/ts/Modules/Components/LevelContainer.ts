import {Component} from "./Component.ts";
import {getStatusColor, getStatusText, Level} from "../Models/Level.ts";
import {getImagePathByDifficulty} from "../Paths.ts";

export class LevelContainer extends Component {
    readonly level: Level;
    private readonly grayscale;
    private readonly stroked;
    private readonly action: string;
    constructor(level: Level) {
        super();

        this.level = level;
        this.grayscale = level.status === 'abandoned' ? 'grayscale' : '';
        this.stroked = level.status === 'completed' ? 'stroked': '';
        this.action = this.level.status === 'abandoned' ? 'Continue' : 'Drop';

        const shortName = level.name;

        this.content = `
        <div class="level__difficulty-block ${this.grayscale}">
            <img src="${getImagePathByDifficulty(this.level.difficulty).toString()}" alt="Difficulty image" class="difficulty-block__image difficulty-small">
        </div>
        <div class="level__left-block">
            <div class="left-block__name-block">
                <p class="name-block__label label-gray">Name:</p>
                <div class="name-block__name-info">
                    <h3 class="name-block__name medium-30 ${this.stroked}">${shortName}</h3>
                    <p class="name-block__label label-gray">by ${this.level.author}</p>
                </div>
            </div>
            <p class="name-block__status label-${getStatusColor(this.level.status)}">${getStatusText(this.level.status)}</p>
        </div >
        <div class="level__progress-block">
            <div class="progress-block__head">
                <p class="progress-block__label label-gray">Main progress:</p>

                <div class="progress-block__controls">
                    <button class="violet-small-tp-rounded" data-index="${this.level.id}" data-action='view'>View</button>
                    <button class="${this.level.status === 'abandoned' ? 'green' : 'orange'}-small-tp-rounded" data-index="${this.level.id}" data-action=${this.action.toLowerCase()}>
                        ${this.action}
                    </button>
                    <button class="red-small-tp-rounded" data-index="${this.level.id}" data-action='remove'>Remove</button>
                </div>
            </div>

            <div class="progress-block__content ${this.grayscale}">
                <div class="content__progress-bar progress-bar">
                    <div class="progress-bar__fill" style="width:${this.level.mainProgress}%"></div>
                </div>
                <h3 class="content__progress-percent medium-30-violet-shadow">${this.level.mainProgress}%</h3>
            </div>

            <div class="progress-block__bottom ${this.grayscale}">  
                <div class="bottom__attempts-counter">
                    <p class="attempts-label label-violet">${this.level.attempts} attempts</p>
                    <p class="attempts-label label-violet">${this.level.circleRunsTotalCount} circle runs</p>
                </div>
                <div class="bottom__controls">
                    <button class="down-arrow-button arrow-button" data-index="${this.level.id}" data-action="decreasePriority">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                            <path
                                d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301997 1.66667 1.26425 -1.46309e-06 2.80385 -1.32849e-06L13.1962 -4.19966e-07C14.7358 -2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z"
                                fill="#D6C2FF" />
                        </svg>
                    </button>
                    <button class="up-arrow-button arrow-button" data-index="${this.level.id}" data-action="increasePriority">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                            <path
                                d="M6.26795 1C7.03775 -0.333332 8.96225 -0.333334 9.73205 0.999999L14.9282 10C15.698 11.3333 14.7358 13 13.1962 13H2.80385C1.26425 13 0.301996 11.3333 1.0718 10L6.26795 1Z"
                                fill="#D6C2FF" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        `;
    }
    getHTML(): string {
        return `
        <li class="levels__item level" id="levelblock-${this.level.id}">
            ${this.content}
        </li >
        `
    }
}