import DisplayUnsolvedProblems from "./display-problems";

const ShowUnsolvedProblems = () => {

    return (
        <div className="text-justify">
            <section className="row p-4">
                <h1>Aktywne zgłoszenia</h1>
                <p>
                    Poniżej umieszczone są informacje o aktywnych zgłoszeniach. Pogrupowane są one w trzy grupy, które odwzorowywują priorytet zgłoszenia. Wyróżnia się trzy poziomy:
                </p>
                <ul>
                    <li><span className="bg-danger p-1 text-light">Poziom 1</span> - najwyższy. Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu 12h od zgłoszenia. Mówimy tutaj o awariach, które istotnie wpływają na pracę, a znalazienie alternatywnego rozwiązania problemu nie jest bezpośrednio możliwe.</li>
                    <li><span className="bg-warning p-1">Poziom 2</span> - średni. Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu 24h od zgłoszenia. Mówimy tutaj o awariach, które nie wpływają silnie na pracę, a znalazienie alternatywnego rozwiązania problemu jest możliwe. Długotrwałe utrzymanie alternatywnego rozwiązania nie jest możliwe.</li>
                    <li>Poziom 3 - najniższy. Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu 48h od zgłoszenia. Mówimy tutaj o awariach, których wpływ na pracę jest znikomy, znalezienie alternatywnego rozwiązania jest możliwe, a długotrwałe jego eksploatowanie nie ma negatywnych konsekwencji.</li>
                </ul>
                <p>
                    Zgłoszenia reprezentowane są tutaj przez tabele. Tabele są oznaczone jednym z kolorów zależnie od ich priorytetu. W przypadku zgłoszeń, których termin został przekroczony oznaczone są <span className="after-deadline">paskiem z zmiennymi kolorami</span>.
                </p>
            </section>

            <DisplayUnsolvedProblems />


        </div>
    )
}

export default ShowUnsolvedProblems;