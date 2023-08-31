import { useQuery } from "react-query";
import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Form, ListGroup } from "react-bootstrap";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import { ICategory } from "../../../types/forms-data";
import FormInput from "../../partials/form-input";
import { IFormInputControl } from "../../../types/input";
import { TInsertPlaceNames } from "../../../types/form-inputs-names";
import { deletePlace, getPlaces, insertNewPlace } from "../../../fetchers/apiRequestFunctions";
import { AuthData } from "../../../auth/AuthWrapper";
import "../../../styles/list-container.css"
interface IInsertPlaceValues { newPlaceName: string };

const ManagePlaces = () => {

    const { user } = AuthData();

    const [insertPlaceValues, setInsertPlaceValues] = useState<IInsertPlaceValues>({ newPlaceName: "" })

    const getPlacesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    const insertNewCategoryFormControls: IFormInputControl<TInsertPlaceNames>[] = [
        {
            id: 1,
            name: "newPlaceName",
            type: "text",
            placeholder: "Nazwa nowego miejsca...",
            label: "Nazwa nowego miejsca:"
        }
    ]

    useEffect(() => {
        if (
            (getPlacesQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }
    }, [getPlacesQuery.isError]);

    if (getPlacesQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
    )
    if (getPlacesQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInsertPlaceValues((prevState: IInsertPlaceValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleResetFormData = () => {
        setInsertPlaceValues((prevState: IInsertPlaceValues) => {
            return { ...prevState, newPlaceName: "" }
        })
    }

    const handleOnInsertPlaceFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await insertNewPlace(user.AuthToken, insertPlaceValues.newPlaceName)
            handleResetFormData();
            callSuccess("Dodano nowe miejsce!")
            getPlacesQuery.refetch();
        } catch {
            callError("Błąd podczas dodawania miejsca!");
        }
    }

    const handleDeletePlace = async (CategoryID: string) => {
        try {
            await deletePlace(user.AuthToken, CategoryID);
            callSuccess("Usunięto miejsce!");
            getPlacesQuery.refetch();
        } catch {
            callError("Błąd podczas usuwania miejsca.")
        }
    }



    return (
        <article>
            <h2>Zarządzanie miejscami</h2>
            <p className="text-justify">Możesz dodać lub usunąć miejsce, pod warunkiem, że aktualnie nie jest ono przypisane do jakiegokolwiek zgłoszenia w bazie danych.</p>
            <ListGroup>
                <div className="list-container">
                    {
                        getPlacesQuery.data.map((element: ICategory) => {
                            return <ListGroup.Item key={Math.random()} className="d-flex justify-content-between">{element.name}
                                <Button variant="danger" onClick={() => handleDeletePlace(element._id)}>
                                    <i className="bi bi-x-circle"></i>
                                </Button></ListGroup.Item>
                        })
                    }
                </div>
                <ListGroup.Item>
                    <Form onSubmit={handleOnInsertPlaceFormSubmit}>

                        {insertNewCategoryFormControls.map(input => {
                            return <FormInput key={input.id} {...input} value={insertPlaceValues[input.name]} onChange={handleOnChange} />
                        })}
                        <Button variant="primary" type="submit">Dodaj miejsce</Button>

                    </Form>
                </ListGroup.Item>
            </ListGroup>
        </article>
    )
}

export default ManagePlaces;
