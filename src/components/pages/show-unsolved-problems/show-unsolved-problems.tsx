import { useState, useEffect, createContext, useContext } from "react";
import { Alert } from "react-bootstrap";
import { AuthData } from "../../../auth/AuthWrapper";
import IProblem from "../../../types/problem";
import { useQuery } from "react-query";
import fetchUnsolvedProblems from "../../../fetchers/fetch-unsolved-problems";
import { callError } from "../../../utils/toast-notifications/toast";
import isReactQueryError from "../../../utils/type-guards/react-query-error";
import UnsolvedProblem from "./unsolved-problem";

const RefreshContext = createContext<{ refreshPage: () => void }>({ refreshPage: () => { } })

export const Refresh = () => useContext(RefreshContext);

const ShowUnsolvedProblems = () => {

    const [refresh, setRefresh] = useState<boolean>(false);

    const refreshPage = () => {
        problemsQuery.refetch();
        setRefresh(!refresh)
    };

    const { user } = AuthData();
    const [underYou, setUnderYou] = useState<IProblem[]>([]);
    const [underRealization, setUnderRealization] = useState<IProblem[]>([]);
    const [other, setOther] = useState<IProblem[]>([]);
    const problemsQuery = useQuery("unsolved-problems", () =>
        fetchUnsolvedProblems(user.AuthToken)
        , { staleTime: 60000, /*enabled: !!user.AuthToken*/ });


    useEffect(() => {
        if (
            (problemsQuery.isError && isReactQueryError(problemsQuery.error))
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
    }, [problemsQuery.isError, problemsQuery.error, problemsQuery.isSuccess, problemsQuery.data, user.id]);

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
            <div className="page text-justify">
                <section className="row p-4">
                    <h1>Aktywne zgłoszenia</h1>
                    <p>
                        Poniżej umieszczone są informacje o aktywnych zgłoszeniach. Pogrupowane są one w trzy grupy, które odwzorowywują priorytet zgłoszenia. Wyróżnia się trzy poziomy:
                    </p>
                    <ul>
                        <li><span className="bg-danger p-1 text-light">Poziom 1</span> - najwyższy. Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu 12h od zgłoszenia. Mówimy tutaj o awariach, które istotnie wpływają na pracę, a znalazienie alternatywnego rozwiązania problemu nie jest bezpośrednio możliwe.</li>
                        <li><span className="bg-warning p-1">Poziom 2</span> - średni. Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu 24h od zgłoszenia. Mówimy tutaj o awariach, które nie wpływają silnie na pracę, a znalazienie alternatywnego rozwiązania problemu jest możliwe. Długotrwałe utrzymanie alternatywnego rozwiązania nie jest możliwe.</li>
                        <li>Poziom 3 - najniższy. Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu 48h od zgłoszenia. Mówimy tutaj o awariach, których wpływ na pracę jest znikomy, znalezienie alternatywnego rozwiązania jest możliwe, a długotrwałe jego eksploatowanie nie ma negatywnych konsekwencji.</li>
                    </ul>
                    <p>
                        Zgłoszenia reprezentowane są tutaj przez tabele. Tabele są oznaczone jednym z kolorów zależnie od ich priorytetu. W przypadku zgłoszeń, których termin został przekroczony oznaczone są <span className="after-deadline">paskiem z zmiennymi kolorami</span>.
                    </p>
                </section>



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
            </div>
        </RefreshContext.Provider>
    )
}

export default ShowUnsolvedProblems;