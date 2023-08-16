export type TOnConfirmActionsForUnsolvedProblems =
    | "TAKE ON PROBLEM"
    | "REJECT PROBLEM"
    | "UPDATE PROBLEM"
    | "MARK PROBLEM AS SOLVED";

export type TOnConfirmActionsForSolvedProblems = "MARK PROBLEM AS UNSOLVED";


export interface IOnConfirmActionsForUnsolvedProblems{
    "TAKE ON PROBLEM" : () => Promise<void>;
    "REJECT PROBLEM" : () => Promise<void>;
    "UPDATE PROBLEM" : () => Promise<void>;
    "MARK PROBLEM AS SOLVED" : () => Promise<void>;
}

export interface IOnConfirmActionsForSolvedProblems{
    "MARK PROBLEM AS UNSOLVED" : () => Promise<void>;
}
