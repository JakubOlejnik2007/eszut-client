import { IGroupedNavigation, INavigation } from "../../types/navigation";
import { About } from "../pages/about";
import { Account } from "../pages/account";
import ReportProblem from "../pages/report-problem-page/report-problem";
import urls from "../../utils/urls";
import Login from "../pages/login/login";
import ShowUnsolvedProblems from "../pages/show-unsolved-problems/show-unsolved-problems";

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
      { id: "4.1", path: urls.client.problems, name: "Zgłoszenia", element: <ShowUnsolvedProblems />, isMenu: true, isPrivate: false },
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
