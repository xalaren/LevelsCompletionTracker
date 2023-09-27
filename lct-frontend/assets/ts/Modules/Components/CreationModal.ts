import {Modal} from "./Modal.ts";
import {getImagePathByDifficulty} from "../Paths.ts";
import {Difficulties} from "../Models/Level.ts";
export class CreationModal extends Modal {
    constructor() {
        const content: string = `

          <div class="level-creation__name-block">
            <p class="name-block__label label-gray">Name:</p>
            <input id="name-text-input" class="input-gray" type="text">
          </div>
          
          <div class="level-creation__author-block">
            <p class="author-block__label label-gray">Author:</p>
            <input id="author-text-input" class="input-gray" type="text">
          </div>
    
          <div class="level-creation__difficulty-block">
            <p class="difficulty-block__label label-gray">Difficulty:</p>
            <div class="difficulty-block__selector">
              <div class="img-container" data-type="${Difficulties.Easy}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.Easy)}" alt="Easy">
              </div>
              <div class="img-container" data-type="${Difficulties.Normal}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.Normal)}" alt="Normal">
              </div>
              <div class="img-container" data-type="${Difficulties.Hard}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.Hard)}" alt="Hard">
              </div>
              <div class="img-container" data-type="${Difficulties.Harder}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.Harder)}" alt="Harder">
              </div>
              <div class="img-container" data-type="${Difficulties.Insane}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.Insane)}" alt="Insane">
              </div>
              <div class="img-container" data-type="${Difficulties.EasyDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.EasyDemon)}" alt="Easy Demon">
              </div>
              <div class="img-container" data-type="${Difficulties.MediumDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.MediumDemon)}" alt="Medium Demon">
              </div>
              <div class="img-container" data-type="${Difficulties.HardDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.HardDemon)}" alt="Hard Demon">
              </div>
              <div class="img-container" data-type="${Difficulties.InsaneDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.InsaneDemon)}" alt="Insane Demon">
              </div>
              <div class="img-container" data-type="${Difficulties.ExtremeDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${getImagePathByDifficulty(Difficulties.ExtremeDemon)}" alt="Extreme Demon">
              </div>
    
            </div>
          </div>
    
          <nav class="level-creation__buttons">
            <button id="level-creation-done-button" class="violet-tp">Done</button>
          </nav>
        `;

        super(content, 'level-creation');
    }
}