const urls = {
    client: {
        mainpage: "/",
        about: "/o-aplikacji",
        login: "/logowanie",
        problems: "/zgloszenia",
        archive: "/archiwum",
        account: "/konto",
        manageapp: "/zarzadzanie-aplikacja"
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
            insertNewCategory: "/insert-category",
            insertNewPlace: "/insert-place"
        },
        push: {
            subscribe: "/subscribe"
        },
        user: {
            changeEmail: "/change-email",
            changePassword: "/change-password"
        }
    },
};

export default urls;