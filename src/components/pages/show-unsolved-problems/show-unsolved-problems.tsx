import DisplayUnsolvedProblems from "./display-problems";

const ShowUnsolvedProblems = () => {

    return (
        <div className="text-justify">
            <section className="row p-4">
                <h1>Aktywne zgłoszenia</h1>
                <p>
                    Poniżej znajdują się informacje dotyczące bieżących zgłoszeń. Zgłoszenia te są podzielone na trzy priorytety, które odzwierciedlają ich znaczenie i czas reakcji.
                    Wyróżniamy trzy poziomy priorytetów:
                </p>
                <ul>
                    <li>
                        <span className="bg-danger p-1 text-light">Priorytet 1</span> - Najwyższy poziom priorytetu. Zgłoszenia z tym priorytetem muszą być rozwiązane w ciągu 12 godzin od momentu zgłoszenia. Dotyczy to awarii, które mają znaczący wpływ na pracę i nie ma możliwości znalezienia natychmiastowego alternatywnego rozwiązania.
                    </li>
                    <li>
                        <span className="bg-warning p-1">Priorytet 2</span> - Średni poziom priorytetu. Zgłoszenia z tym priorytetem powinny zostać rozwiązane w ciągu 24 godzin od zgłoszenia. Dotyczy to awarii, które wpływają na pracę, ale istnieje możliwość znalezienia alternatywnego rozwiązania. Długotrwałe utrzymanie alternatywnego rozwiązania może być trudne.
                    </li>
                    <li>
                        Priorytet 3 - Najniższy poziom priorytetu. Zgłoszenia z tym priorytetem powinny zostać rozwiązane w ciągu 48 godzin od zgłoszenia. Dotyczy to awarii, które mają minimalny wpływ na pracę, istnieje możliwość znalezienia alternatywnego rozwiązania, a długotrwałe korzystanie z tego alternatywnego rozwiązania nie ma negatywnych skutków.
                    </li>
                </ul>
                <p>
                    Zgłoszenia są przedstawione w formie tabeli, które są oznaczone różnymi kolorami, zależnie od ich priorytetu. Zgłoszenia, których termin został przekroczony, są wyróżnione za pomocą <span className="after-deadline">paska o zmiennej kolorystyce</span>.
                </p>
            </section>

            <DisplayUnsolvedProblems />


        </div>
    )
}

export default ShowUnsolvedProblems;