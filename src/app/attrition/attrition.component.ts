import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'app/candidate.service';

@Component({
  selector: 'app-attrition',
  templateUrl: './attrition.component.html',
  styleUrls: ['./attrition.component.scss']
})
export class AttritionComponent implements OnInit {

  constructor(public candidateService: CandidateService) {

   }

  ngOnInit() {
  }
}
