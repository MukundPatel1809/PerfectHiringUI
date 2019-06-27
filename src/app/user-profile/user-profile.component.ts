import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormBuilder}  from '@angular/forms';
import { CandidateService } from 'app/candidate.service';
import { Organization } from 'app/organization';
import { Candidate } from 'app/candidate';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

   private myForm = new FormGroup({
     Name: new FormControl(),
     Department: new FormControl(),
     Attritus: new FormControl(),
     Gender: new FormControl(),
     Age: new FormControl(),
     DistanceFromHome: new FormControl(),
     MaritalStatus: new FormControl(),
     PercentSalaryHike: new FormControl(),
     CurrentSalary: new FormControl(),
     JobLevel: new FormControl(),
     TotalWorkingYears: new FormControl(),
     NumCompaniesWorked: new FormControl(),
     YearsAtCompany: new FormControl(),
     skillSets: new FormControl()
   });

  constructor(public candidateService: CandidateService) { 
  
  }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log(this.myForm);
    
    let skills = this.myForm.controls.skillSets.value.split(",");
    let skillsRequired = new Organization().skillsRequired;
    let percentMatching = this.findProfileMatchingPercentage(skills, skillsRequired);
    let name = this.myForm.controls.Name.value;
    let age = this.myForm.controls.Age.value;


    let Department: String= this.myForm.controls.Department.value;
    let Attritus: String = this.myForm.controls.Attritus.value;
    let Gender: String = this.myForm.controls.Gender.value;
    let Age: number = this.myForm.controls.Gender.value;
    let DistanceFromHome: number = this.myForm.controls.DistanceFromHome.value;
    let MaritalStatus: String = this.myForm.controls.MaritalStatus.value;
    let PercentSalaryHike: number = this.myForm.controls.PercentSalaryHike.value;
    let CurrentSalary: number = this.myForm.controls.CurrentSalary.value;
    let JobLevel: String = this.myForm.controls.JobLevel.value;
    let TotalWorkingYears: number = this.myForm.controls.Gender.value;
    let NumCompaniesWorked: number = this.myForm.controls.NumCompaniesWorked.value;
    let YearsAtCompany: number = this.myForm.controls.Gender.value;
    let candidateTemp = new Candidate(name, age, Attritus, Department, DistanceFromHome, Gender, JobLevel, MaritalStatus, NumCompaniesWorked, PercentSalaryHike, TotalWorkingYears, YearsAtCompany, CurrentSalary, 10, "10");
    var isJoining = this.candidateService.updateCandidate(candidateTemp).subscribe( data => {
      return candidateTemp.willCandidateJoin = data.result == "1" ? "Yes" : "No";
    });

    //this.myForm.c
    this.myForm.reset();
  }

  findProfileMatchingPercentage(array1: String[], array2: String[]): number {
    let intersectionArray = array1.filter(value => array2.includes(value));
    let percentageProfileMatched = ( intersectionArray.length / array1.length ) * 100;
    return percentageProfileMatched;
  }

}