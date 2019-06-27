export class Candidate {

    constructor(public name: String,
                public Age: number,
                public Attrition: String,
                public Department: String,
                public DistanceFromHome: number,
                public Gender: String,
                public JobLevel: String,
                public MaritalStatus: String,
                public NumCompaniesWorked: number,
                public PercentSalaryHike: Number,
                public TotalWorkingYears: number,
                public YearsAtCompany: number,
                public CurrentSalary: number,
                public ProfileMatching: number,
                public jobId: String,
                public willCandidateJoin?: String
                ) {

    }
}
