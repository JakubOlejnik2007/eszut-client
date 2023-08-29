import ReportProblemForm from "./form";

const ReportProblem = () => {
  

  return (
    <div>
      <h1 className='text-center'>Zgłoszenie usterki</h1>
      <div className='row d-flex flex-row-reverse flex-sm-row'>
        <div className='col-sm-5 p-3 order-2 order-sm-1'>
          <h2 className='h3 text-center'>Instrukcja</h2>
          <p className='text-justify'>
            Formularz znajdujący się na tej stronie umożliwia zgłoszenie
            wystąpienia usterki związanej z komputerem, dziennikiem, rzutnikiem
            itp.
            <br />W tym celu należy wypełnić formularz, podając dane na temat
            osoby, która zgłasza wystąpeinie problemu, wskazać lokalizację
            usterki (numer sali), a także pozostawić zwięzły opis tego co się
            stało oraz wybrać jedną z dostępnych kategorii zgłoszenia.
            Zgłoszenie musi zawierać ustawiony priorytet (domyślnie najniższy)
          </p>
          <ul className='text-justify'>
            <li>
              <span className='bg-danger p-1 text-light'>Poziom 1</span> -
              najwyższy. Zgłoszenie w takiej grupie powinno zostać rozwiązane w
              przeciągu 12h od zgłoszenia. Mówimy tutaj o awariach, które
              istotnie wpływają na pracę, a znalazienie alternatywnego
              rozwiązania problemu nie jest bezpośrednio możliwe.
            </li>
            <li>
              <span className='bg-warning p-1'>Poziom 2</span> - średni.
              Zgłoszenie w takiej grupie powinno zostać rozwiązane w przeciągu
              24h od zgłoszenia. Mówimy tutaj o awariach, które nie wpływają
              silnie na pracę, a znalazienie alternatywnego rozwiązania problemu
              jest możliwe. Długotrwałe utrzymanie alternatywnego rozwiązania
              nie jest możliwe.
            </li>
            <li>
              Poziom 3 - najniższy. Zgłoszenie w takiej grupie powinno zostać
              rozwiązane w przeciągu 48h od zgłoszenia. Mówimy tutaj o awariach,
              których wpływ na pracę jest znikomy, znalezienie alternatywnego
              rozwiązania jest możliwe, a długotrwałe jego eksploatowanie nie ma
              negatywnych konsekwencji.
            </li>
          </ul>
        </div>
        <div className='col-sm-7 p-3 order-1 order-sm-2'>
          <ReportProblemForm />
        </div>
      </div>
    </div>
  );
};

export default ReportProblem;
