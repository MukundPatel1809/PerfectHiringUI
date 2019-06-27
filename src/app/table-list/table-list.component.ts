import { Component, OnInit, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CandidateService } from 'app/candidate.service';
import { Candidate } from 'app/candidate';
import { Subscription, timer, pipe } from 'rxjs';
import { Sort } from '@angular/material';
import { Job } from 'app/job';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  subscription: Subscription;
  statusText: string;
  jobs: Job[];

  constructor(public candidateService: CandidateService) {
    
  }
  
  ngOnInit() {
     this.candidateService.getJOBS().subscribe(data => {
       this.jobs = data.jobs;
    });  
  }

  editValue(rowNumber: string) {
    this.candidateService.candidates[rowNumber]["isEditClicked"] = true;
    console.log("clicked"+ rowNumber);
  }

  submitNewValue(rowNumber: string, value: Number, previousValue: Number= this.candidateService.candidates[rowNumber].PercentSalaryHike ) {
    if(!value) {
      value=previousValue;
      delete this.candidateService.candidates[rowNumber]["isEditClicked"];
      return;
    }
    delete this.candidateService.candidates[rowNumber]["isEditClicked"];
    this.candidateService.candidates[rowNumber].PercentSalaryHike=value;
    this.updateCandidate(rowNumber);
  }

  updateCandidate = (rowNumber) => {
    let candidate = this.candidateService.candidates[rowNumber];
    let candidateJSON = this.candidateService.getAPIJSON(candidate);
    let val = this.candidateService.updateCandidate(candidateJSON).subscribe(data => {
      this.candidateService.candidates[rowNumber].Joining = data.result == 1 ? "Yes":"No";
    }, data =>{
        alert("Web service call failed!")
    });
    
    this.candidateService.candidates[rowNumber]["joiningPrediction"] = val;
  }
}
