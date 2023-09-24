import { FormEvent, useEffect, useState } from "react";
import { IFormInputControl } from "../../../types/input";
import { TAddAdministrator } from "../../../types/form-inputs-names";
import { Alert, Button, Form, ListGroup } from "react-bootstrap";
import FormInput from "../../partials/form-input";
import generateRandomPassword from "../../../utils/password-generator";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import ConfirmationModal from "../../partials/confirm-modal";
import { addNewAdministrator, deleteAdministrator, getAdmins } from "../../../fetchers/apiRequestFunctions";
import { AuthData } from "../../../auth/AuthWrapper";
import { useQuery } from "react-query";

interface IAddAdministratorValues {
    name: string,
    email: string,
    password: string
}

interface IAdministrator {
    _id: string,
    name: string,
    email: string
}


type TActions = "ADD_ADMIN" | "DELETE_ADMIN"

const AddAdministrator = () => {

    const { user } = AuthData();

    const getAdminsQuery = useQuery("admins", () => getAdmins(user.AuthToken), { staleTime: 60000 });



    const [action, setAction] = useState<TActions>("ADD_ADMIN");

    const [deleteAdministratorID, setDeleteAdministratorID] = useState<string>("");


    const [addAdministratorValues, setAddAdministratorValues] = useState<IAddAdministratorValues>({
        name: "",
        email: "",
        password: ""
    })

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    useEffect(() => {
        setAddAdministratorValues((prevState: IAddAdministratorValues) => {
            return { ...prevState, password: generateRandomPassword(12) }
        })
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

    const addAdministratorFormControls: IFormInputControl<TAddAdministrator>[] = [
        {
            id: 3,
            name: "name",
            type: "text",
            placeholder: "Nazwa administratora...",
            label: "Nazwa administratora:"
        },
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "Adres email nowego administratora...",
            label: "Adres email nowego administratora:"
        },
        {
            id: 5,
            name: "password",
            type: "text",
            placeholder: "Hasło nowego administratora...",
            label: "Hasło nowego administratora:"
        }
    ]

    const handleOnConfirmAddAdministrator = async () => {
        try {
            await addNewAdministrator(user.AuthToken, addAdministratorValues.name, addAdministratorValues.email, addAdministratorValues.password);
            callSuccess("Dodano administratora do bazy!");
            handleResetFormData();
            getAdminsQuery.refetch()
        } catch {
            callError("Błąd podczas dodawania nowego administratora do bazy!")
        }
    }

    const handleOnConfirmDeleteAdministrator = async () => {
        try {
            await deleteAdministrator(user.AuthToken, deleteAdministratorID);
            callSuccess("Usunięto administratora!");
            getAdminsQuery.refetch();
        } catch {
            callError("Błąd podczas usuwania administratora.")
        }
    }



    const handleOnConfirm: {
        "ADD_ADMIN": () => Promise<void>,
        "DELETE_ADMIN": () => Promise<void>,
    } = {
        "ADD_ADMIN": handleOnConfirmAddAdministrator,
        "DELETE_ADMIN": handleOnConfirmDeleteAdministrator
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddAdministratorValues((prevState: IAddAdministratorValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleResetFormData = () => {
        setAddAdministratorValues((prevState: IAddAdministratorValues) => {
            return {...prevState,
                name: "",
                email: "",
                password: generateRandomPassword(12)
            }
        })
    }



    const handleAddAdministrator = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateEmail(addAdministratorValues.email)) {
            callError("Email nie spełnia wymogów!"); return;
        }

        if (!validatePassword(addAdministratorValues.password)) {
            callError("Hasło nie spełnia wymogów"); return;
        }
        setAction("ADD_ADMIN")
        setShowConfirmationModal(true);
    }

    const handleDeleteAdministrator = (AdministratorID: string) => {
        if(AdministratorID === user.id) {
            callError("Nie możesz usunąć samego siebie z listy administratorów!");
            return;
        }
        setDeleteAdministratorID(AdministratorID);
        setAction("DELETE_ADMIN");
        setShowConfirmationModal(true);
    }

    const handleOnHide = () => {
        setShowConfirmationModal(false);
    }


    return (
        <>
            <article className="col-md-6">
                <h2>Dodawanie nowego administratora</h2>
                <p className="text-justify">Możesz dodać nowego administratora do systemu. Aby to zrobić musisz podać: nazwę nowego administraotra (imię i nazwisko), adres email oraz hasło (generowe jest 12-znakowe hasło, można je edytować). Hasło powinno nie być krótsze niż osiem znaków, a także zawierać pryznajmniej jedną cyfrę, małą literę i wielką literę. <span className="text-danger">ZALECA SIĘ ZMIANĘ HASŁA PRZY PIERWSZYM LOGOWANIU PRZEZ NOWYCH ADMINISTRATORÓW</span>.</p>
                <ConfirmationModal show={showConfirmationModal} onHide={handleOnHide} onConfirm={handleOnConfirm[action]} />
                <Form onSubmit={handleAddAdministrator}>
                    {
                        addAdministratorFormControls.map(input => {
                            return <FormInput key={input.id} {...input} value={addAdministratorValues[input.name]} onChange={handleOnChange} />
                        })
                    }
                    <Button className="my-2" variant="primary" type="submit">Dodaj administratora</Button>
                </Form>
            </article>
            <article className="col-md-6">
                <h2>Usuwanie administratora z listy</h2>
                <p className="text-justify">Usunięcie może nastąpić jedynie wtedy, gdy administrator nie pozostaje przypisany do czegokolwiek w bazie danych.</p>
                <ListGroup>
                    <div className="list-container">
                        {
                            getAdminsQuery.data.map((element: IAdministrator) => {
                                return <ListGroup.Item key={Math.random()} className="d-flex justify-content-between">{element.email} [{element.name}]
                                    <Button variant="danger" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteAdministrator(element._id)}>
                                        <i className="bi bi-x-circle"></i>
                                    </Button></ListGroup.Item>
                            })
                        }
                    </div>
                </ListGroup>
            </article>
        </>

    )
}

export default AddAdministrator;