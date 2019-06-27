import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidate} from './candidate';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {


    public url: String = "";

    public CandidateObj = {
        Age:0,
        Department:0,
        DistanceFromHome:"",
        Gender:"",
        JobLevel:"",
        MaritalStatus:"",
        NumCompaniesWorked:0,
        PercentSalaryHike:0,
        TotalWorkingYears:0,
        YearsAtCompany:0
    };


    constructor(private http: HttpClient) {

    }

    public getJSON(): Observable<any> {
        return this.http.get('./assets/mydata.json');
    }

    public getJOBS(): Observable<any> {
        return this.http.get('./assets/jobs.json');
    }

    public getSalary(candidate: Candidate) {
        const salary:any =  candidate.CurrentSalary + parseInt((candidate.PercentSalaryHike * candidate.CurrentSalary/100));
        console.log(`current: ${candidate.CurrentSalary} hike: ${candidate.PercentSalaryHike} salary: ${salary}`);
        return salary;
    }

    public updateCandidate(candidate: any): Observable<any> {
        return  this.http.post("/update-candidate", candidate);
  
    }

    public getAPIJSON(candidate: Candidate): any {
        let candidateJSON = {
            Age:candidate.Age,
            Department:candidate.Department,
            DistanceFromHome:candidate.DistanceFromHome,
            Gender:candidate.Gender,
            JobLevel:candidate.JobLevel,
            MaritalStatus:candidate.MaritalStatus,
            NumCompaniesWorked:candidate.NumCompaniesWorked,
            PercentSalaryHike:candidate.PercentSalaryHike,
            TotalWorkingYears:candidate.TotalWorkingYears,
            YearsAtCompany:candidate.YearsAtCompany
        };
        return candidateJSON;
    }


}
