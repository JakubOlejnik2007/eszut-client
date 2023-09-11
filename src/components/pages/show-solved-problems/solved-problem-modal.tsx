import classNames from "classnames";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthData } from "../../../auth/AuthWrapper";
import IProblem from "../../../types/problem";
import { callSuccess, callError } from "../../../utils/toast-notifications/toast";
import ConfirmationModal from "../../partials/confirm-modal";
import TableRow from "../../partials/table-row";
import { Refresh } from "./display-problems";
import { putMarkProblemAsUnsolved } from "../../../fetchers/apiRequestFunctions";
import CommentWrapper from "../../partials/comment-wrapper";


const SolvedProblemModal: React.FC<IProblem & {
    show: boolean;
    handleClose: () => void;
}> = (props) => {
    const { user } = AuthData();

    const { refreshPage } = Refresh();
    const { show, handleClose } = props;

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
    };

    const handleOnClickMarkProblemAsUnsolved = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowConfirmationModal(true)
    }

    const handleMarkProblemAsUnsolvedConfirm = async () => {
        try {
            await putMarkProblemAsUnsolved(user.AuthToken, props._id, user.id)
            callSuccess("Zgłoszenie zaktualizowane!")
            refreshPage();
        } catch (error) {
            callError("Nie udało się zaktualizować zgłoszenia!")
        }
    }


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edytuj wybrane zgłoszenie</Modal.Title>
            </Modal.Header>
            <ConfirmationModal show={showConfirmationModal} onHide={handleCloseModal} onConfirm={handleMarkProblemAsUnsolvedConfirm} />
            <Modal.Body className="row gx-1">
                <div className={classNames("col-6", {
                    "bg-danger": Number(props.priority) === 1,
                    "bg-warning": Number(props.priority) === 2
                })}></div>
                <div className="col-6 p-1 text-center text-dark">Rozwiązane</div>
                <TableRow first_col={"id"} second_col={<span className="smaller-text">{props._id}</span>} />
                <TableRow first_col={"Kategoria"} second_col={props.categoryName} />
                <TableRow first_col={"Opis"} second_col={props.what} />
                <TableRow first_col={"Priorytet"} second_col={props.priority} />
                <TableRow first_col={"Miejsce zgłoszenia"} second_col={props.placeName} />
                <TableRow first_col={"Zgłaszający"} second_col={props.who} />
                <TableRow first_col={"Data zgłoszenia"} second_col={new Date(props.when).toLocaleString("pl")} />
                <TableRow first_col={"Data rozwiązania"} second_col={new Date(props.dateOfSolved).toLocaleString("pl")} />
                <TableRow first_col={"Rozwiązał"} second_col={props.whoSolved} />

                <Button variant="secondary" onClick={handleOnClickMarkProblemAsUnsolved} className="mt-3">
                    Oznacz zgłoszenie jako nierozwiązane
                </Button>
            </Modal.Body>
            <Modal.Header>
                <Modal.Title>Komentarze</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CommentWrapper ProblemID={props._id} />
            </Modal.Body>
        </Modal>
    )
}

export default SolvedProblemModal;