var S=Object.defineProperty;var D=(e,t,s)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var i=(e,t,s)=>(D(e,typeof t!="symbol"?t+"":t,s),s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const d="/api/";async function R(){const e="LevelController/get-all";let t=[];try{await(await fetch(d+e)).json().then(n=>{if(n.error)throw new Error(n.resultMessage);t=n.value})}catch(s){throw new Error(s.message)}return t}async function j(e){const t="LevelController/create";try{await(await fetch(d+t,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json().then(n=>{if(n.error)throw new Error(n.resultMessage)})}catch(s){throw new Error(s.message)}}async function B(e){const t="LevelController/remove";try{await(await fetch(`${d}${t}?id=${e}`,{method:"DELETE",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json().then(n=>{if(n.error)throw new Error(n.resultMessage)})}catch(s){throw new Error(s.message)}}async function O(e,t){const s="LevelController/change-status";try{await(await fetch(`${d}${s}?id=${e}&state=${t}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}})).json().then(r=>{if(r.error)throw new Error(r.resultMessage)})}catch(n){throw new Error(n.message)}}async function Q(e,t){const s="LevelController/change-priority";try{await(await fetch(`${d}${s}?id=${e}&increase=${t}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}})).json().then(r=>{if(r.error)throw new Error(r.resultMessage)})}catch(n){throw new Error(n.message)}}async function k(e,t,s){const n="LevelController/set-attempts";try{await(await fetch(`${d}${n}?id=${e}&attempts=${t}&append=${s}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}})).json().then(o=>{if(o.error)throw new Error(o.resultMessage)})}catch(r){throw new Error(r.message)}}async function q(e,t){const s="LevelController/set-main-progress";try{await(await fetch(`${d}${s}?id=${e}&progress=${t}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}})).json().then(r=>{if(r.error)throw new Error(r.resultMessage)})}catch(n){throw new Error(n.message)}}async function F(e,t){const s="ProgressController/create";try{await(await fetch(`${d}${s}?levelId=${t}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json().then(r=>{if(r.error)throw new Error(r.resultMessage)})}catch(n){throw new Error(n.message)}}async function V(e){const t="ProgressController/remove";try{await(await fetch(`${d}${t}?progressId=${e}`,{method:"DELETE",mode:"cors",headers:{"Content-Type":"application/json"}})).json().then(n=>{if(n.error)throw new Error(n.resultMessage)})}catch(s){throw new Error(s.message)}}async function J(e){const t="ProgressController/remove-all";try{await(await fetch(`${d}${t}?levelId=${e}`,{method:"DELETE",mode:"cors",headers:{"Content-Type":"application/json"}})).json().then(n=>{if(n.error)throw new Error(n.resultMessage)})}catch(s){throw new Error(s.message)}}async function Z(e){const t="ProgressController/get?levelId="+e;let s="";try{return await(await fetch(d+t)).json().then(r=>{if(r.error)throw new Error(r.resultMessage);const o=new RegExp("$","gm"),h="<br>";s=r.value.replace(o,h)}),s}catch(n){throw new Error(n.message)}}class K{constructor(t,s,n,r="active"){i(this,"id");i(this,"name");i(this,"author");i(this,"attempts");i(this,"priority");i(this,"mainProgress");i(this,"difficulty");i(this,"status");i(this,"progressContainers");this.id=0,this.name=t,this.author=s,this.attempts=0,this.difficulty=n,this.status=r,this.mainProgress=0,this.priority=0,this.progressContainers=[]}}var a=(e=>(e.Easy="easy",e.Normal="normal",e.Hard="hard",e.Harder="harder",e.Insane="insane",e.EasyDemon="easy-demon",e.MediumDemon="medium-demon",e.HardDemon="hard-demon",e.InsaneDemon="insane-demon",e.ExtremeDemon="extreme-demon",e.Default="na",e))(a||{}),g=(e=>(e.Active="active",e.Abandoned="abandoned",e.Completed="completed",e))(g||{});function x(e){switch(e){case"active":return"green";case"abandoned":return"orange";default:return"black"}}function C(e){switch(e){case"active":return"Active";case"abandoned":return"Abandoned";case"completed":return"Completed";default:return"N/A"}}class f{constructor(t="",s=""){i(this,"content");i(this,"className");this.content=t,this.className=s}getHTML(){return this.content}getContent(){return this.content}}class W extends f{constructor(t,s=""){super(t,s)}getHTML(){return`
            <h2 class="levels-container__output medium-30 ${this.className}">
                ${this.content}
            </h2>
        `}}function z(){return"/assets/img/"}function l(e){return z()+e+".png"}class G extends f{constructor(s){super();i(this,"level");i(this,"grayscale");i(this,"stroked");i(this,"action");this.level=s,this.grayscale=s.status==="abandoned"?"grayscale":"",this.stroked=s.status==="completed"?"stroked":"",this.action=this.level.status==="abandoned"?"Continue":"Drop";const n=s.name;this.content=`
        <div class="level__difficulty-block ${this.grayscale}">
            <img src="${l(this.level.difficulty).toString()}" alt="Difficulty image" class="difficulty-block__image difficulty-small">
        </div>
        <div class="level__left-block">
            <div class="left-block__name-block">
                <p class="name-block__label label-gray">Name:</p>
                <div class="name-block__name-info">
                    <h3 class="name-block__name medium-30 ${this.stroked}">${n}</h3>
                    <p class="name-block__label label-gray">by ${this.level.author}</p>
                </div>
            </div>
            <p class="name-block__status label-${x(this.level.status)}">${C(this.level.status)}</p>
        </div >
        <div class="level__progress-block">
            <div class="progress-block__head">
                <p class="progress-block__label label-gray">Main progress:</p>

                <div class="progress-block__controls">
                    <button class="violet-small-tp-rounded" data-index="${this.level.id}" data-action='view'>View</button>
                    <button class="${this.level.status==="abandoned"?"green":"orange"}-small-tp-rounded" data-index="${this.level.id}" data-action=${this.action.toLowerCase()}>
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
        `}getHTML(){return`
        <li class="levels__item level" id="levelblock-${this.level.id}">
            ${this.content}
        </li >
        `}}class w extends f{constructor(s,n){super(s,n);i(this,"contentClassName");this.contentClassName=n?`${n}__content`:""}getHTML(){return`
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
        `}}class U extends w{constructor(){const t=`

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
              <div class="img-container" data-type="${a.Easy}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.Easy)}" alt="Easy">
              </div>
              <div class="img-container" data-type="${a.Normal}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.Normal)}" alt="Normal">
              </div>
              <div class="img-container" data-type="${a.Hard}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.Hard)}" alt="Hard">
              </div>
              <div class="img-container" data-type="${a.Harder}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.Harder)}" alt="Harder">
              </div>
              <div class="img-container" data-type="${a.Insane}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.Insane)}" alt="Insane">
              </div>
              <div class="img-container" data-type="${a.EasyDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.EasyDemon)}" alt="Easy Demon">
              </div>
              <div class="img-container" data-type="${a.MediumDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.MediumDemon)}" alt="Medium Demon">
              </div>
              <div class="img-container" data-type="${a.HardDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.HardDemon)}" alt="Hard Demon">
              </div>
              <div class="img-container" data-type="${a.InsaneDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.InsaneDemon)}" alt="Insane Demon">
              </div>
              <div class="img-container" data-type="${a.ExtremeDemon}">
                <img class="difficulty-block-element difficulty-tiny" src="${l(a.ExtremeDemon)}" alt="Extreme Demon">
              </div>
    
            </div>
          </div>
    
          <nav class="level-creation__buttons">
            <button id="level-creation-done-button" class="violet-tp">Done</button>
          </nav>
        `;super(t,"level-creation")}}class X extends f{constructor(t,s=""){super(t,s)}getHTML(){return`
            <h2 class='medium-20 mr-40 ${this.className||""}'>
                ${this.content}
            </h2>
        `}}class M extends w{constructor(s){super("","level-view");i(this,"level");this.level=s,this.content=`
            <section class="level-view__head">
                <img src="${l(this.level.difficulty)}" alt="Difficulty image" class="level-view__image difficulty-big ${s.status==g.Abandoned?"grayscale":""}">
                <div class="level-view__info">
                   <div class="level-view__name-block">
                        <h2 class="level-view__name medium-40 ${s.status===g.Completed?"stroked":""}">${this.level.name}</h2>
                        <p class="name-block__label label-gray">by ${this.level.author}</p>
                        <p class="name-block__status label-${x(s.status)}" id="level-status">${C(s.status)}</p>
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
                <nav class="attempt-block__controls ${s.status==g.Abandoned?"disabled":""}">
                    <input type="text" class="input-gray" id="attempts-count-input">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-attempts">Add attempts</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-attempts">Clear current</button>
                </nav>
            </section>
    
            <section class="level-view__further-progresses">
                <h3 class="medium-30">Progresses:</h3>
                    <nav class="further-progresses__controls ${s.status==g.Abandoned?"disabled":""}">
                    <input type="text" class="input-gray" id="progress-input">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="set-main-progress">Set main progress</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-further-progress">Add further progress</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="get-progresses">Plain text</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-progresses">Clear all</button>
                </nav>
    `,s.progressContainers.forEach(n=>{this.content+=`
                <div class="further-progresses__content">
                    <p class="label-black">${n.createdAt}</p>
                    <ul class="progresses__container">
                        ${this.getProgressItems(s.id,n.progresses)}
                    </ul>
                </div>
            `}),this.content+="</section>"}getProgressItems(s,n){let r="";return n.forEach(o=>{r+=`
            <li class="progress__item">
                <h3 class="outfit-25-gray-medium">${o.progressText}</h3>
                <button class="progress__delete-button" data-index="${s}" data-innerindex="${o.id}" data-action="progress-remove">×</button>
            </li>
            `}),r}}class Y{constructor(t){i(this,"id",0);i(this,"progressText");this.progressText=t}}let u,y;setTimeout(ee,200);function ee(){u=[],y=[],he(),m().then()}function A(){y=u.slice()}function P(){const e=document.getElementById("search-filter");te(e.value)}function te(e){e=e.toLowerCase(),u&&(y=u.filter(t=>t.name.toLowerCase().includes(e)||t.author.toLowerCase().includes(e)),ne(y))}function se(e){const t=u.find(s=>s.id===e);if(!t)throw new Error("Level not found");return t}function ne(e){if(H(".levels__list"),!e||e.length==0){N("No levels here yet");return}for(let t=0;t<e.length;t++){const s=new G(e[t]);v(".levels__list",s.getHTML())}ge()}async function m(){await re().then(A).then(()=>P())}async function re(){try{u=await R(),A()}catch(e){c(e.message)}}async function oe(){const e=document.getElementById("name-text-input"),t=document.getElementById("author-text-input"),s=document.querySelector(".selected");if(!e||e.value==""){c("Name was empty");return}if(!t)return;if(!s||s.innerHTML===""){c("Difficulty isn't selected");return}if(!s.dataset)return;let n=s.dataset.type;if(!n)return;const r=new K(e.value,t.value,n);try{await j(r).then(()=>{b(e,t),m()})}catch(o){c(o.message);return}}async function E(e,t){try{await O(e,t).then(m)}catch(s){c(s.message)}}async function L(e,t){try{await Q(e,t).then(m)}catch(s){c(s.message)}}async function ae(e){try{await B(e).then(m)}catch(t){N(t.message,"red-selection")}}async function ie(e){try{await k(e,0,!1),await p(e),b(document.getElementById("attempts-count-input"))}catch(t){c(t.message)}}async function ce(e){try{await k(e,Ee(),!0),await p(e),b(document.getElementById("attempts-count-input"))}catch(t){c(t.message)}}async function le(e){try{await q(e,Le()),await p(e),b(document.getElementById("attempts-count-input"))}catch(t){c(t.message)}}async function de(e){try{const t=$();await F(new Y(t),e),await p(e)}catch(t){c(t.message)}}async function ue(e,t){try{await V(t),await p(e)}catch(s){c(s.message)}}async function me(e){try{const t=await Z(e);c(t,"outfit-20-gray-regular")}catch(t){c(t.message)}}async function pe(e){try{await J(e),await p(e)}catch(t){c(t.message)}}function he(){document.getElementById("search-filter").addEventListener("input",P);const t=document.getElementById("create-level-button");t&&t.addEventListener("click",be)}function ge(){document.querySelectorAll(".level").forEach(t=>t.addEventListener("click",s=>ye(s.target)))}function _(){document.querySelectorAll(".modal__close-button").forEach(t=>{t.addEventListener("click",function(){const s=t.closest(".modal");_e(s)})})}function T(){_(),document.querySelector(".level-view__content").querySelectorAll("button").forEach(s=>s.addEventListener("click",n=>fe(n.target)))}function ve(){_();const e=document.querySelectorAll(".img-container");e.forEach(s=>s.addEventListener("click",()=>$e(e,s)));const t=document.getElementById("level-creation-done-button");t&&t.addEventListener("click",oe)}function I(e){if(!e)throw new Error("Target not found");const t=e.closest("button");if(!t||!t.hasAttribute("data-index")||!t.hasAttribute("data-action"))throw new Error("Attributes not found");let s=parseInt(t.dataset.index),n=t.dataset.action,r;return t.hasAttribute("data-innerindex")&&(r=parseInt(t.dataset.innerindex)),{index:s,action:n,innerIndex:r}}function ye(e){const t=I(e);switch(t.action){case"remove":ae(t.index).then();break;case"drop":E(t.index,"abandoned").then();break;case"continue":E(t.index,"active").then();break;case"view":we(t.index);break;case"increasePriority":L(t.index,!0).then();break;case"decreasePriority":L(t.index,!1).then();break}}function fe(e){const t=I(e);switch(t.action){case"clear-attempts":ie(t.index).then();break;case"add-attempts":ce(t.index).then();break;case"set-main-progress":le(t.index).then();break;case"get-progresses":me(t.index).then();break;case"clear-progresses":pe(t.index).then();break;case"progress-remove":ue(t.index,t.innerIndex).then();break;case"add-further-progress":de(t.index).then();break}}function N(e,t){if(e.length==0)return;let s=new W(e,t);H(".levels__list"),v(".levels__list",s.getHTML())}function c(e,t){const s=new X(e,t),n=new w(s.getHTML());v(".page",n.getHTML()),_()}function be(){const e=new U;v(".page",e.getHTML()),ve()}function we(e){let t=u.find(n=>n.id===e);if(!t)return;let s=new M(t);v(".page",s.getHTML()),T()}function _e(e){e.remove()}async function p(e){try{await m();const t=se(e);let s=document.querySelector(".level-view__content");const n=new M(t);if(!s)return;let r=$();s.innerHTML=n.getContent(),ke(r),T()}catch(t){c(t.message)}}function v(e,t){const s=document.querySelector(e);s&&s.insertAdjacentHTML("beforeend",t)}function H(e){const t=document.querySelector(e);t&&(t.innerHTML="")}function b(...e){e.forEach(t=>t.value="")}function $e(e,t){e.forEach(s=>s.classList.remove("selected")),t.classList.add("selected")}function Ee(){const e=document.getElementById("attempts-count-input").value;return Ce(e)?parseInt(e):(c("Fill correct attempts count"),0)}function Le(){const e=$();if(!xe(e))throw new Error("Fill correct progress count");return parseInt(e)}function $(){return document.getElementById("progress-input").value}function ke(e){document.getElementById("progress-input").value=e}function xe(e){return e=e.replace("s","").replace("%",""),/^\d{1,3}$/.test(e)}function Ce(e){return/\d+/.test(e)}
