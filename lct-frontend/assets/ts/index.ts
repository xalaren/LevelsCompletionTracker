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
    removeProgressQueryAsync, createProgressQueryAsync, shutdownServer,
    createCircleRunQueryAsync,
    removeCircleRunQueryAsync,
    removeAllCircleRunsFromLevelQueryAsync
} from "./server-queries.ts";
import { Level } from "./Modules/Models/Level.ts";
import { OutputContainer } from "./Modules/Components/OutputContainer.ts";
import { LevelContainer } from "./Modules/Components/LevelContainer.ts";
import { CreationModal } from "./Modules/Components/CreationModal.ts";
import { MediumLabelContainer } from "./Modules/Components/MediumLabelContainer.ts";
import { Modal } from "./Modules/Components/Modal.ts";
import { ViewModal } from "./Modules/Components/ViewModal.ts";
import { Progress } from "./Modules/Models/Progress.ts";
import { PlainTextContainer } from "./Modules/Components/PlainTextViewContainerl.ts";
import { CircleRunsViewModal } from "./Modules/Components/CircleRunsViewModal.ts";
import { CircleRun } from "./Modules/Models/CircleRun.ts";
import { PopupLoader } from "./Modules/Components/PopupLoader.ts";

let levels: Level[];
let filteredLevels: Level[];

setTimeout(init, 200);

function init(): void {
    levels = [];
    filteredLevels = [];

    setupStaticEventListeners();
    updateAll();
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

    if (!level) throw new Error('Level not found');

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
        openMessageModal(error.message, 'error-message');
    }
}

async function createLevelAsync(): Promise<void> {
    const nameInput = document.getElementById('name-text-input') as HTMLInputElement;
    const authorInput = document.getElementById('author-text-input') as HTMLInputElement;
    const selectedContainer = document.querySelector('.selected') as HTMLElement;

    if (!nameInput || nameInput.value == '') {
        openMessageModal('Name was empty', 'error-message');
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

    if (!difficulty) return;

    const level = new Level(nameInput.value, authorInput.value, difficulty);

    try {
        await createLevelQueryAsync(level).then(() => {
            clearInputs(nameInput, authorInput);
            updateAll();
        })
    }
    catch (error: any) {
        openMessageModal(error.message, 'error-message');
        return;
    }
}

async function changeLevelStatusAsync(levelId: number, status: string): Promise<void> {
    try {
        activateLoader();
        await changeLevelStatusQueryAsync(levelId, status);
        closeLoader();
        updateAll();
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function changeLevelPriorityAsync(levelId: number, increase: boolean) {
    try {
        await changeLevelPriorityQueryAsync(levelId, increase).then(updateAll);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function removeLevelAsync(levelId: number): Promise<void> {
    try {
        activateLoader();
        await removeLevelQueryAsync(levelId).then(updateAll);
        closeLoader();
    } catch (error: any) {
        displayMessageOutput(error.message, 'red-selection');
    }
}
async function clearAttemptsAsync(levelId: number): Promise<void> {
    try {
        activateLoader();
        await setAttemptsQueryAsync(levelId, 0, false);
        closeLoader();
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);

    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function addAttemptsAsync(levelId: number): Promise<void> {
    try {
        await setAttemptsQueryAsync(levelId, getAttemptsCount('attempts-count-input'), true);
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function setAttemptsAsync(levelId: number): Promise<void> {
    try {
        await setAttemptsQueryAsync(levelId, getAttemptsCount('attempts-count-input'), false);
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);
    }
    catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function setMainProgressAsync(levelId: number): Promise<void> {
    try {
        activateLoader();
        await setMainProgressQueryAsync(levelId, getMainProgressCount());
        closeLoader();
        await updateModalLevelInfo(levelId);
        clearInputs(document.getElementById('attempts-count-input') as HTMLInputElement);
    } catch (error: any) {
        closeLoader();
        openMessageModal(error.message, 'error-message');
    }
}

async function createProgress(levelId: number): Promise<void> {
    try {
        const progressString = getProgressString('progress-input');
        await createProgressQueryAsync(new Progress(progressString), levelId);
        await updateModalLevelInfo(levelId);
    } catch (error: any) {
        closeLoader();
        openMessageModal(error.message, 'error-message');
    }
}

async function removeProgress(levelId: number, progressId: number): Promise<void> {
    try {
        await removeProgressQueryAsync(progressId);
        await updateModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function getProgressesAsPlainText(levelId: number): Promise<void> {
    try {
        const progressContainers = getLocalLevel(levelId).progressContainers;

        const container = new PlainTextContainer(progressContainers);
        openMessageModal(container.getHTML());
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function clearProgresses(levelId: number): Promise<void> {
    try {
        activateLoader();
        await clearAllProgressesQueryAsync(levelId);
        closeLoader();
        await updateModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function shutdownApplication(): Promise<void> {
    try {
        window.location.href = '../../assets/pages/blank.html';
        await shutdownServer();
        window.close();
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function addRun(levelId: number): Promise<void> {
    try {
        const attempts = getAttemptsCount('cr-attempts-input');
        clearInputs(document.getElementById('cr-attempts-input') as HTMLInputElement);

        const circleRun: CircleRun = {
            id: 0,
            attempts: attempts,
            count: 0,
            levelId: levelId,
            createdAt: new Date(),
        };

        await createCircleRunQueryAsync(circleRun);
        await updateCircleRunModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function removeCircleRun(levelId: number, circleRunId: number): Promise<void> {
    try {
        await removeCircleRunQueryAsync(circleRunId);
        await updateCircleRunModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function clearCircleRuns(levelId: number): Promise<void> {
    try {
        activateLoader();
        await removeAllCircleRunsFromLevelQueryAsync(levelId);
        closeLoader();
        await updateCircleRunModalLevelInfo(levelId);
    } catch (error: any) {
        openMessageModal(error.message, 'error-message');
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

    const shutdownButton: HTMLElement | null = document.getElementById('shutdown-button');

    if (shutdownButton) {
        shutdownButton.addEventListener('click', shutdownApplication);
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

    disableScrollForBody();
}

function setupViewModalListeners(): void {
    setupModalEventListeners();

    const modal: HTMLElement = document.querySelector('.level-view__content') as HTMLElement;
    const buttons: NodeListOf<HTMLButtonElement> = modal.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', event => viewModalInputsClickHandle(event.target as HTMLElement)))
}

function setupCircleRunsViewModalListeners(): void {
    setupModalEventListeners();

    const modal: HTMLElement = document.querySelector('.circle-run-view__content') as HTMLElement;
    const buttons: NodeListOf<HTMLButtonElement> = modal.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', event => circleRunsViewModalInputsClickHandle(event.target as HTMLElement)))
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

    if (button.hasAttribute('data-innerindex')) {
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

    switch (attributes.action) {
        case 'clear-attempts':
            clearAttemptsAsync(attributes.index).then();
            break;
        case 'add-attempts':
            addAttemptsAsync(attributes.index).then();
            break;
        case 'set-attempts':
            setAttemptsAsync(attributes.index).then();
            break;
        case 'set-main-progress':
            setMainProgressAsync(attributes.index).then();
            break;
        case 'get-progresses':
            getProgressesAsPlainText(attributes.index).then();
            break;
        case 'clear-progresses':
            clearProgresses(attributes.index).then();
            break;
        case 'progress-remove':
            removeProgress(attributes.index, attributes.innerIndex!).then();
            break;
        case 'add-extra-progress':
            createProgress(attributes.index).then();
            break;
        case 'open-circle-runs':
            openCircleRunsViewModal(attributes.index);
            break;
    }
}

function circleRunsViewModalInputsClickHandle(target: HTMLElement) {
    const attributes = getTargetAttributes(target);

    switch (attributes.action) {
        case 'add-run':
            addRun(attributes.index);
            break;
        case 'run-remove':
            removeCircleRun(attributes.index, attributes.innerIndex!);
            break;
        case 'clear-runs':
            clearCircleRuns(attributes.index);
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

function openMessageModal(message: string, className?: string) {
    const labelContainer = new MediumLabelContainer(message, className);
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

    if (!level) return;

    let viewModal = new ViewModal(level);

    render('.page', viewModal.getHTML());
    setupViewModalListeners();
}

function openCircleRunsViewModal(id: number) {
    let level = levels.find(level => level.id === id);

    if (!level) return;

    let circleRunsViewModal = new CircleRunsViewModal(level);

    render('.page', circleRunsViewModal.getHTML());
    circleRunsViewModal.applyAttemptsChartConfig();
    circleRunsViewModal.applyCountsChartConfig();

    setupCircleRunsViewModalListeners();

}

function closeModal(target: Element | HTMLElement): void {
    target.remove();

    const anyModal = document.querySelector('.modal');

    if (anyModal) return;
    enableScrollForBody();
}

function activateLoader() {
    let popupLoader = new PopupLoader();

    render('.page', popupLoader.getHTML());
}

function closeLoader() {
    let popupLoaders = document.querySelectorAll('.popup-loader');
    popupLoaders.forEach(loader => (loader as HTMLElement).classList.add('popup-loader__fading'));
    setTimeout(
        () => {
            popupLoaders.forEach(loader => (loader as HTMLElement).remove());
        }, 1000
    );
}

async function updateModalLevelInfo(levelId: number): Promise<void> {
    try {
        await updateAll();

        const level = getLocalLevel(levelId);

        let viewModalContent = document.querySelector('.level-view__content');
        const viewModal = new ViewModal(level);

        if (!viewModalContent) return;

        let progressInputText = getProgressString('progress-input');
        viewModalContent.innerHTML = viewModal.getContent();

        setProgressString(progressInputText, 'progress-input');
        setupViewModalListeners();
    }
    catch (error: any) {
        openMessageModal(error.message, 'error-message');
    }
}

async function updateCircleRunModalLevelInfo(levelId: number): Promise<void> {
    try {
        await updateAll();

        const level = getLocalLevel(levelId);

        let viewModalContent = document.querySelector('.circle-run-view__content');
        const circleRunViewModal = new CircleRunsViewModal(level);

        if (!viewModalContent) return;

        viewModalContent.innerHTML = circleRunViewModal.getContent();
        circleRunViewModal.applyAttemptsChartConfig();
        circleRunViewModal.applyCountsChartConfig();

        setupCircleRunsViewModalListeners();
    }
    catch (error: any) {
        openMessageModal(error.message, 'error-message');
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

function disableScrollForBody() {
    const bodyElement = document.querySelector('body') as HTMLElement;

    if (!bodyElement) return;

    bodyElement.style.overflow = "hidden";
}

function enableScrollForBody() {
    const bodyElement = document.querySelector('body') as HTMLElement;

    if (!bodyElement) return;

    bodyElement.style.overflow = "auto";
}

function selectDifficulty(containers: NodeListOf<Element>, target: HTMLElement) {
    containers.forEach(container => container.classList.remove('selected'));
    target.classList.add('selected');
}

function getAttemptsCount(htmlId: string): number {
    const attemptsString = (document.getElementById(htmlId) as HTMLInputElement).value;

    if (!isNum(attemptsString)) {
        throw new Error('Fill correct attempts count');
    }

    return parseInt(attemptsString);
}

function getMainProgressCount(): number {
    const progressString = getProgressString('progress-input');

    if (!validateProgressInput(progressString)) {
        throw new Error('Fill correct progress count');
    }

    return parseInt(progressString);
}

function getProgressString(htmlId: string): string {
    return (document.getElementById(htmlId) as HTMLInputElement).value;
}

function setProgressString(text: string, htmlId: string): void {
    (document.getElementById(htmlId) as HTMLInputElement).value = text;
}

//Validators
function validateProgressInput(value: string): boolean {
    value = value.replace("\s", "").replace("%", "");

    return /^\d{1,3}$/.test(value);
}

function isNum(value: string): boolean {
    return /\d+/.test(value);
}



