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


    let Department= this.myForm.controls.Department.value;
    let Attritus = this.myForm.controls.Attritus.value;
    let Gender = this.myForm.controls.Gender.value;
    let Age = this.myForm.controls.Gender.value;
    let DistanceFromHome = this.myForm.controls.DistanceFromHome.value;
    let MaritalStatus = this.myForm.controls.MaritalStatus.value;
    let PercentSalaryHike = this.myForm.controls.PercentSalaryHike.value;
    let CurrentSalary = this.myForm.controls.CurrentSalary.value;
    let JobLevel = this.myForm.controls.JobLevel.value;
    let TotalWorkingYears = this.myForm.controls.Gender.value;
    let NumCompaniesWorked = this.myForm.controls.NumCompaniesWorked.value;
    let YearsAtCompany = this.myForm.controls.Gender.value;
    //let candidate = new Candidate(name, age, Attritus, DistanceFromHome, Department, Gender, JobLevel, MaritalStatus, NumCompaniesWorked, PercentSalaryHike, TotalWorkingYears, YearsAtCompany, CurrentSalary, percentMatching);
    //var isJoining = this.candidateService.updateCandidate(candidate);
  }

  findProfileMatchingPercentage(array1: String[], array2: String[]): number {
    let intersectionArray = array1.filter(value => array2.includes(value));
    let percentageProfileMatched = ( intersectionArray.length / array1.length ) * 100;
    return percentageProfileMatched;
  }

}