export interface INavigation  {
    id: string,
    path: string,
    name: string,
    element: any,
    isMenu: boolean,
    isPrivate: boolean
}

export interface IGroupedNavigation {
    id: string,
    name: string,
    isMenu: boolean,
    isPrivate: boolean,
    navs: INavigation[]
}