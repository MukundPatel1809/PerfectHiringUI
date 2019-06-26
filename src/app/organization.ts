
// class contains constant
export class Organization {

    skillsRequired: String[] = ["JAVA", "SPRING", "HIBERNATE", "REST", "SPRING-REST", "SPRING-MVC", "DATA-STRUCTURE","JUNIT",
    "MOCKITO", "DOCKER"];

    profileMatcherPositiveCutOff: number=70;
    joingPercentageCutOff: number=70.6;
    expectedSalaryCutOff: number=70;
    
    constructor() {
        console.log(" Contains constants ");
    }
}