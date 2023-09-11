import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TReportFormNames } from "../../../types/form-inputs-names";
import FormInput from "../../partials/form-input";
import { useState, useEffect, FormEvent } from "react";
import { useQuery } from "react-query";
import { IFormInputControl } from "../../../types/input";
import { callError, callLoadingWithPromise } from "../../../utils/toast-notifications/toast";
import { Alert } from "react-bootstrap";
import urls from "../../../utils/urls";
import axios from "axios";
import { IProblemForm } from "../../../types/problem";
import { config } from "../../../utils/config";
import mapOptions from "../../../utils/map-form-options";
import { getCategories, getPlaces } from "../../../fetchers/apiRequestFunctions";

interface IFormValues {
  who: string,
  PlaceID: string,
  what: string,
  CategoryID: string,
  priority: number
}

const ReportProblemForm = () => {

  const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
  const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

  const [formValues, setFormValues] = useState<IFormValues>({
    who: "",
    PlaceID: "",
    what: "",
    CategoryID: "",
    priority: 3,
  });



  useEffect(() => {
    if (
      (categoriesQuery.isError) ||
      (placesQuery.isError)
    ) {
      callError(
        "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
      );
    }
  }, [categoriesQuery.error, categoriesQuery.isError, placesQuery.error, placesQuery.isError]);



  if (categoriesQuery.isError || placesQuery.isError) return (
    <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
  )
  if (categoriesQuery.isLoading || placesQuery.isLoading) return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="spinner-border" role="status">
      </div>
    </div>
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormValues({
      who: "",
      PlaceID: "",
      what: "",
      CategoryID: "",
      priority: 3,
    });
  };

  const categories = categoriesQuery.data
  const places = placesQuery.data
  const inputs: IFormInputControl<TReportFormNames>[] = [
    {
      id: 1,
      name: "who",
      type: "text",
      label: "Zgłaszający:",
      placeholder: "Dane zgłaszającego",
    },
    {
      id: 2,
      name: "PlaceID",
      type: "select",
      label: "Miejsce usterki:",
      options: mapOptions(places),
    },
    {
      id: 3,
      name: "what",
      type: "textarea",
      label: "Opis usterki:",
      placeholder: "Opis usterki",
    },
    {
      id: 4,
      name: "CategoryID",
      type: "select",
      label: "Kategoria zgłoszenia",
      options: mapOptions(categories),
    },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const rawdata = new FormData(form);
    const data = Object.fromEntries(rawdata.entries()) as unknown as IProblemForm;

    if (
      !('who' in data && data.who !== "") ||
      !('PlaceID' in data && data.PlaceID !== "") ||
      !('CategoryID' in data && data.CategoryID !== "") ||
      !('what' in data && data.what !== "")
    ) {

      callError("Brakuje danych do wysłania zgłoszenia!")
    }
    else {
      await callLoadingWithPromise(
        "Dodawanie zgłoszenia...",
        axios.post(`${config.backend}${urls.backend.problem.insertProblem}`, data),
        () => {
          handleReset();
          return "Udało się dodać zgłoszenie!"
        },
        "Nie udało się dodać zgłoszenia!"
      );
    }
  }


  return (
    <Form
      onSubmit={handleSubmit}
    >
      <h2 className='h3 text-center'>Formularz</h2>
      {inputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            value={formValues[input.name]}
            onChange={onChange}
          />
        );
      })}
      <Button variant='primary' type='submit'>
        Zgłoś problem
      </Button>
      <Button
        variant='primary'
        type='reset'
        onClick={handleReset}
        className='m-1 m-md-3'
      >
        Wyczyść dane
      </Button>
    </Form>
  );
};

export default ReportProblemForm;
