import { createContext, useContext, useState, useEffect } from "react";
import { Alert, Pagination } from "react-bootstrap";
import { useQuery } from "react-query";
import { AuthData } from "../../../auth/AuthWrapper";
import IProblem from "../../../types/problem";
import { callError } from "../../../utils/toast-notifications/toast";
import SolvedProblem from "./solved-problem";
import { getSolvedProblems } from "../../../fetchers/apiRequestFunctions";

const RefreshContext = createContext<{ refreshPage: () => void }>({ refreshPage: () => { } })

export const Refresh = () => useContext(RefreshContext);

const DisplaySolvedProblems = () => {

    const [page, setPage] = useState<number>(1);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const PAGE_SIZE = 15;

    const [refresh, setRefresh] = useState<boolean>(false);

    const refreshPage = () => {
        problemsQuery.refetch();
        setRefresh(!refresh)
    };

    const { user } = AuthData();

    const problemsQuery = useQuery(['data', page], () =>
        getSolvedProblems(user.AuthToken, page)
        , { staleTime: 60000, enabled: !!user.AuthToken });


    useEffect(() => {
        if (
            (problemsQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
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


    const totalPages = Math.ceil(problemsQuery.data.totalCount / PAGE_SIZE);

    return (

        <RefreshContext.Provider value={{ refreshPage }}>
            <section>
                <Pagination className="d-flex justify-content-center align-items-center flex-wrap">
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index} active={index + 1 === problemsQuery.data.currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
                <h2>Zgłoszenia</h2>
                <div className="row g-3">
                    {problemsQuery.data.items.map((item: IProblem) => (
                        <SolvedProblem key={item._id} {...item} />
                    ))}

                </div>

            </section>
        </RefreshContext.Provider>
    )
}

export default DisplaySolvedProblems;