/** The code defines a constant variable `urls` which is an object containing various URLs categorized
under `client` and `backend`. */
const urls = {
    client: {
        mainpage: "/",
        about: "/o-aplikacji",
        login: "/logowanie",
        problems: "/zgloszenia",
        archive: "/archiwum",
        account: "/konto",
        manageapp: "/zarzadzanie-aplikacja",
        displaylog: "/dziennik-log"
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
            insertComment: "/insert-comment",
            getComments: "/get-comments",
        },
        forms: {
            getCategories: "/get-categories",
            getPlaces: "/get-places",
            insertNewCategory: "/insert-category",
            insertNewPlace: "/insert-place",
            deleteCategory: "/delete-category",
            deletePlace: "/delete-place"
        },
        push: {
            subscribe: "/subscribe"
        },
        user: {
            changeEmail: "/change-email",
            changePassword: "/change-password",
            addNewAdministrator: "/add-new-administrator",
            deleteAdministrator: "/delete-administrator",
            getAdmins: "/get-admins"
        },
        logs: {
            getLogData: "/get-logs"
        }
    },
} as const;

export default urls;