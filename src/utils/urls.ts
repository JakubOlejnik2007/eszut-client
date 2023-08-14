const urls = {
    client: {
        mainpage: "/",
        about: "/o-aplikacji",
        login: "/logowanie",
        problems: "/zgloszenia",
        archive: "/archiwum",
        account: "/konto",
    },
    backend: {
        auth: {
            login: "/login",
        },
        problem: {
            getUnsolvedProblems: "/get-unsolved-problems",
            getSolvedProblems: "/get-solved-problems",
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