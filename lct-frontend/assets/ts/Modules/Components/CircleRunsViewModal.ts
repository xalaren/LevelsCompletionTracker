import { Modal } from "./Modal.ts";
import { Level, Statuses } from "../Models/Level.ts";
import { Chart, registerables } from "chart.js";

export class CircleRunsViewModal extends Modal {
    private readonly level: Level;

    constructor(level: Level) {
        super('', 'circle-run-view');

        this.level = level;
        this.build(level);

        Chart.register(...registerables);
    }


    applyAttemptsChartConfig() {
        const ctx = document.getElementById('attempts-chart') as HTMLCanvasElement;

        let reversedCircleRuns = [...this.level.circleRuns].reverse();

        const dates = reversedCircleRuns.map(cr => new Date(cr.createdAt).toLocaleDateString());
        const attempts = reversedCircleRuns.map(cr => cr.attempts);

        const delimeter = Math.round((Math.max(...attempts) / attempts.length));
        const max = Math.max(...attempts) + delimeter;
        const min = 0;

        const circleRunLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Attempts on run',
                        backgroundColor: 'rgb(52, 120, 237)',
                        borderColor: 'rgb(52, 120, 237)',
                        data: attempts
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        min: min,
                        max: max,
                        title: {
                            display: true,
                            text: 'Attempts on runs'
                        }
                    }
                }
            }
        });

        circleRunLineChart.draw();
    }

    applyCountsChartConfig() {
        const ctx = document.getElementById('counts-chart') as HTMLCanvasElement;

        let reversedCircleRuns = [...this.level.circleRuns].reverse();

        const dates = reversedCircleRuns.map(cr => new Date(cr.createdAt).toLocaleDateString());
        const counts = reversedCircleRuns.map(cr => cr.count);

        const delimeter = Math.round((Math.max(...counts) / counts.length));
        const max = Math.max(...counts) + delimeter;
        const min = 0;

        const circleRunLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Count of runs',
                        backgroundColor: 'rgb(237, 52, 83)',
                        borderColor: 'rgb(237, 52, 83)',
                        data: counts
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                        }
                    },
                    y: {
                        min: min,
                        max: max,
                        title: {
                            display: true,
                            text: 'Circle runs count'
                        }
                    }
                }
            }
        });

        circleRunLineChart.draw();
    }

    private build(level: Level) {
        this.content = `
        <div class="circle-run-view__left">
                <h3 class="medium-30-violet-shadow attempt-block__total" id="cr-counter">${this.level.circleRunsTotalCount} circle runs</h3>
                <h3 class="medium-30-violet-shadow attempt-block__total" id="cr-attempts-counter">${this.level.circleRunsTotalAttempts} total attempts</h3>
                <nav class="attempt-block__controls ${level.status == Statuses.Abandoned ? 'disabled' : ''}">
                    <input type="text" class="input-gray" id="cr-attempts-input" placeholder="Attempts...">
                    <button class="violet-tp" data-index="${this.level.id}" data-action="add-run">Add run</button>
                    <button class="violet-tp" data-index="${this.level.id}" data-action="clear-runs">Clear runs</button>
                </nav>
    `

        level.circleRuns.forEach(circleRun => {
            this.content += `
                    <div class="extra-progresses__content">
                        <p class="label-black">${new Date(circleRun.createdAt).toLocaleDateString()}</p>
                        <ul class="progresses__container">
                             <li class="progress__item">
                                <h3 class="outfit-25-gray-medium">${circleRun.count} runs: ${circleRun.attempts} att.</h3>
                                <button class="progress__delete-button" 
                                        data-index="${level.id}" 
                                        data-innerindex="${circleRun.id}" 
                                        data-action="progress-remove">×</button>
                            </li>
                        </ul>
                    </div>
            `;
        }
        )


        this.content +=
            `
                </div>
                <div class="circle-run-view__right">
                    <div class="circle-run-view__chart chart">
                        <canvas id="attempts-chart" width="400" height="400">
                        </canvas>

                        <canvas id="counts-chart" width="400" height="400">
                        </canvas>
                    </div>
                </div>
            </div>
        `;
    }
}