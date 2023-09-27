import {Component} from "./Component.ts";

export class OutputContainer extends Component {
    constructor(text: string, className = '') {
        super(text, className);
    }
    getHTML(): string {
        return `
            <h2 class="levels-container__output medium-30 ${this.className}">
                ${this.content}
            </h2>
        `;
    }
}