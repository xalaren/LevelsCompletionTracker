// noinspection SpellCheckingInspection

import {
    createLevelQueryAsync,
    getAllLevelsQueryAsync,
    removeLevelQueryAsync,
    changeLevelStatusQueryAsync,
    changeLevelPriorityQueryAsync,
    setAttemptsQueryAsync,
    setMainProgressQueryAsync,
    clearAllProgressesQueryAsync,
    removeProgressQueryAsync, createProgressQueryAsync
} from "./server-queries.ts";
import {Level} from "./Modules/Models/Level.ts";
import {OutputContainer} from "./Modules/Components/OutputContainer.ts";
import {LevelContainer} from "./Modules/Components/LevelContainer.ts";
import {CreationModal} from "./Modules/Components/CreationModal.ts";
import {MediumLabelContainer} from "./Modules/Components/MediumLabelContainer.ts";
import {Modal} from "./Modules/Components/Modal.ts";
import {ViewModal} from "./Modules/Components/ViewModal.ts";
import {Progress} from "./Modules/Models/Progress.ts";

let levels: Level[];
let filteredLevels: Level[];

setTimeout(init, 200);

function init(): void {
    levels = [];
    filteredLevels = [];

    setupStaticEventListeners();
    updateAll().then();
}

//Levels array interactions

function mapLevelArrays(): void {
    filteredLevels = levels.slice();
}
function setFiltrationWithSearch(): void {
    const filterInput = document.getElementById('search-filter') as HTMLInputElement;
    filterLevels(filterInput.value);
}

function filterLevels(value: string) {
    value = value.toLowerCase();

    if (!levels) {
        return;
    }

    filteredLevels = levels.filter(level => {
        return level.name.toLowerCase().includes(value) || level.author.toLowerCase().includes(value);
    });

    displayLevels(filteredLevels);
}

function getLocalLevel(levelId: number): Level {
    const level = levels.find(level => level.id === levelId);

    if(!level) throw new Error('Level not found');

    return level;
}

function displayLevels(levels: Level[]) {
    clearElement('.levels__list');

    if (!levels || levels.length == 0) {
        displayMessageOutput('No levels here yet');
        return;
    }
    for (let i = 0; i < levels.length; i++) {
        const levelContainer = new LevelContainer(levels[i]);
        render('.levels__list', levelContainer.getHTML());
    }
    setupLevelsEventListeners();
}

//Interactions with results of queries
async function updateAll() {
    await loadLevelsAsync().then(mapLevelArrays).then(() => setFiltrationWithSearch());
}

async function loadLevelsAsync(): Promise<void> {
    try {
        levels = await getAllLevelsQueryAsync();
        mapLevelArrays();
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function createLevelAsync(): Promise<void> {
    const nameInput = document.getElementById('name-text-input') as HTMLInputElement;
    const authorInput = document.getElementById('author-text-input') as HTMLInputElement;
    const selectedContainer = document.querySelector('.selected') as HTMLElement;

    if (!nameInput || nameInput.value == '') {
        openMessageModal('Name was empty');
        return;
    }

    if (!authorInput) {
        return;
    }

    if (!selectedContainer || selectedContainer.innerHTML === '') {
        openMessageModal("Difficulty isn't selected");
        return;
    }

    if (!selectedContainer.dataset) {
        return;
    }

    let difficulty = selectedContainer.dataset.type;

    if(!difficulty) return;

    const level = new Level(nameInput.value, authorInput.value, difficulty);

    try {
        await createLevelQueryAsync(level).then(() => {
            clearInputs(nameInput, authorInput);
            updateAll();
        })
    }
    catch(error: any) {
        openMessageModal(error.message);
        return;
    }
}

async function changeLevelStatusAsync(levelId: number, status: string): Promise<void> {
    try {
        await changeLevelStatusQueryAsync(levelId, status).then(updateAll);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function changeLevelPriorityAsync(levelId: number, increase: boolean) {
    try {
        await changeLevelPriorityQueryAsync(levelId, increase).then(updateAll);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function removeLevelAsync(levelId: number): Promise<void> {
    try {
        await removeLevelQueryAsync(levelId).then(updateAll);
    } catch (error: any) {
        displayMessageOutput(error.message, 'red-selection');
    }
}
async function clearAttemptsAsync(levelId: number): Promise<void> {
    try {
        await setAttemptsQueryAsync(levelId, 0, false);
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);

    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function addAttemptsAsync(levelId: number):Promise<void> {
    try {
        await setAttemptsQueryAsync(levelId, getAttemptsCount(), true);
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function setMainProgressAsync(levelId: number): Promise<void> {
    try {
        await setMainProgressQueryAsync(levelId, getMainProgressCount());
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function createProgress(levelId: number): Promise<void> {
    try {
        const progressString = getProgressString();

        await createProgressQueryAsync(new Progress(progressString), levelId);
        await updateModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function removeProgress(levelId: number, progressId: number): Promise<void> {
    try {
        await removeProgressQueryAsync(progressId);
        await updateModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

async function clearProgresses(levelId: number): Promise<void> {
    try {
        await clearAllProgressesQueryAsync(levelId);
        await updateModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message);
    }
}

//Event listeners setup

function setupStaticEventListeners(): void {
    const filterInput = document.getElementById('search-filter') as HTMLInputElement;
    filterInput.addEventListener('input', setFiltrationWithSearch);

    const createButton: HTMLElement | null = document.getElementById('create-level-button');
    if (createButton) {
        createButton.addEventListener('click', openCreationModal);
    }
}

function setupLevelsEventListeners(): void {
    const containers = document.querySelectorAll('.level');
    containers.forEach(element => element.addEventListener('click', event => levelContainerInputsClickHandle(event.target as HTMLElement)))
}

function setupModalEventListeners(): void {
    const modalButtons = document.querySelectorAll(".modal__close-button");

    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modalContainer = button.closest('.modal')!;
            closeModal(modalContainer);
        });
    });
}

function setupViewModalListeners(): void {
    setupModalEventListeners();

    const modal: HTMLElement = document.querySelector('.level-view__content') as HTMLElement;
    const buttons: NodeListOf<HTMLButtonElement> = modal.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', event => viewModalInputsClickHandle(event.target as HTMLElement)))
}

function setupCreationModalEventListeners() {
    setupModalEventListeners();
    const containers: NodeListOf<HTMLElement> = document.querySelectorAll('.img-container');
    containers.forEach(container => container
        .addEventListener('click', () => selectDifficulty(containers, container)));

    const doneButton = document.getElementById('level-creation-done-button');

    if (doneButton) {
        doneButton.addEventListener('click', createLevelAsync);
    }
}

//Event handlers

interface ClickAttribute {
    index: number;
    action: string;
    innerIndex?: number;
}
function getTargetAttributes(target: HTMLElement): ClickAttribute {
    if (!target) {
        throw new Error('Target not found');
    }

    const button = target.closest('button') as HTMLButtonElement;
    if (!button || !button.hasAttribute('data-index') || !button.hasAttribute('data-action')) {
        throw new Error('Attributes not found');
    }

    let index = parseInt(button.dataset.index!);
    let action = button.dataset.action!;
    let innerIndex: number | undefined = undefined;

    if(button.hasAttribute('data-innerindex')) {
        innerIndex = parseInt(button.dataset.innerindex!);
    }

    return {
        index: index,
        action: action,
        innerIndex: innerIndex,
    };
}

function levelContainerInputsClickHandle(target: HTMLElement) {
    const attributes = getTargetAttributes(target);

    switch (attributes.action) {
        case 'remove':
            removeLevelAsync(attributes.index).then();
            break;
        case 'drop':
            changeLevelStatusAsync(attributes.index, 'abandoned').then();
            break;
        case 'continue':
            changeLevelStatusAsync(attributes.index, 'active').then();
            break;
        case 'view':
            openViewModal(attributes.index);
            break;
        case 'increasePriority':
            changeLevelPriorityAsync(attributes.index, true).then();
            break;
        case 'decreasePriority':
            changeLevelPriorityAsync(attributes.index, false).then();
            break;
    }
}

function viewModalInputsClickHandle(target: HTMLElement) {
    const attributes = getTargetAttributes(target);

    switch(attributes.action) {
        case 'clear-attempts':
            clearAttemptsAsync(attributes.index).then();
            break;
        case 'add-attempts':
            addAttemptsAsync(attributes.index).then();
            break;
        case 'set-main-progress':
            setMainProgressAsync(attributes.index).then();
            break;
        case 'clear-progresses':
            clearProgresses(attributes.index).then();
            break;
        case 'progress-remove':
            removeProgress(attributes.index, attributes.innerIndex!).then();
            break;
        case 'add-further-progress':
            createProgress(attributes.index).then();
            break;
    }
}


//Modals interactions

function displayMessageOutput(text: string, messageColor?: string): void {
    if (text.length == 0) {
        return;
    }

    let container = new OutputContainer(text, messageColor);
    clearElement('.levels__list');
    render('.levels__list', container.getHTML());
}
function openMessageModal(message: string) {
    const labelContainer = new MediumLabelContainer(message);
    const modalContainer = new Modal(labelContainer.getHTML());

    render('.page', modalContainer.getHTML());
    setupModalEventListeners();
}

function openCreationModal() {
    const container = new CreationModal();
    render('.page', container.getHTML());
    setupCreationModalEventListeners();
}
function openViewModal(id: number) {
    let level = levels.find(level => level.id === id);

    if(!level) return;

    let viewModal = new ViewModal(level);

    render('.page', viewModal.getHTML());
    setupViewModalListeners();
}

function closeModal(target: Element | HTMLElement): void {
    target.remove();
}

async function updateModalLevelInfo(levelId: number): Promise<void> {
    try {
        await updateAll();

        const level = getLocalLevel(levelId);

        let viewModalContent = document.querySelector('.level-view__content');
        const viewModal = new ViewModal(level);

        if (!viewModalContent) return;

        let progressInputText = getProgressString();
        viewModalContent.innerHTML = viewModal.getContent();

        setProgressString(progressInputText);
        setupViewModalListeners();
    }
    catch (error: any) {
        openMessageModal(error.message);
    }
}

//DOM

function render(className: string, innerHTML: string): void {
    const element = document.querySelector(className);

    if (!element) {
        return;
    }

    element.insertAdjacentHTML('beforeend', innerHTML);
}

function clearElement(className: string): void {
    const element = document.querySelector(className);
    if (!element) {
        return;
    }

    element.innerHTML = '';
}

function clearInputs(...elements: HTMLInputElement[]): void {
    elements.forEach(element => element.value = '');
}

function selectDifficulty(containers: NodeListOf<Element>, target: HTMLElement) {
    containers.forEach(container => container.classList.remove('selected'));
    target.classList.add('selected');
}

function getAttemptsCount(): number {
    const attemptsString = (document.getElementById('attempts-count-input') as HTMLInputElement).value;

    if(!isNum(attemptsString)) {
        openMessageModal('Fill correct attempts count');
        return 0;
    }

    return parseInt(attemptsString);
}

function getMainProgressCount(): number {
    const progressString = getProgressString();

    if(!validateProgressInput(progressString)) {
        throw new Error('Fill correct progress count');
    }

    return parseInt(progressString);
}

function getProgressString(): string {
    return (document.getElementById('progress-input') as HTMLInputElement).value;
}

function setProgressString(text: string): void {
    (document.getElementById('progress-input') as HTMLInputElement).value = text;
}

//Validators
function validateProgressInput(value: string): boolean {
    value = value.replace("\s", "").replace("%", "");

    return /^\d{1,3}$/.test(value);
}

function isNum(value: string): boolean {
    return /\d+/.test(value);
}



