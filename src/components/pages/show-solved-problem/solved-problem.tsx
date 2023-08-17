import classNames from "classnames";
import IProblem from "../../../types/problem";
import TableRow from "../../partials/table-row";
import { useState } from "react";
import SolvedProblemModal from "./solved-problem-modal";

const SolvedProblem: React.FC<IProblem> = (props) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDoubleClick = () => {
        setShowModal(true)
    }

    return <>
        <article className="col-md-6 col-lg-4" onDoubleClickCapture={handleDoubleClick}>
                <div className="border">
                    <div className="row gx-1 text-dark">
                        <div className={classNames("col-12 text-center p-1", {
                            "bg-danger text-light": Number(props.priority) === 1,
                            "bg-warning": Number(props.priority) === 2
                        })}>ROZWIĄZANE</div>
                        <TableRow first_col={"id"} second_col={<span className="smaller-text">{props._id}</span>} />
                        <TableRow first_col={"Kategoria"} second_col={props.categoryName} />
                        <TableRow first_col={"Opis"} second_col={props.what} />
                        <TableRow first_col={"Priorytet"} second_col={props.priority} />
                        <TableRow first_col={"Miejsce zgłoszenia"} second_col={props.placeName} />
                        <TableRow first_col={"Zgłaszający"} second_col={props.who} />
                        <TableRow first_col={"Data zgłoszenia"} second_col={new Date(props.when).toLocaleString("pl")} />
                        <TableRow first_col={"Data rozwiązania"} second_col={new Date(props.dateOfSolved).toLocaleString("pl")} />
                        <TableRow first_col={"Rozwiązał"} second_col={props.whoSolved} />
                    </div>
                </div>

                        <SolvedProblemModal {...props} show={showModal} handleClose={handleCloseModal} />

            </article>
    </>
}

export default SolvedProblem;