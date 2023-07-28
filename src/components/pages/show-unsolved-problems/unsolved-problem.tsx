import classNames from "classnames"
import IProblem from "../../../types/problem";
import TableRow from "../../partials/table-row";

const UnsolvedProblem: React.FC<IProblem> = (props) => {

    let when = new Date(props.when);
    let deadline = new Date(props.when + (43200000 * 2 ** (Number(props.priority) - 1)))
    let timeToDeadline = props.when + (43200000 * 2 ** (Number(props.priority) - 1)) - Date.now()

    return (
        <>
            <article className="col-md-6 col-lg-4">
                <div className="border">
                    <div className="row gx-1">
                        <div className={classNames("col-6", {
                            "bg-danger": Number(props.priority) === 1,
                            "bg-warning": Number(props.priority) === 2
                        })}>&nbsp;</div>
                        <div className={timeToDeadline <= 0 ? classNames("col-6", "after-deadline") : "col-6"}>&nbsp;</div>
                        <TableRow first_col={"id"} second_col={<span className="smaller-text">{props._id}</span>} />
                        <TableRow first_col={"Kategoria"} second_col={props.categoryName} />
                        <TableRow first_col={"Opis"} second_col={props.what} />
                        <TableRow first_col={"Priorytet"} second_col={props.priority} />
                        <TableRow first_col={"Miejsce zgłoszenia"} second_col={props.placeName} />
                        <TableRow first_col={"Zgłaszający"} second_col={props.who} />
                        <TableRow first_col={"Data zgłoszenia"} second_col={when.toLocaleString("pl")} />
                        <TableRow first_col={"Termin"} second_col={deadline.toLocaleString("pl")} />
                        <TableRow first_col={"Realizowane"} second_col={props.isUnderRealization ? "Tak" : "Nie"} />
                        {props.isUnderRealization && <TableRow first_col={"Realizujący"} second_col={props.whoDeals} />}
                    </div>
                </div>
            </article>
        </>

    )
}

export default UnsolvedProblem;