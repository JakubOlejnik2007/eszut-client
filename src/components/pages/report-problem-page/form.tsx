import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TReportFormValues } from "../../../types/forms";
import FormInput from "../../partials/form-input";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import fetchCategories from "../../../fetchers/fetch-categories";
import fetchPlaces from "../../../fetchers/fetch-places";
import { ICategory, IPlace, IOption } from "../../../types/forms-data";
import { IFormInput } from "../../../types/input";
import { callError } from "../../../utils/toast-notifications/toast";
import isArrayOfCategories from "../../../utils/type-guards/categories";
import isArrayOfPlaces from "../../../utils/type-guards/places";
import isReactQueryError from "../../../utils/type-guards/react-query-error";
import { Alert } from "react-bootstrap";

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
      (query1.isError && isReactQueryError(query1.error)) ||
      (query2.isError && isReactQueryError(query2.error))
    ) {
      callError(
        "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
      );
    }
  }, [query1.error, query1.isError, query2.error, query2.isError]);

  const mapOptions = (arrayOfOptions: ICategory[] | IPlace[]): IOption[] => {
    return arrayOfOptions.map((item: ICategory | IPlace) => {
      return {
        value: String(item._id),
        label: item.name,
      };
    });
  };
  
  if (query1.isError || query2.isError) return (
    <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
  )
  if (query1.isLoading || query2.isLoading) return <>Loading</>;

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

  let categories, places;
  categories = isArrayOfCategories(query1.data) ? query1.data : [];
  places = isArrayOfPlaces(query2.data) ? query2.data : [];
  const inputs: IFormInput[] = [
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
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
            value={formValues[input.name as TReportFormValues]}
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
