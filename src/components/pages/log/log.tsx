import { ILOG } from "../../../types/log";

const LOG = ({date, content, error}: ILOG) => {
    return (
        <article className="my-2 border p-3">
            <div>{new Date(date).toLocaleString("pl")}</div>
            <div>{content}</div>
            <div>{error}</div>
        </article>
    )
}

export default LOG;