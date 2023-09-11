import IComment from "../../types/comment";

const Comment = ({date, content, administratorName}: IComment) => {
    return (
        <article className="my-2 border p-3">
            <div className="d-flex justify-content-between h5">
                <p>{administratorName}</p>
                <p>{new Date(date).toLocaleString("pl")}</p></div>
            <div>{content}</div>
        </article>
    )
}

export default Comment;