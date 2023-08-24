import { useQuery } from "react-query";
import fetchCategories from "../../../fetchers/fetch-categories";
import { useEffect, useState } from "react";
import { Alert, Button, Form, ListGroup } from "react-bootstrap";
import { callError } from "../../../utils/toast-notifications/toast";
import { ICategory } from "../../../types/forms-data";
import FormInput from "../../partials/form-input";
import { IFormInput } from "../../../types/input";
import { TAddCategoryNames } from "../../../types/form-inputs-names";

interface IAddCategoryValues { newCategoryName: string };

const ManageCategories = () => {

    const [addCategoryValues, setAdddCategoryValues] = useState<IAddCategoryValues>({newCategoryName: ""})

    const getCategoriesQuery = useQuery("categories", fetchCategories, { staleTime: 60000 });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdddCategoryValues((prevState: IAddCategoryValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        if (
            (getCategoriesQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }
    }, [getCategoriesQuery.isError]);

    const changeEmailFormControls: IFormInput<TAddCategoryNames>[] = [
        {
            id: 1,
            name: "newCategoryName",
            type: "text",
            placeholder: "Nazwa nowej kategorii...",
            label: "Nazwa nowej kategorii:"
        }
    ]

    if (getCategoriesQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
    )
    if (getCategoriesQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );

    return (
        <>
            <h2>Zarządzanie kategoriami</h2>
            <p className="text-justify">Możesz dodać lub usunąć kategorię, pod warunkiem, że aktualnie nie jest ona przypisana do jakiegokolwiek zgłoszenia w bazie danych.</p>
            <ListGroup>
                {
                    getCategoriesQuery.data.map((element: ICategory) => {
                        return <ListGroup.Item>{element.name}
                            <Button variant="danger" className="float-end">
                                <i className="bi bi-x-circle"></i>
                            </Button></ListGroup.Item>
                    })
                }
                <ListGroup.Item>
                    <Form>
                        <div>
                            {changeEmailFormControls.map(input => {
                                return <FormInput key={input.id} {...input} value={addCategoryValues[input.name]} onChange={handleOnChange} />
                            })}
                            <Button variant="primary" type="submit">Zatwierdź zmianę adresu email</Button>
                        </div>
                    </Form>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default ManageCategories;