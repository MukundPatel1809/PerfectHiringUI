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
  candidates: Candidate[];
  subscription: Subscription;
  statusText: string;
  jobs: Job[];

  constructor(public candidateService: CandidateService) {
  
  }

  
  ngOnInit() {
    this.candidateService.getJSON().subscribe(data => {
         this.candidates = data.candidates;
     });
     this.candidateService.getJOBS().subscribe(data => {
      this.jobs = data.jobs;
  });  
  }

  editValue(rowNumber: string) {
    this.candidates[rowNumber]["isEditClicked"] = true;
    console.log("clicked"+ rowNumber);
  }

  submitNewValue(rowNumber: string, value: Number, previousValue: Number= this.candidates[rowNumber].PercentSalaryHike ) {
    if(!value) {
      value=previousValue;
      delete this.candidates[rowNumber]["isEditClicked"];
      return;
    }
    delete this.candidates[rowNumber]["isEditClicked"];
    this.candidates[rowNumber].PercentSalaryHike=value;
    this.updateCandidate(rowNumber);
  }

  updateCandidate = (rowNumber) => {
    let candidate = this.candidates[rowNumber];
    let candidateJSON = this.candidateService.getAPIJSON(candidate);
    let val = this.candidateService.updateCandidate(candidateJSON);
    candidate[rowNumber].willCandidateJoin=val;
    this.candidates[rowNumber]["joiningPrediction"] = val;
  }
}
