export class Job {

    constructor(public id: String,
                public totalBudget: number,
                public totalSeats: number,
                public division: string,
                public salaryRange: number[],
                public post: number,
                public skillsRequired: String[]) {
    }
}
