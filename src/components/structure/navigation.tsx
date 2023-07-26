import { IGroupedNavigation, INavigation } from "../../types/navigation";
import { About } from "../pages/about";
import { Account } from "../pages/account";
import ReportProblem from "../pages/report-problem-page/report-problem";
//import ShowProblems from "../pages/show-unsolved-problem/show-unsolved-problems.page"
import urls from "../../utils/urls";
import React from "react";
import Login from "../pages/login/login";

export const nav: (INavigation | IGroupedNavigation)[] = [
  {
    id: "1",
    path: urls.client.mainpage,
    name: "Zgłoś usterkę",
    element: <ReportProblem />,
    isMenu: true,
    isPrivate: false,
  },
  {
    id: "2",
    path: urls.client.about,
    name: "O aplikacji",
    element: <About />,
    isMenu: true,
    isPrivate: false,
  },
  { id: "3", path: urls.client.login, name: "Zalugj się do PA", element: <Login />, isMenu: false, isPrivate: false },
  {
    id: "4",
    name: "Panel administratora",
    isMenu: true,
    isPrivate: false,
    navs: [
      //{ id: "4.1", path: urls.client.problems, name: "Zgłoszenia", element: <ShowProblems />, isMenu: true, isPrivate: false },
      {
        id: "4.2",
        path: urls.client.account,
        name: "Account",
        element: <Account />,
        isMenu: true,
        isPrivate: false,
      },
    ],
  },
];
