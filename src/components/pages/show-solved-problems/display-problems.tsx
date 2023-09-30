import { createContext, useContext, useState, useEffect, FormEvent } from "react";
import { Alert, Button, Form, Pagination } from "react-bootstrap";
import { useQuery } from "react-query";
import { AuthData } from "../../../auth/AuthWrapper";
import IProblem from "../../../types/problem";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import SolvedProblem from "./solved-problem";
import { deleteProblems, getSolvedProblems } from "../../../fetchers/apiRequestFunctions";
import ConfirmationModal from "../../partials/confirm-modal";

const RefreshContext = createContext<{ refreshPage: () => void }>({ refreshPage: () => { } })

export const Refresh = () => useContext(RefreshContext);

const DisplaySolvedProblems = () => {

    const [page, setPage] = useState<number>(1);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const [problemsToDelete, setProblemsToDelete] = useState<FormDataEntryValue[]>([]);

    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

    const showConfirmationModal = () => {
        setConfirmationModal(true)
    }

    const hideConfirmationModal = () => {
        setConfirmationModal(false)
    }

    const onConfirm = async () => {
        if(problemsToDelete.length < 1){
            callError("Zaznacz zgłoszenia do usunięcia!")
            return;
        }
        console.log(problemsToDelete)
        try {
            await deleteProblems(user.AuthToken, problemsToDelete);
            callSuccess("Udało się usunać zgłoszenia!")
            problemsQuery.refetch();
        } catch {
            callError("Błąd podczas usuwania zgłoszenia!");
        }
    }

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

    const submitDeleteProblems = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const rawdata = new FormData(form);

        setProblemsToDelete(Array.from(rawdata.getAll("toDelete")))
        showConfirmationModal();

    }

    const totalPages = Math.ceil(problemsQuery.data.totalCount / PAGE_SIZE);

    return (
        <>
            <ConfirmationModal show={confirmationModal} onHide={hideConfirmationModal} onConfirm={onConfirm} />
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
                    <Form onSubmit={submitDeleteProblems}>
                        <div className="d-flex justify-content-center gap-3 mb-4">
                            <Button type="submit" variant="danger">Usuń zgłoszenia</Button>
                            <Button type="reset">Wyczyść</Button>
                        </div>
                        <div className="row g-3">
                            {problemsQuery.data.items.map((item: IProblem, index: number) => (
                                <SolvedProblem key={item._id} {...item} />
                            ))}

                        </div>


                    </Form>

                </section>
            </RefreshContext.Provider>
        </>
    )
}

export default DisplaySolvedProblems;