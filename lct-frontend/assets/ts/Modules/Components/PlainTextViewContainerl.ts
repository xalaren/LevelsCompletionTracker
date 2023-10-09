import {ProgressContainer} from "../Models/ProgressContainer.ts";
import {Component} from "./Component.ts";

export class PlainTextContainer extends Component {
    constructor(progressContainers: ProgressContainer[]) {
        super('', 'outfit-20-gray-regular');

        progressContainers.forEach(container => {
            this.content += container.createdAt + '<br/><br/>';

            container.progresses.forEach(progress => {
               this.content += progress.progressText + '<br/>' ;
            });

            this.content += '<br/>';
        })
    }
}