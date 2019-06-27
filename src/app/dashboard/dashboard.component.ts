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

    totalGreenStatus: number = 0 ;
    totalCandidates: number = 0;
    budgetExhausted: number = 0;
    totalBudget: number = 0;
    candidates:Candidate[] = [];
    totalSavings: number=0;

    jobs: Job[] = [];

    constructor(public candidateService: CandidateService) {
        console.log("something");
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }else if(data.type === 'bar') {
                /*data.element.attr({
                    style: 'stroke-width: 30px'
                });*/
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
    };

    private calculateCandidateStats(candidates: Candidate[]) {
        console.log(candidates);
        this.totalCandidates = candidates.length;
        candidates.forEach(candidate =>{
            if(candidate.Attrition==="Yes"){
                this.totalGreenStatus += 1;
            }
            this.budgetExhausted += this.candidateService.getSalary(candidate);
        });
    }



    private calculateJobStats(jobs: Job[]) {
        console.log(jobs);
        let maxOffer = 0;
        jobs.forEach(job=>{
            //console.log(this.totalBudget);
            this.totalBudget += job.totalBudget;
        });
        this.candidates.forEach(candidate=>{
            let job = jobs.find(job=> job.id==candidate.jobId);
            //console.log(job);
            maxOffer = job.salaryRange[1];
            //console.log('maxOffer:'+maxOffer);
            this.totalSavings += maxOffer-this.candidateService.getSalary(candidate);
        })
    }

    ngOnInit() {
        this.candidateService.getJSON().subscribe(data => {
            console.log(data);
            this.candidates = data.candidates;
            this.calculateCandidateStats(this.candidates);
        });
        this.candidateService.getJOBS().subscribe(data => {
            console.log(data);
            this.jobs = data.jobs;
            this.calculateJobStats(this.jobs);
            this.calculateJobIdHiringCount();
            this.calculateBudgetByTeam();
        });

    }



    private calculateJobIdHiringCount() {
        let labels: string[] = [];
        let series: number[] = [];
        let totalSeatsByJob: number[] = [];
        this.jobs.forEach(job => {
            labels.push(job.division);
            let candidateCount = 0;
            this.candidates.forEach(candidate=>{
                if(candidate.jobId==job.id && candidate.Attrition=="Yes"){
                    candidateCount++;
                }
            });
            series.push(candidateCount);
            totalSeatsByJob.push(job.totalSeats);
        });
        console.log('labels: '+labels);
        console.log('series '+series);
        console.log('totalSeats '+totalSeatsByJob);

        this.drawBar("#dailySalesChart", labels, [series,totalSeatsByJob], 0, this.candidates.length/(this.jobs.length-2));


    }

    private calculateBudgetByTeam() {
        let labels: string[] = [];
        let series: number[] = [];
        let totalBudgetByJob: number[] = [];
        this.jobs.forEach(job => {
            labels.push(job.division);
            let budgetExhausted = 0;
            this.candidates.forEach(candidate=>{
                if(candidate.jobId==job.id && candidate.Attrition=="Yes"){
                    budgetExhausted = budgetExhausted + this.candidateService.getSalary(candidate);
                }
            });
            series.push(budgetExhausted);
            totalBudgetByJob.push(job.totalBudget);
        });
        console.log('labels: '+labels);
        console.log('series '+series);
        console.log('totalSeats '+totalBudgetByJob);

        this.drawBar("#budgetByTeam", labels, [series,totalBudgetByJob], 0, 100);


    }

    private drawBar(id: string, labels:string[], series:any[], low:any, high:any){
        const chart: any = {
            labels: labels,
            series: series
        };

        const options: any = {
            stackBars: false,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: low,
            high: high,
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
        };

        var responsiveOptions: any[] = [
            ['screen and (max-width: 880px)', {
                seriesBarDistance: 30,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        var dailySalesChart = new Chartist.Bar(id, chart, options, responsiveOptions);

        this.startAnimationForBarChart(dailySalesChart);
    }
}
