import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

    public candidates: Candidate[] = [];
    constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            this.candidates = data.candidates;
        });
    }

    public getJSON(): Observable<any> {
        return this.http.get('./assets/mydata.json');
    }

    public getJOBS(): Observable<any> {
        return this.http.get('./assets/jobs.json');
    }

    public getSalary(candidate: Candidate) {

   //    const salary:any =  candidate.CurrentSalary + parseInt((candidate.PercentSalaryHike / 100).toFixed()) * candidate.CurrentSalary;
        //console.log('salary'+salary);
        return 0;

    }

    public updateCandidate(candidate: any): Observable<any> {
        return this.http.get('./assets/out.json');
        //return  this.http.post("http://a302-0134-5920.stm.swissbank.com:5000/", candidate);
//        return  this.http.post("http://a302-0134-5920.stm.swissbank.com:5000/", candidate);
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

    public findProfileMatchingPercentage(array1: String[], array2: String[]): number {
        let intersectionArray = array1.filter(value => array2.includes(value));
        let percentageProfileMatched: any = ( intersectionArray.length / array1.length ) * 100;
        return percentageProfileMatched.toFixed(2);
    }
}
