import { useQuery } from "react-query";
import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Form, ListGroup } from "react-bootstrap";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import { ICategory } from "../../../types/forms-data";
import FormInput from "../../partials/form-input";
import { IFormInputControl } from "../../../types/input";
import { TInsertCategoryNames } from "../../../types/form-inputs-names";
import { deleteCategory, getCategories, insertNewCategory } from "../../../fetchers/apiRequestFunctions";
import { AuthData } from "../../../auth/AuthWrapper";
import "../../../styles/list-container.css"

interface IInsertCategoryValues { newCategoryName: string, priority: string };

const ManageCategories = () => {

    const { user } = AuthData();

    const [insertCategoryValues, setInsertCategoryValues] = useState<IInsertCategoryValues>({ newCategoryName: "", priority:"3" })

    const getCategoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });

    const insertNewCategoryFormControls: IFormInputControl<TInsertCategoryNames>[] = [
        {
            id: 2,
            name: "newCategoryName",
            type: "text",
            placeholder: "Nazwa nowej kategorii...",
            label: "Nazwa nowej kategorii:"
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
    ]

    useEffect(() => {
        if (
            (getCategoriesQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }
    }, [getCategoriesQuery.isError]);

    if (getCategoriesQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
    )
    if (getCategoriesQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInsertCategoryValues((prevState: IInsertCategoryValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleResetFormData = () => {
        setInsertCategoryValues((prevState: IInsertCategoryValues) => {
            return { ...prevState, newCategoryName: "" }
        })
    }

    const handleOnInsertCategoryFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await insertNewCategory(user.AuthToken, insertCategoryValues.newCategoryName, insertCategoryValues.priority)
            handleResetFormData();
            callSuccess("Dodano nową kategorię!")
            getCategoriesQuery.refetch();
        } catch {
            callError("Błąd podczas dodawania kategorii!");
        }
    }

    const handleDeleteCategory = async (CategoryID: string) => {
        try {
            await deleteCategory(user.AuthToken, CategoryID);
            callSuccess("Usunięto kategorię!");
            getCategoriesQuery.refetch();
        } catch (error) {
            callError("Błąd podczas usuwania kategorii.")
        }
    }

    return (
        <article>
            <h2>Zarządzanie kategoriami</h2>
            <p className="text-justify">Możesz dodać lub usunąć kategorię, pod warunkiem, że aktualnie nie jest ona przypisana do jakiegokolwiek zgłoszenia w bazie danych.</p>
            <ListGroup>
                <div className="list-container">
                    {
                        getCategoriesQuery.data.map((element: ICategory) => {
                            return <ListGroup.Item key={Math.random()} className="d-flex justify-content-between">{element.name} [{element.priority}]
                                <Button variant="danger" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteCategory(element._id)}>
                                    <i className="bi bi-x-circle"></i>
                                </Button>
                                </ListGroup.Item>
                        })
                    }
                </div>
                <ListGroup.Item>
                    <Form onSubmit={handleOnInsertCategoryFormSubmit}>

                        {insertNewCategoryFormControls.map(input => {
                            return <FormInput key={input.id} {...input} value={insertCategoryValues[input.name]} onChange={handleOnChange} />
                        })}
                        <Button variant="primary" type="submit">Dodaj kategorię</Button>

                    </Form>
                </ListGroup.Item>
            </ListGroup>
        </article>
    )
}

export default ManageCategories;