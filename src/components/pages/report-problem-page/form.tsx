import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TReportFormNames } from "../../../types/form-inputs-names";
import FormInput from "../../partials/form-input";
import { useState, useEffect, FormEvent } from "react";
import { useQuery } from "react-query";
import fetchCategories from "../../../fetchers/fetch-categories";
import fetchPlaces from "../../../fetchers/fetch-places";
import { IFormInput } from "../../../types/input";
import { callError, callLoadingWithPromise, callSuccess } from "../../../utils/toast-notifications/toast";
import { Alert } from "react-bootstrap";
import urls from "../../../utils/urls";
import axios from "axios";
import { IProblemForm } from "../../../types/problem";
import { config } from "../../../utils/config";
import mapOptions from "../../../utils/map-form-options";
const ReportProblemForm = () => {





  const query1 = useQuery("categories", fetchCategories, { staleTime: 60000 });
  const query2 = useQuery("places", fetchPlaces, { staleTime: 60000 });
  const [formValues, setFormValues] = useState({
    who: "",
    PlaceID: "",
    what: "",
    CategoryID: "",
    priority: 3,
  });



  useEffect(() => {
    if (
      (query1.isError) ||
      (query2.isError)
    ) {
      callError(
        "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
      );
    }
  }, [query1.error, query1.isError, query2.error, query2.isError]);

  

  if (query1.isError || query2.isError) return (
    <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
  )
  if (query1.isLoading || query2.isLoading) return (
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

  const categories = query1.data
  const places = query2.data
  const inputs: IFormInput<TReportFormNames>[] = [
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
    {
      id: 5,
      name: "priority",
      type: "select",
      label: "Priorytet usterki:",
      options: [
        { value: "3", label: "Najniższy" },
        { value: "2", label: "Średni" },
        { value: "1", label: "Najwyższy" },
      ],
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
      !('priority' in data && String(data.priority) !== "") ||
      !('what' in data && data.what !== "")
    ) {

      callError("Brakuje danych do wysłania zgłoszenia!")
    }
    else {
      const response = await callLoadingWithPromise(
        "Dodawanie zgłoszenia...",
        axios.post(`${config.backend}${urls.backend.problem.insertProblem}`, data),
        "Udało się dodać zgłoszenie!",
        "Nie udało się dodać zgłoszenia!"
      );
      if (response.status === 200) {
        callSuccess("Udało się dodać zgłoszenie!");
        handleReset();
      }
    }
  }


  return (
    <Form
      onSubmit={handleSubmit}
    >
      <h2 className='h3 text-center'>Formularz</h2>
      {inputs.map((input, _) => {
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
