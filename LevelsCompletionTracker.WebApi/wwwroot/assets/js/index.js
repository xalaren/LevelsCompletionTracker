var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const reset = "";
const style = "";
const url = "/api/";
async function shutdownServer() {
  const endpointName = "shutdown";
  try {
    await fetch(
      url + endpointName,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getAllLevelsQueryAsync() {
  const endpointName = "LevelController/get-all";
  let levels2 = [];
  try {
    const serverResponse = await fetch(url + endpointName);
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
      levels2 = data.value;
    });
  } catch (error) {
    throw new Error(error.message);
  }
  return levels2;
}
async function createLevelQueryAsync(level) {
  const endpointName = "LevelController/create";
  try {
    const serverResponse = await fetch(
      url + endpointName,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(level)
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function removeLevelQueryAsync(levelId) {
  const endpointName = "LevelController/remove";
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?id=${levelId}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(levelId)
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function changeLevelStatusQueryAsync(id, status) {
  const endpointName = "LevelController/change-status";
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?id=${id}&state=${status}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function changeLevelPriorityQueryAsync(id, increase) {
  const endpointName = "LevelController/change-priority";
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?id=${id}&increase=${increase}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function setAttemptsQueryAsync(id, attempts, append) {
  const endpointName = "LevelController/set-attempts";
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?id=${id}&attempts=${attempts}&append=${append}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function setMainProgressQueryAsync(id, progress) {
  const endpointName = "LevelController/set-main-progress";
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?id=${id}&progress=${progress}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function createProgressQueryAsync(progress, levelId) {
  const endpointName = `ProgressController/create`;
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?levelId=${levelId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(progress)
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function removeProgressQueryAsync(progressId) {
  const endpointName = `ProgressController/remove`;
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?progressId=${progressId}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function clearAllProgressesQueryAsync(levelId) {
  const endpointName = `ProgressController/remove-all`;
  try {
    const serverResponse = await fetch(
      `${url}${endpointName}?levelId=${levelId}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    await serverResponse.json().then((data) => {
      if (data.error) {
        throw new Error(data.resultMessage);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
class Level {
  constructor(name, author, difficulty, status = "active") {
    __publicField(this, "id");
    __publicField(this, "name");
    __publicField(this, "author");
    __publicField(this, "attempts");
    __publicField(this, "priority");
    __publicField(this, "mainProgress");
    __publicField(this, "difficulty");
    __publicField(this, "status");
    __publicField(this, "progressContainers");
    this.id = 0;
    this.name = name;
    this.author = author;
    this.attempts = 0;
    this.difficulty = difficulty;
    this.status = status;
    this.mainProgress = 0;
    this.priority = 0;
    this.progressContainers = [];
  }
}
var Difficulties = /* @__PURE__ */ ((Difficulties2) => {
  Difficulties2["Easy"] = "easy";
  Difficulties2["Normal"] = "normal";
  Difficulties2["Hard"] = "hard";
  Difficulties2["Harder"] = "harder";
  Difficulties2["Insane"] = "insane";
  Difficulties2["EasyDemon"] = "easy-demon";
  Difficulties2["MediumDemon"] = "medium-demon";
  Difficulties2["HardDemon"] = "hard-demon";
  Difficulties2["InsaneDemon"] = "insane-demon";
  Difficulties2["ExtremeDemon"] = "extreme-demon";
  Difficulties2["Default"] = "na";
  return Difficulties2;
})(Difficulties || {});
var Statuses = /* @__PURE__ */ ((Statuses2) => {
  Statuses2["Active"] = "active";
  Statuses2["Abandoned"] = "abandoned";
  Statuses2["Completed"] = "completed";
  return Statuses2;
})(Statuses || {});
function getStatusColor(status) {
  switch (status) {
    case "active":
      return "green";
    case "abandoned":
      return "orange";
    default:
      return "black";
  }
}
function getStatusText(status) {
  switch (status) {
    case "active":
      return "Active";
    case "abandoned":
      return "Abandoned";
    case "completed":
      return "Completed";
    default:
      return "N/A";
  }
}
class Component {
  constructor(content = "", className = "") {
    __publicField(this, "content");
    __publicField(this, "className");
    this.content = content;
    this.className = className;
  }
  getHTML() {
    return this.content;
  }
  getContent() {
    return this.content;
  }
}
class OutputContainer extends Component {
  constructor(text, className = "") {
    super(text, className);
  }
  getHTML() {
    return `
            <h2 class="levels-container__output medium-30 ${this.className}">
                ${this.content}
            </h2>
        `;
  }
}
function getImagesPath() {
  return "/assets/img/";
}
function getImagePathByDifficulty(difficulty) {
  return getImagesPath() + difficulty + ".png";
}
class LevelContainer extends Component {
  constructor(level) {
    super();
    __publicField(this, "level");
    __publicField(this, "grayscale");
    __publicField(this, "stroked");
    __publicField(this, "action");
    this.level = level;
    this.grayscale = level.status === "abandoned" ? "grayscale" : "";
    this.stroked = level.status === "completed" ? "stroked" : "";
    this.action = this.level.status === "abandoned" ? "Continue" : "Drop";
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
                    <button class="${this.level.status === "abandoned" ? "green" : "orange"}-small-tp-rounded" data-index="${this.level.id}" data-action=${this.action.toLowerCase()}>
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
  getHTML() {
    return `
        <li class="levels__item level" id="levelblock-${this.level.id}">
            ${this.content}
        </li >
        `;
  }
}
class Modal extends Component {
  constructor(content, className) {
    super(content, className);
    __publicField(this, "contentClassName");
    this.contentClassName = className ? `${className}__content` : "";
  }
  getHTML() {
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
        `;
  }
}
class CreationModal extends Modal {
  constructor() {
    const content = `

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
    super(content, "level-creation");
  }
}
class MediumLabelContainer extends Component {
  constructor(text, className = "") {
    super(text, className);
  }
  getHTML() {
    return `
            <h2 class='medium-20 mr-40 ${this.className || ""}'>
                ${this.content}
            </h2>
        `;
  }
}
class ViewModal extends Modal {
  constructor(level) {
    super("", "level-view");
    __publicField(this, "level");
    this.level = level;
    this.content = `
            <section class="level-view__head">
                <img src="${getImagePathByDifficulty(this.level.difficulty)}" alt="Difficulty image" class="level-view__image difficulty-big ${level.status == Statuses.Abandoned ? "grayscale" : ""}">
                <div class="level-view__info">
                   <div class="level-view__name-block">
                        <h2 class="level-view__name medium-40 ${level.status === Statuses.Completed ? "stroked" : ""}">${this.level.name}</h2>
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
                <nav class="attempt-block__controls ${level.status == Statuses.Abandoned ? "disabled" : ""}">
                    <input type="text" class="input-gray" id="attempts-count-input">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-attempts">Add attempts</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="set-attempts">Set attempts</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-attempts">Clear current</button>
                </nav>
            </section>
    
            <section class="level-view__extra-progresses">
                <h3 class="medium-30">Progresses:</h3>
                    <nav class="extra-progresses__controls ${level.status == Statuses.Abandoned ? "disabled" : ""}">
                    <input type="text" class="input-gray" id="progress-input">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="set-main-progress">Set main progress</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-extra-progress">Add extra progress</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="get-progresses">Plain text</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-progresses">Clear all</button>
                </nav>
    `;
    level.progressContainers.forEach(
      (container) => {
        this.content += `
                <div class="extra-progresses__content">
                    <p class="label-black">${container.createdAt}</p>
                    <ul class="progresses__container">
                        ${this.getProgressItems(level.id, container.progresses)}
                    </ul>
                </div>
            `;
      }
    );
    this.content += "</section>";
  }
  getProgressItems(levelId, progresses) {
    let content = "";
    progresses.forEach((progress) => {
      content += `
            <li class="progress__item">
                <h3 class="outfit-25-gray-medium">${progress.progressText}</h3>
                <button class="progress__delete-button" data-index="${levelId}" data-innerindex="${progress.id}" data-action="progress-remove">×</button>
            </li>
            `;
    });
    return content;
  }
}
class Progress {
  constructor(progressText) {
    __publicField(this, "id", 0);
    __publicField(this, "progressText");
    this.progressText = progressText;
  }
}
class PlainTextContainer extends Component {
  constructor(progressContainers) {
    super("", "outfit-20-gray-regular");
    progressContainers.forEach((container) => {
      this.content += container.createdAt + "<br/><br/>";
      container.progresses.forEach((progress) => {
        this.content += progress.progressText + "<br/>";
      });
      this.content += "<br/>";
    });
  }
}
let levels;
let filteredLevels;
setTimeout(init, 200);
function init() {
  levels = [];
  filteredLevels = [];
  setupStaticEventListeners();
  updateAll();
}
function mapLevelArrays() {
  filteredLevels = levels.slice();
}
function setFiltrationWithSearch() {
  const filterInput = document.getElementById("search-filter");
  filterLevels(filterInput.value);
}
function filterLevels(value) {
  value = value.toLowerCase();
  if (!levels) {
    return;
  }
  filteredLevels = levels.filter((level) => {
    return level.name.toLowerCase().includes(value) || level.author.toLowerCase().includes(value);
  });
  displayLevels(filteredLevels);
}
function getLocalLevel(levelId) {
  const level = levels.find((level2) => level2.id === levelId);
  if (!level)
    throw new Error("Level not found");
  return level;
}
function displayLevels(levels2) {
  clearElement(".levels__list");
  if (!levels2 || levels2.length == 0) {
    displayMessageOutput("No levels here yet");
    return;
  }
  for (let i = 0; i < levels2.length; i++) {
    const levelContainer = new LevelContainer(levels2[i]);
    render(".levels__list", levelContainer.getHTML());
  }
  setupLevelsEventListeners();
}
async function updateAll() {
  await loadLevelsAsync().then(mapLevelArrays).then(() => setFiltrationWithSearch());
}
async function loadLevelsAsync() {
  try {
    levels = await getAllLevelsQueryAsync();
    mapLevelArrays();
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function createLevelAsync() {
  const nameInput = document.getElementById("name-text-input");
  const authorInput = document.getElementById("author-text-input");
  const selectedContainer = document.querySelector(".selected");
  if (!nameInput || nameInput.value == "") {
    openMessageModal("Name was empty");
    return;
  }
  if (!authorInput) {
    return;
  }
  if (!selectedContainer || selectedContainer.innerHTML === "") {
    openMessageModal("Difficulty isn't selected");
    return;
  }
  if (!selectedContainer.dataset) {
    return;
  }
  let difficulty = selectedContainer.dataset.type;
  if (!difficulty)
    return;
  const level = new Level(nameInput.value, authorInput.value, difficulty);
  try {
    await createLevelQueryAsync(level).then(() => {
      clearInputs(nameInput, authorInput);
      updateAll();
    });
  } catch (error) {
    openMessageModal(error.message);
    return;
  }
}
async function changeLevelStatusAsync(levelId, status) {
  try {
    await changeLevelStatusQueryAsync(levelId, status).then(updateAll);
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function changeLevelPriorityAsync(levelId, increase) {
  try {
    await changeLevelPriorityQueryAsync(levelId, increase).then(updateAll);
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function removeLevelAsync(levelId) {
  try {
    await removeLevelQueryAsync(levelId).then(updateAll);
  } catch (error) {
    displayMessageOutput(error.message, "red-selection");
  }
}
async function clearAttemptsAsync(levelId) {
  try {
    await setAttemptsQueryAsync(levelId, 0, false);
    await updateModalLevelInfo(levelId);
    clearInputs(document.getElementById("attempts-count-input"));
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function addAttemptsAsync(levelId) {
  try {
    await setAttemptsQueryAsync(levelId, getAttemptsCount(), true);
    await updateModalLevelInfo(levelId);
    clearInputs(document.getElementById("attempts-count-input"));
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function setAttemptsAsync(levelId) {
  try {
    await setAttemptsQueryAsync(levelId, getAttemptsCount(), false);
    await updateModalLevelInfo(levelId);
    clearInputs(document.getElementById("attempts-count-input"));
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function setMainProgressAsync(levelId) {
  try {
    await setMainProgressQueryAsync(levelId, getMainProgressCount());
    await updateModalLevelInfo(levelId);
    clearInputs(document.getElementById("attempts-count-input"));
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function createProgress(levelId) {
  try {
    const progressString = getProgressString();
    await createProgressQueryAsync(new Progress(progressString), levelId);
    await updateModalLevelInfo(levelId);
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function removeProgress(levelId, progressId) {
  try {
    await removeProgressQueryAsync(progressId);
    await updateModalLevelInfo(levelId);
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function getProgressesAsPlainText(levelId) {
  try {
    const progressContainers = getLocalLevel(levelId).progressContainers;
    const container = new PlainTextContainer(progressContainers);
    openMessageModal(container.getHTML());
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function clearProgresses(levelId) {
  try {
    await clearAllProgressesQueryAsync(levelId);
    await updateModalLevelInfo(levelId);
  } catch (error) {
    openMessageModal(error.message);
  }
}
async function shutdownApplication() {
  try {
    window.location.href = "../../assets/pages/blank.html";
    await shutdownServer();
    window.close();
  } catch (error) {
    openMessageModal(error.message);
  }
}
function setupStaticEventListeners() {
  const filterInput = document.getElementById("search-filter");
  filterInput.addEventListener("input", setFiltrationWithSearch);
  const createButton = document.getElementById("create-level-button");
  if (createButton) {
    createButton.addEventListener("click", openCreationModal);
  }
  const shutdownButton = document.getElementById("shutdown-button");
  if (shutdownButton) {
    shutdownButton.addEventListener("click", shutdownApplication);
  }
}
function setupLevelsEventListeners() {
  const containers = document.querySelectorAll(".level");
  containers.forEach((element) => element.addEventListener("click", (event) => levelContainerInputsClickHandle(event.target)));
}
function setupModalEventListeners() {
  const modalButtons = document.querySelectorAll(".modal__close-button");
  modalButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const modalContainer = button.closest(".modal");
      closeModal(modalContainer);
    });
  });
}
function setupViewModalListeners() {
  setupModalEventListeners();
  const modal = document.querySelector(".level-view__content");
  const buttons = modal.querySelectorAll("button");
  buttons.forEach((button) => button.addEventListener("click", (event) => viewModalInputsClickHandle(event.target)));
}
function setupCreationModalEventListeners() {
  setupModalEventListeners();
  const containers = document.querySelectorAll(".img-container");
  containers.forEach((container) => container.addEventListener("click", () => selectDifficulty(containers, container)));
  const doneButton = document.getElementById("level-creation-done-button");
  if (doneButton) {
    doneButton.addEventListener("click", createLevelAsync);
  }
}
function getTargetAttributes(target) {
  if (!target) {
    throw new Error("Target not found");
  }
  const button = target.closest("button");
  if (!button || !button.hasAttribute("data-index") || !button.hasAttribute("data-action")) {
    throw new Error("Attributes not found");
  }
  let index = parseInt(button.dataset.index);
  let action = button.dataset.action;
  let innerIndex = void 0;
  if (button.hasAttribute("data-innerindex")) {
    innerIndex = parseInt(button.dataset.innerindex);
  }
  return {
    index,
    action,
    innerIndex
  };
}
function levelContainerInputsClickHandle(target) {
  const attributes = getTargetAttributes(target);
  switch (attributes.action) {
    case "remove":
      removeLevelAsync(attributes.index).then();
      break;
    case "drop":
      changeLevelStatusAsync(attributes.index, "abandoned").then();
      break;
    case "continue":
      changeLevelStatusAsync(attributes.index, "active").then();
      break;
    case "view":
      openViewModal(attributes.index);
      break;
    case "increasePriority":
      changeLevelPriorityAsync(attributes.index, true).then();
      break;
    case "decreasePriority":
      changeLevelPriorityAsync(attributes.index, false).then();
      break;
  }
}
function viewModalInputsClickHandle(target) {
  const attributes = getTargetAttributes(target);
  switch (attributes.action) {
    case "clear-attempts":
      clearAttemptsAsync(attributes.index).then();
      break;
    case "add-attempts":
      addAttemptsAsync(attributes.index).then();
      break;
    case "set-attempts":
      setAttemptsAsync(attributes.index).then();
      break;
    case "set-main-progress":
      setMainProgressAsync(attributes.index).then();
      break;
    case "get-progresses":
      getProgressesAsPlainText(attributes.index).then();
      break;
    case "clear-progresses":
      clearProgresses(attributes.index).then();
      break;
    case "progress-remove":
      removeProgress(attributes.index, attributes.innerIndex).then();
      break;
    case "add-extra-progress":
      createProgress(attributes.index).then();
      break;
  }
}
function displayMessageOutput(text, messageColor) {
  if (text.length == 0) {
    return;
  }
  let container = new OutputContainer(text, messageColor);
  clearElement(".levels__list");
  render(".levels__list", container.getHTML());
}
function openMessageModal(message, className) {
  const labelContainer = new MediumLabelContainer(message, className);
  const modalContainer = new Modal(labelContainer.getHTML());
  render(".page", modalContainer.getHTML());
  setupModalEventListeners();
}
function openCreationModal() {
  const container = new CreationModal();
  render(".page", container.getHTML());
  setupCreationModalEventListeners();
}
function openViewModal(id) {
  let level = levels.find((level2) => level2.id === id);
  if (!level)
    return;
  let viewModal = new ViewModal(level);
  render(".page", viewModal.getHTML());
  setupViewModalListeners();
}
function closeModal(target) {
  target.remove();
}
async function updateModalLevelInfo(levelId) {
  try {
    await updateAll();
    const level = getLocalLevel(levelId);
    let viewModalContent = document.querySelector(".level-view__content");
    const viewModal = new ViewModal(level);
    if (!viewModalContent)
      return;
    let progressInputText = getProgressString();
    viewModalContent.innerHTML = viewModal.getContent();
    setProgressString(progressInputText);
    setupViewModalListeners();
  } catch (error) {
    openMessageModal(error.message);
  }
}
function render(className, innerHTML) {
  const element = document.querySelector(className);
  if (!element) {
    return;
  }
  element.insertAdjacentHTML("beforeend", innerHTML);
}
function clearElement(className) {
  const element = document.querySelector(className);
  if (!element) {
    return;
  }
  element.innerHTML = "";
}
function clearInputs(...elements) {
  elements.forEach((element) => element.value = "");
}
function selectDifficulty(containers, target) {
  containers.forEach((container) => container.classList.remove("selected"));
  target.classList.add("selected");
}
function getAttemptsCount() {
  const attemptsString = document.getElementById("attempts-count-input").value;
  if (!isNum(attemptsString)) {
    openMessageModal("Fill correct attempts count");
    return 0;
  }
  return parseInt(attemptsString);
}
function getMainProgressCount() {
  const progressString = getProgressString();
  if (!validateProgressInput(progressString)) {
    throw new Error("Fill correct progress count");
  }
  return parseInt(progressString);
}
function getProgressString() {
  return document.getElementById("progress-input").value;
}
function setProgressString(text) {
  document.getElementById("progress-input").value = text;
}
function validateProgressInput(value) {
  value = value.replace("s", "").replace("%", "");
  return /^\d{1,3}$/.test(value);
}
function isNum(value) {
  return /\d+/.test(value);
}
