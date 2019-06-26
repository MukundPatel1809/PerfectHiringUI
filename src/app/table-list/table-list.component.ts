import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'app/candidate.service';
import { Candidate } from 'app/candidate';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  candidates: Candidate[];
  subscription: Subscription;
  statusText: string;

  constructor(public candidateService: CandidateService) { }

  ngOnInit() {
      this.candidateService.getJSON().subscribe(data => {
        this.candidates = data.candidates;
      });  
      console.log("Called");
      this.pullDataOnline();
  }

  pullDataOnline() {
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.candidateService.getJSON())
    ).subscribe(result => { 
        this.candidates = result.candidates 
        console.log("Hello");
    });
  }
}
