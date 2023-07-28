interface IProblem {
    _id: string,
    priority: number,
    PlaceID: string,
    placeName?: string,
    who: string,
    what: string,
    when: number,
    isSolved?: boolean,
    whoSolved?: string,
    dateOfSolved?: number,
    isUnderRealization?: boolean,
    whoDealsID?: string,
    whoDeals?: string,
    CategoryID: string,
    categoryName?: string
}

export default IProblem;