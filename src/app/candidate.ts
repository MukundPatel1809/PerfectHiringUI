export class Candidate {

    constructor(public name: String, public age: number, maritualStatus: String, distanceFromWorkplace: number, 
        skillSets: String[], previousOrganisation: String[],
        public expectedSalary: number, offeredSalary: number, predictedSalary: number, joiningPrediction: number, profileMatching: number,
        public uuid?: String) {
            
    }
}
