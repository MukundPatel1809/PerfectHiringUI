import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidate} from './candidate';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    constructor(private http: HttpClient) {

    }

    public getJSON(): Observable<any> {
        return this.http.get('./assets/mydata.json');
    }

    public getJOBS(): Observable<any> {
        return this.http.get('./assets/jobs.json');
    }

    public getSalary(candidate: Candidate) {
        const salary =  candidate.CurrentSalary + (candidate.PercentSalaryHike / 100).toFixed() * candidate.CurrentSalary;
        //console.log('salary'+salary);
        return salary;
    }

}
