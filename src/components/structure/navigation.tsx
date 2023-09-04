import { IGroupedNavigation, INavigation } from "../../types/navigation";
import { About } from "../pages/about";
import Account from "../pages/account/account";
import ReportProblem from "../pages/report-problem/report-problem";
import urls from "../../utils/urls";
import Login from "../pages/login/login";
import ShowUnsolvedProblems from "../pages/show-unsolved-problems/show-unsolved-problems";
import ArchiveOfProblems from "../pages/show-solved-problems/archive-of-problems";
import { ManageApplication } from "../pages/manage-application/manage-app-page";
import LogDataPage from "../pages/log/log-data-page";

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
    isPrivate: true,
    navs: [
      { id: "4.1", path: urls.client.problems, name: "Zgłoszenia", element: <ShowUnsolvedProblems />, isMenu: true, isPrivate: true },
      { id: "4.2", path: urls.client.archive, name: "Archiwum", element: <ArchiveOfProblems />, isMenu: true, isPrivate: true },
      {
        id: "4.3",
        path: urls.client.account,
        name: "Konto",
        element: <Account />,
        isMenu: true,
        isPrivate: true,
      },
      { id:"4.4", path: urls.client.manageapp, name: "Zarządzanie", element: <ManageApplication />, isMenu: true, isPrivate: true},
      { id:"4.5", path: urls.client.displaylog, name: "Dziennik LOG", element: <LogDataPage />, isMenu: true, isPrivate: true}
    ],
  },
];
