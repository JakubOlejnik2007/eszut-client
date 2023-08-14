interface IProblem {
    _id: string,
    priority: string,
    PlaceID: string,
    placeName: string,
    who: string,
    what: string,
    when: number,
    isSolved: boolean,
    whoSolvedID: string,
    whoSolved: string,
    dateOfSolved: number,
    isUnderRealization: boolean,
    whoDealsID: string,
    whoDeals: string,
    CategoryID: {
        _id: string,
        name: string
    },
    categoryName: string
}

export interface IProblemForm {
    priority: number,
    PlaceID: string,
    who: string,
    what: string,
    when: number,
    CategoryID: string,
}

export default IProblem;