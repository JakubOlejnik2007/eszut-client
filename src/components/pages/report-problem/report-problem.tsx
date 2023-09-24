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
            Do zgłoszenia jest przypisywany domyślny priorytet, który wynika z kategorii.
          </p>
          <p className="small text-center">
            Autor aplikacji:{' '}
            <em className="fw-bold">
              Jakub Olejnik 2C
            </em>{' '}&copy; 2023
          </p>
        </div>
        <div className='col-sm-7 p-3 order-1 order-sm-2'>
          <ReportProblemForm />
        </div>
      </div>
    </div>
  );
};

export default ReportProblem;
