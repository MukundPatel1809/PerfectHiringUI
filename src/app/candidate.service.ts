import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidate} from './candidate';
import {Job} from './job';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {


    public url: String = '';

    public CandidateObj = {
        Age: 0,
        Department: 0,
        DistanceFromHome: '',
        Gender: '',
        JobLevel: '',
        MaritalStatus: '',
        NumCompaniesWorked: 0,
        PercentSalaryHike: 0,
        TotalWorkingYears: 0,
        YearsAtCompany: 0
    };

    public candidates: Candidate[] = [];

    constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            this.candidates = data.candidates;
            this.getJOBS().subscribe(data => {
                let jobs: Job[] = data.jobs;
                console.log("JOBS INITIALLY");
                console.log(jobs);
                this.candidates.forEach(candidate => {
                    const job: Job = jobs.filter(job => {return job.id == candidate.jobId})[0];
                    if(job) {
                        console.log(job.salaryRange);
                        candidate.PercentSalaryHike = job.startingHike;
                        let val = this.updateCandidate(this.getAPIJSON(candidate)).subscribe(data => {
                            candidate.Joining = data.result == 1 ? 'Yes' : 'No';
                        }, data => {
                            console.log('Web service call failed!');
                        });
                    }else{
                        console.log("NOT MATCHED");
                    }
                })
            })
        });
    }

    public getJSON(): Observable<any> {
        return this.http.get('./assets/mydata.json');
    }

    public getJOBS(): Observable<any> {
        return this.http.get('./assets/jobs.json');
    }

    public getSalary(candidate: Candidate): number {

        let salary = (candidate.CurrentSalary + candidate.PercentSalaryHike * candidate.CurrentSalary * 0.01);
        //console.log(`current: ${candidate.CurrentSalary} hike: ${candidate.PercentSalaryHike} salary: ${salary}`);
        return salary;

    }

    public updateCandidate(candidate: any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get('./assets/out.json');
        // return this.http.post("http://a302-0134-5920.stm.swissbank.com:5000/", candidate, {headers});
    }

    public getAPIJSON(candidate: Candidate): any {
        let candidateJSON = {
            Age: candidate.Age,
            Department: candidate.Department,
            DistanceFromHome: candidate.DistanceFromHome,
            Gender: candidate.Gender,
            JobLevel: candidate.JobLevel,
            MaritalStatus: candidate.MaritalStatus,
            NumCompaniesWorked: candidate.NumCompaniesWorked,
            PercentSalaryHike: candidate.PercentSalaryHike,
            TotalWorkingYears: candidate.TotalWorkingYears,
            YearsAtCompany: candidate.YearsAtCompany
        };
        return candidateJSON;
    }

    public findProfileMatchingPercentage(array1: String[], array2: String[]): number {
        let intersectionArray = array1.filter(value => array2.includes(value));
        let percentageProfileMatched: any = (intersectionArray.length / array1.length) * 100;
        return percentageProfileMatched.toFixed(2);
    }
}
