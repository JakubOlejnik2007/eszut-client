import { useState, useEffect, createContext, useContext, ChangeEvent } from "react";
import { Alert, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import { AuthData } from "../../../auth/AuthWrapper";
import IProblem from "../../../types/problem";
import { callError } from "../../../utils/toast-notifications/toast";
import UnsolvedProblem from "./unsolved-problem";
import { getUnsolvedProblems } from "../../../fetchers/apiRequestFunctions";
import calculateDates from "../../../utils/calculate-dates";
const RefreshContext = createContext<{ refreshPage: () => void }>({ refreshPage: () => { } })

export const Refresh = () => useContext(RefreshContext);

const DisplayUnsolvedProblems = () => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const { user } = AuthData();
    const [underYou, setUnderYou] = useState<IProblem[]>([]);
    const [underRealization, setUnderRealization] = useState<IProblem[]>([]);
    const [other, setOther] = useState<IProblem[]>([]);
    const problemsQuery = useQuery("unsolved-problems", () =>
        getUnsolvedProblems(user.AuthToken)
        , { staleTime: 10000, enabled: !!user.AuthToken });

    const refreshPage = () => {
        problemsQuery.refetch();
        setRefresh(!refresh)
    };

    const sort = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        switch (e.target.value) {
            case "default": sortFunc(sortingPatterns.byDateDesc); sortFunc(sortingPatterns.byPriority); break;
            case "category": sortFunc(sortingPatterns.byCategory); break;
            case "date-down": sortFunc(sortingPatterns.byDateDesc); break;
            case "date-up": sortFunc(sortingPatterns.byDateAsc); break;
            case "priority": sortFunc(sortingPatterns.byPriority); break;
            case "deadline": sortFunc(sortingPatterns.byDeadline); break;
        }
    }

    type TSortingPattern = (a: IProblem, b: IProblem) => number

    interface ISortingPatterns {
        byCategory: TSortingPattern;
        byDateAsc: TSortingPattern;
        byDateDesc: TSortingPattern;
        byPriority: TSortingPattern;
        byDeadline: TSortingPattern;
    }

    const sortingPatterns: ISortingPatterns = {
        byCategory: (a, b) => a.categoryName.localeCompare(b.categoryName),
        byDateAsc: (a, b) => a.when - b.when,
        byDateDesc: (a, b) => b.when - a.when,
        byPriority: (a, b) => Number(a.priority) - Number(b.priority),
        byDeadline: (a, b) => Number(calculateDates(Number(a.priority), a.when).deadline) - Number(calculateDates(Number(b.priority), b.when).deadline)
    }

    const sortFunc = (pattern: ((a: IProblem, b: IProblem) => number)) => {
        const sortedUnderYou = [...underYou].sort(pattern);
        setUnderYou(sortedUnderYou);

        const sortedUnderRealization = [...underRealization].sort(pattern);
        setUnderRealization(sortedUnderRealization);

        const sortedOther = [...other].sort(pattern);
        setOther(sortedOther);
    }


    useEffect(() => {
        if (
            (problemsQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }

        if (problemsQuery.isSuccess) {
            const underYouProblems: IProblem[] = [];
            const underRealizationProblems: IProblem[] = [];
            const otherProblems: IProblem[] = [];
            problemsQuery.data.forEach((element: IProblem) => {
                if (element.isUnderRealization && element.whoDealsID && user.id === element.whoDealsID) {
                    underYouProblems.push(element);
                } else if (element.isUnderRealization) {
                    underRealizationProblems.push(element);
                } else {
                    otherProblems.push(element);
                }
            });

            setUnderYou(underYouProblems);
            setUnderRealization(underRealizationProblems);
            setOther(otherProblems);
        }
    }, [problemsQuery.isError, problemsQuery.error, problemsQuery.isSuccess, problemsQuery.data, user.id, user.AuthToken]);

    if (problemsQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Brak dostępu do danych</Alert>
    )
    if (problemsQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );
    return (

        <RefreshContext.Provider value={{ refreshPage }}>
            <section className="container">
                <Form.Select className="ms-auto mr-0 w-50" onChange={(e: ChangeEvent<HTMLSelectElement>) => sort(e)}>
                    <option value="default">Domyślne</option>
                    <option value="date-down">Data &darr;</option>
                    <option value="date-up">Data &uarr;</option>
                    <option value="category">Kategoria</option>
                    <option value="priority">Priorytet</option>
                    <option value="deadline">Priorytet</option>
                </Form.Select>
                <div className="row g-3">
                    <h2>Realizowane przez Ciebie</h2>
                    {
                        underYou.map((item, _) => {
                            return (
                                <UnsolvedProblem key={item._id} {...item} />
                            )
                        })
                    }
                </div>
                <div className="row g-3">
                    <h2>W trakcie realizacji</h2>
                    {
                        underRealization.map((item, _) => {
                            return (
                                <UnsolvedProblem key={item._id} {...item} />
                            )
                        })
                    }
                </div>
                <div className="row g-3">
                    <h2>Pozostałe zgłoszenia</h2>
                    {
                        other.map((item, _) => {
                            return (
                                <UnsolvedProblem key={item._id} {...item} />
                            )
                        })
                    }
                </div>


            </section>
        </RefreshContext.Provider>
    )
}

export default DisplayUnsolvedProblems;