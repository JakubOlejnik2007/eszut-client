import { useState, useEffect } from "react";
import { Alert, Pagination } from "react-bootstrap";
import { useQuery } from "react-query";
import { AuthData } from "../../../auth/AuthWrapper";
import { getLogData } from "../../../fetchers/apiRequestFunctions";
import { callError } from "../../../utils/toast-notifications/toast";
import { ILOG } from "../../../types/log";
import LOG from "./log";

const DisplayLogData = () => {

    const [page, setPage] = useState<number>(1);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const PAGE_SIZE = 50;

    const { user } = AuthData();

    const logsQuery = useQuery(['data', page], () =>
        getLogData(user.AuthToken, page)
        , { staleTime: 60000, enabled: !!user.AuthToken });


    useEffect(() => {
        if (
            (logsQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }
    }, [user.id, user.AuthToken, logsQuery.isError]);

    if (logsQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Brak dostępu do danych</Alert>
    )
    if (logsQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );


    const totalPages = Math.ceil(logsQuery.data.totalCount / PAGE_SIZE);

    return (
            <section>
                <Pagination className="d-flex justify-content-center align-items-center flex-wrap">
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index} active={index + 1 === logsQuery.data.currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
                <div className="row g-3">
                    {logsQuery.data.items.map((item: ILOG) => (
                        <LOG key={item._id} {...item} />
                    ))}

                </div>

            </section>
    )
}

export default DisplayLogData;