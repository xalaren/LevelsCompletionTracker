import {Component} from "./Component.ts";

export class Modal extends Component {
    private contentClassName: string;
    constructor(content?: string, className?: string) {
        super(content, className);
        this.contentClassName = className ? `${className}__content` : '';
    }

    override getHTML(): string {
        return `
            <div class="modal">
            
              <div class="modal__container container ${this.className}">
            
                <button class="modal__close-button">
                  ×
                </button>
            
                <div class="modal__content ${this.contentClassName}">
                    ${this.content}
                </div>
              </div>
            </div>
        `
    }
}