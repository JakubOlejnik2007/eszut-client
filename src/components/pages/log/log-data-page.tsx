import DisplayLogData from "./display-log-data";

const LogDataPage = () => {

    return (
        <div className="text-justify">
            <section className="row p-4">
                <h1>Dziennik LOG</h1>
                <p>
                    Poniżej umieszczona jest lista informacji o istotnych zmianach lub błędach w działaniu aplikacji (niewysłanie maila, dodanie lub usunięcie administratora);
                </p>
            </section>

            <DisplayLogData />

        </div>
    )
}

export default LogDataPage;