export type TOnConfirmActionsForUnsolvedProblems =
    | "TAKE ON PROBLEM"
    | "REJECT PROBLEM"
    | "UPDATE PROBLEM"
    | "MARK PROBLEM AS SOLVED";

export type TOnConfirmActionsForSolvedProblems = "MARK PROBLEM AS UNSOLVED";

export type TOnConfirmChangeUserData = "CHANGE PASSWORD" | "CHANGE EMAIL";

export interface IOnConfirmActionsForUnsolvedProblems{
    "TAKE ON PROBLEM" : () => Promise<void>;
    "REJECT PROBLEM" : () => Promise<void>;
    "UPDATE PROBLEM" : () => Promise<void>;
    "MARK PROBLEM AS SOLVED" : () => Promise<void>;
}

export interface IOnConfirmActionsForSolvedProblems{
    "MARK PROBLEM AS UNSOLVED" : () => Promise<void>;
}

export interface IOnConfirmChangeUserData {
    "CHANGE PASSWORD" : () => Promise<void>;
    "CHANGE EMAIL" : () => Promise<void>;
}