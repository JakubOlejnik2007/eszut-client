type TableRowProps = {
    first_col: any,
    second_col: any
    variant?: string
}

const TableRow: React.FC<TableRowProps> = (props) => {
    return (
        <>
        <div className={`col-4 border d-flex justify-content-center align-items-center p-1 text-center ${props.variant==="secondary" ? "bg-secondary" : "" }`}>{props.first_col}</div>
        <div className={`col-8 border d-flex justify-content-center align-items-center p-1 text-center ${props.variant==="secondary" ? "bg-secondary" : "" }`}>{props.second_col}</div>
        </>
    )
}

export default TableRow;