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
        });





        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */



        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        let labels = [];
        let series = [];
        let totalSeatsByJob = [];
        this.jobs.forEach(job => {
            labels.push(job.division);
            let candidateCount = 0;
            this.candidates.forEach(candidate=>{
                if(candidate.JobLevel==job.post && candidate.Attrition=="Yes"){
                    candidateCount++;
                }
            });
            let hiringPercentage = (candidateCount);
            series.push(hiringPercentage);
            totalSeatsByJob.push(job.totalSeats);
        });
        console.log('labels: '+labels);
        console.log('series '+series);
        console.log('totalSeats '+totalSeatsByJob);


        const datawebsiteViewsChart: any = {
            labels: labels,
            series: [series]
        };

        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 12,
            chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
        };
        var responsiveOptions: any[] = [
            ['screen and (max-width: 1280px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions));
    }


    private drawBar(id: string, labels:[], series: [[]], low:number, high:number){
        const dataDailySalesChart: any = {
            labels: labels,
            series: series
        };

        const optionsDailySalesChart: any = {
            stackBars: false,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: low,
            high: high,
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
        };

        var dailySalesChart = new Chartist.Bar(id, dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);
    }

    private calculateJobIdHiringCount() {
        let labels = [];
        let series = [];
        let totalSeatsByJob = [];
        this.jobs.forEach(job => {
            labels.push(job.division);
            let candidateCount = 0;
            this.candidates.forEach(candidate=>{
                if(candidate.JobLevel==job.post && candidate.Attrition=="Yes"){
                    candidateCount++;
                }
            });
            let hiringPercentage = (candidateCount);
            series.push(hiringPercentage);
            totalSeatsByJob.push(job.totalSeats);
        });
        console.log('labels: '+labels);
        console.log('series '+series);
        console.log('totalSeats '+totalSeatsByJob);

        this.drawBar(dailySalesChart, labels, [series,totalSeatsByJob], 0, this.candidates.length/(this.jobs.length-2));


    }
}
