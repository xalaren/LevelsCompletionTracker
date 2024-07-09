import { Component } from "./Component";

export class PopupLoader extends Component {
    constructor() {
        const content: string = `
            <div class="popup-loader">
                <div class="popup-loader__container">
                    <div class="loader"></div>
                </div>
            </div>
        `;

        super(content, 'popup-loader');
    }
}