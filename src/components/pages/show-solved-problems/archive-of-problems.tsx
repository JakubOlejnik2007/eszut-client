import DisplaySolvedProblems from "./display-problems";

const ArchiveOfProblems = () => {

    return (
        <div className="text-justify">
            <section className="row p-4">
                <h1>Archiwum zgłoszeń</h1>
                <p>
                    Poniżej umieszczona jest lista wszystkich zgłoszeń w aplikacji, które obecnie oznaczone są jako zgłoszenia rozwiązane.
                </p>
            </section>

            <DisplaySolvedProblems />

        </div>
    )
}

export default ArchiveOfProblems;