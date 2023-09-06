interface IComment {
    date: number,
    content: string,
    administratorName: string
}

export interface ICommentWrapperProps {
    ProblemID: string
}

export default IComment