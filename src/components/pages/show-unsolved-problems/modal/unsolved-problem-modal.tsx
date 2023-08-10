import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthData } from "../../../../auth/AuthWrapper";
import IProblem from "../../../../types/problem";
import calculateDates from "../../../../utils/calculateDates";
import TableRow from "../../../partials/table-row";
import classNames from "classnames";
import { EditCategory, EditPriority } from "./unsolved-problem-modal-partials";
import { IValuesToEdit } from "../../../../types/states";
import putUpdateUnsolvedProblem from "../../../../fetchers/put-update-unsolved-problem";
import { callError, callSuccess } from "../../../../utils/toast-notifications/toast";
import { Refresh } from "../show-unsolved-problems";
import putTakeOnProblem from "../../../../fetchers/put-take-on-problem";
import putRejectProblem from "../../../../fetchers/put-reject-problem";
import putMarkProblemAsSolved from "../../../../fetchers/put-mark-problem-as-solved";
import ConfirmationModal from "../../../partials/confirm-modal";


const UnsolvedProblemModal: React.FC<IProblem & {
	show: boolean;
	handleClose: () => void;
}> = (props) => {
	const { user } = AuthData();

	const { refreshPage } = Refresh();
	const { show, handleClose, ...restProps } = props;
	const [valuesToEdit, setValuesToEdit] = useState<IValuesToEdit>({
		priority: props.priority,
		category: {
			id: props.CategoryID._id,
			name: props.categoryName
		}
	})

	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

	const handleUpdateProblem = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			await putUpdateUnsolvedProblem(user.AuthToken, valuesToEdit.priority, valuesToEdit.category.id, props._id)
			callSuccess("Zgłoszenie zaktualizowane!")
			refreshPage();
		} catch (error) {
			callError("Nie udało się zaktualizować zgłoszenia!")
		}
	}

	const handleOnClickTakeOnProblemButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await putTakeOnProblem(user.AuthToken, user.id, props._id);
			callSuccess("Zgłoszenie zaktualizowane!")
			refreshPage();
		} catch {
			callError("Nie udało sie zaktualizować zgłoszenia!")
		}
	}

	const handleOnClickRejectProblemButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await putRejectProblem(user.AuthToken, props._id);
			callSuccess("Zgłoszenie zaktualizowane!")
			refreshPage();
		} catch {
			callError("Nie udało sie zaktualizować zgłoszenia!")
		}
	}

	const handleCloseModal = () => {
		setShowConfirmationModal(false);
	};

	const handleOnClickMarkProblemAsSolvedButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowConfirmationModal(true)
	}
	const handleConfirm = async () => {
		handleCloseModal();
		try {
			await putMarkProblemAsSolved(user.AuthToken, props._id, user.id);
			callSuccess("Zgłoszenie zaktualizowane!")
			refreshPage();
		} catch {
			callError("Nie udało sie zaktualizować zgłoszenia!")
		}
	};

	const { when, deadline, timeToDeadline } = calculateDates(Number(props.priority), props.when)


	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Edytuj wybrane zgłoszenie</Modal.Title>
			</Modal.Header>
			<ConfirmationModal show={showConfirmationModal} onHide={handleCloseModal} onConfirm={handleConfirm} />
			<Modal.Body className="row gx-1">
				<div className={classNames("col-6", {
					"bg-danger": Number(props.priority) === 1,
					"bg-warning": Number(props.priority) === 2
				})}>&nbsp;</div>
				<div className={timeToDeadline <= 0 ? classNames("col-6", "after-deadline") : "col-6"}>&nbsp;</div>
				<TableRow first_col={"id"} second_col={restProps._id} />
				<TableRow first_col={"Kategoria"} second_col={<EditCategory state={valuesToEdit} setState={setValuesToEdit} />} />
				<TableRow first_col={"Opis"} second_col={restProps.what} />
				<TableRow first_col={"Priorytet"} second_col={<EditPriority state={valuesToEdit} setState={setValuesToEdit} />} />
				<TableRow first_col={"Miejsce zgłoszenia"} second_col={restProps.placeName} />
				<TableRow first_col={"Zgłaszający"} second_col={restProps.who} />
				<TableRow first_col={"Data zgłoszenia"} second_col={when.toLocaleString("pl")} />
				<TableRow first_col={"Termin"} second_col={deadline.toLocaleString("pl")} />
				<TableRow first_col={"Realizowane"} second_col={restProps.isUnderRealization ? "Tak" : "Nie"} />
				{
					user.id === props.whoDealsID && props.isUnderRealization ? <><TableRow first_col={"Zrezygnuj"} second_col={<Button onClick={handleOnClickRejectProblemButton}>Zrezygnuj z  problemu</Button>} />
						<TableRow first_col={"Czy rozwiązany?"} second_col={<Button onClick={handleOnClickMarkProblemAsSolvedButton}>Oznacz problem jako rozwiązany</Button>} /></>
						: restProps.isUnderRealization ? <TableRow first_col={"Realizujący"} second_col={restProps.whoDeals} />
							: <TableRow first_col={"Podejmij problem"} second_col={<Button onClick={handleOnClickTakeOnProblemButton}>Podejmij problem</Button>} />
				}
				<Button variant="secondary" onClick={handleUpdateProblem} className="mt-3">
					Zapisz
				</Button>
			</Modal.Body>
			<Modal.Header>
				<Modal.Title>Komentarze</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/*<CommentsWrapper setError={setError} refresh={restProps.refresh} setRefresh={restProps.setRefresh} ProblemID={restProps._id} />*/}
			</Modal.Body>
		</Modal>
	)
}

export default UnsolvedProblemModal;