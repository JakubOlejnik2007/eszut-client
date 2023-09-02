import { useState, useEffect, createContext, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useQuery } from "react-query";
import { AuthData } from "../../../auth/AuthWrapper";
import IProblem from "../../../types/problem";
import { callError } from "../../../utils/toast-notifications/toast";
import UnsolvedProblem from "./unsolved-problem";
import { getUnsolvedProblems } from "../../../fetchers/apiRequestFunctions";

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
            <section>
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