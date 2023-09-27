import {Component} from "./Component.ts";

export class MediumLabelContainer extends Component {
    constructor(text: string, className = '') {
        super(text, className);
    }
    getHTML(): string {
        return `
            <h2 class='medium-20 mr-40 ${this.className || ''}'>
                ${this.content}
            </h2>
        `;
    }
}