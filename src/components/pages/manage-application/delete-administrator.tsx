import { useState, useEffect, FormEvent } from "react";
import { Alert, ListGroup, Button, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import { AuthData } from "../../../auth/AuthWrapper";
import { deleteAdministrator, getAdmins, getCategories, insertNewCategory } from "../../../fetchers/apiRequestFunctions";
import { TInsertCategoryNames } from "../../../types/form-inputs-names";
import { ICategory } from "../../../types/forms-data";
import { IFormInputControl } from "../../../types/input";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import FormInput from "../../partials/form-input";


const DeleteAdministrator = () => {

    const { user } = AuthData();

    const getAdminsQuery = useQuery("admins", getAdmins, { staleTime: 60000 });

    const insertNewCategoryFormControls: IFormInputControl<TInsertCategoryNames>[] = [
        {
            id: 2,
            name: "newCategoryName",
            type: "text",
            placeholder: "Nazwa nowej kategorii...",
            label: "Nazwa nowej kategorii:"
        }
    ]

    useEffect(() => {
        if (
            (getAdminsQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }
    }, [getAdminsQuery.isError]);

    if (getAdminsQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
    )
    if (getAdminsQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );

    const handleDeleteCategory = async (AdministratorID: string) => {
        try {
            await deleteAdministrator(user.AuthToken, AdministratorID);
            callSuccess("Usunięto kategorię!");
            getAdminsQuery.refetch();
        } catch (error) {
            console.log(error)
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
                        getAdminsQuery.data.map((element: IAdministrator) => {
                            return <ListGroup.Item key={Math.random()} className="d-flex justify-content-between">{element.name}
                                <Button variant="danger" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteCategory(element._id)}>
                                    <i className="bi bi-x-circle"></i>
                                </Button></ListGroup.Item>
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

export default DeleteAdministrator;