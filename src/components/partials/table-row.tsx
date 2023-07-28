type TableRowProps = {
    first_col: any,
    second_col: any
}

const TableRow: React.FC<TableRowProps> = (props) => {
    return (
        <>
        <div className="col-4 border">{props.first_col}</div>
        <div className="col-8 border">{props.second_col}</div>
        </>
    )
}

export default TableRow;