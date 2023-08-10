const urls = {
    client: {
        mainpage: "/",
        about: "/about/",
        login: "/login",
        problems: "/zgloszenia/",
        account: "/account",
    },
    backend: {
        auth: {
            login: "/login",
        },
        problem: {
            getUnsolvedProblems: "/get-unsolved-problems",
            insertProblem: "/report-problem",
            updateProblem: "/update-problem",
            takeOnProblem: "/take-on-problem",
            rejectProblem: "/reject-problem",
            markProblemAsSolved: "/mark-problem-as-solved",
            markProblemAsUnsolved: "/mark-problem-as-unsolved"
        },
        comment: {
            deleteComment: "/delete-comment",
            createComment: "/create-comment",
            getComments: "/get-comments",
        },
        forms: {
            getCategories: "/get-categories",
            getPlaces: "/get-places",
        },
        push: {
            subscribe: "/subscribe"
        }
    },
};

export default urls;