import classNames from "classnames";
import IProblem from "../../../types/problem";
import TableRow from "../../partials/table-row";

const SolvedProblem: React.FC<IProblem> = (props) => {
    return <>
        <article className="col-md-6 col-lg-4">
                <div className="border">
                    <div className="row gx-1">
                        <div className={classNames("col-6", {
                            "bg-danger": Number(props.priority) === 1,
                            "bg-warning": Number(props.priority) === 2
                        })}>&nbsp;</div>
                        <div className="col-6 p-1 text-center text-light">Rozwiązane</div>
                        <TableRow first_col={"id"} second_col={<span className="smaller-text">{props._id}</span>} />
                        <TableRow first_col={"Kategoria"} second_col={props.categoryName} />
                        <TableRow first_col={"Opis"} second_col={props.what} />
                        <TableRow first_col={"Priorytet"} second_col={props.priority} />
                        <TableRow first_col={"Miejsce zgłoszenia"} second_col={props.placeName} />
                        <TableRow first_col={"Zgłaszający"} second_col={props.who} />
                        <TableRow first_col={"Data zgłoszenia"} second_col={props.when.toLocaleString("pl")} />
                        <TableRow first_col={"Data rozwiązania"} second_col={props.dateOfSolved.toLocaleString("pl")} />
                        <TableRow first_col={"Rozwiązał"} second_col={props.whoSolved} />
                    </div>
                </div>
            </article>
    </>
}

export default SolvedProblem;