import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {CandidateService} from '../candidate.service';
import {Candidate} from '../candidate';
import {Job} from '../job';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    totalGreenStatus: number = 0;
    totalCandidates: number = 0;
    budgetExhausted: number = 0;
    totalBudget: number = 0;
    candidates: Candidate[] = [];
    totalSavings: number = 0;

    jobs: Job[] = [];

    constructor(public candidateService: CandidateService) {
        console.log('something');
    }

    ngOnInit() {
        console.log('candides updated'+this.candidateService.candidates);
        this.candidateService.getJOBS().subscribe(data => {
            console.log(data);
            this.jobs = data.jobs;
            this.calculateCandidateStats(this.candidateService.candidates);
            this.calculateJobStats(this.jobs);
            this.calculateJobIdHiringCount();
            this.calculateBudgetByTeam();
        });

    }

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    private calculateCandidateStats(candidates: Candidate[]) {
        console.log(candidates);
        this.totalCandidates = candidates.length;
        candidates.forEach(candidate => {
            if (candidate.Joining === 'Yes') {
                this.totalGreenStatus += 1;
            }
            this.budgetExhausted += this.candidateService.getSalary(candidate);
        });
    }


    private calculateJobStats(jobs: Job[]) {
        console.log(jobs);
        let maxOffer = 0;
        jobs.forEach(job => {
            //console.log(this.totalBudget);
            this.totalBudget += job.totalBudget;
        });
        this.candidateService.candidates.forEach(candidate => {
            let job = jobs.find(job => job.id == candidate.jobId);
            //console.log(job);
            maxOffer = job.salaryRange[1];
            //console.log('maxOffer:'+maxOffer);
            this.totalSavings += maxOffer - this.candidateService.getSalary(candidate);
        })
    }


    private calculateJobIdHiringCount() {
        let labels: string[] = [];
        let series: number[] = [];
        let totalSeatsByJob: number[] = [];
        this.jobs.forEach(job => {
            labels.push(job.division);
            let candidateCount = 0;
            this.candidateService.candidates.forEach(candidate => {
                if (candidate.jobId == job.id && candidate.Joining == 'Yes') {
                    candidateCount++;
                }
            });
            series.push(candidateCount);
            totalSeatsByJob.push(job.totalSeats);
        });
        console.log('labels: ' + labels);
        console.log('series ' + series);
        console.log('totalSeats ' + totalSeatsByJob);

        this.drawBar('#dailySalesChart', labels, [series, totalSeatsByJob], 0, this.candidateService.candidates.length / (this.jobs.length - 2));


    }

    private calculateBudgetByTeam() {
        let labels: string[] = [];
        let series: number[] = [];
        let totalBudgetByJob: number[] = [];
        this.jobs.forEach(job => {
            labels.push(job.division);
            let budgetExhausted = 0;
            this.candidateService.candidates.forEach(candidate => {
                if (candidate.jobId == job.id && candidate.Joining == 'Yes') {
                    budgetExhausted = budgetExhausted + this.candidateService.getSalary(candidate);
                }
            });
            series.push(budgetExhausted);
            totalBudgetByJob.push(job.totalBudget);
        });
        console.log('labels: ' + labels);
        console.log('series ' + series);
        console.log('totalSeats ' + totalBudgetByJob);

        this.drawBar('#budgetByTeam', labels, [series, totalBudgetByJob], 0, 100);


    }

    private drawBar(id: string, labels: string[], series: any[], low: any, high: any) {
        const chart: any = {
            labels: labels,
            series: series
        };

        const options: any = {
            axisX: {
                showGrid: true,
                labelOffset: {
                    x: 80,
                    y: 0
                }
            },
            axisY: {
                showGrid: true

            },
            low: low,
            high: high,
            chartPadding: {top: 0, right: 5, bottom: 5, left: 0},
        };

        var responsiveOptions: any[] = [
            ['screen and (max-width: 880px)', {
                seriesBarDistance: 30,
            }]
        ];


        var dailySalesChart = new Chartist.Bar(id, chart, options, responsiveOptions);

        this.startAnimationForBarChart(dailySalesChart);
    }
}
