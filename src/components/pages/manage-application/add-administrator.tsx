import { FormEvent, useEffect, useState } from "react";
import { IFormInputControl } from "../../../types/input";
import { TAddAdministrator } from "../../../types/form-inputs-names";
import { Button, Form } from "react-bootstrap";
import FormInput from "../../partials/form-input";
import generateRandomPassword from "../../../utils/password-generator";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import ConfirmationModal from "../../partials/confirm-modal";
import { addNewAdministrator } from "../../../fetchers/apiRequestFunctions";
import { AuthData } from "../../../auth/AuthWrapper";

interface IAddAdministratorValues {
    name: string,
    email: string,
    password: string
}

const AddAdministrator = () => {

    const { user } = AuthData();

    const [addAdministratorValues, setAddAdministratorValues] = useState<IAddAdministratorValues>({
        name: "",
        email: "",
        password: ""
    })

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddAdministratorValues((prevState: IAddAdministratorValues) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const handleResetFormData = () => {
        setAddAdministratorValues((prevState: IAddAdministratorValues) => {
            return {
                name: "",
                email: "",
                password: generateRandomPassword(12)
            }
        })
    }

    useEffect(() => {
        setAddAdministratorValues((prevState: IAddAdministratorValues) => {
            return {...prevState, password: generateRandomPassword(12)}
        })
    }, [])

    const handleOnSubmitAddAdministrator = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!validateEmail(addAdministratorValues.email)) {
            callError("Email nie spełnia wymogów!"); return;
        }

        if(!validatePassword(addAdministratorValues.password)) {
            callError("Hasło nie spełnia wymogów"); return;
        }

        setShowConfirmationModal(true);
    }

    const handleOnConfirm = async () => {
        try {
            await addNewAdministrator(user.AuthToken, addAdministratorValues.name, addAdministratorValues.email, addAdministratorValues.password);
            callSuccess("Dodano administratora do bazy!");
            handleResetFormData();
        } catch {
            callError("Błąd podczas dodawania nowego administratora do bazy!")
        }
    }

    const handleOnHide = () => {
        setShowConfirmationModal(false);
    }

    return (
        <article>
            <h2>Dodawanie nowego administratora</h2>
            <p>Możesz dodać nowego administratora do systemu. Aby to zrobić musisz podać: nazwę nowego administraotra (imię i nazwisko), adres email oraz hasło (generowe jest 12-znakowe hasło, można je edytować). Hasło powinno nie być krótsze niż osiem znaków, a także zawierać pryznajmniej jedną cyfrę, małą literę i wielką literę. <span className="text-danger">ZALECA SIĘ ZMIANĘ HASŁA PRZY PIERWSZYM LOGOWANIU PRZEZ NOWYCH ADMINISTRATORÓW</span>.</p>
            <ConfirmationModal show={showConfirmationModal} onHide={handleOnHide} onConfirm={handleOnConfirm} />
            <Form onSubmit={handleOnSubmitAddAdministrator}>
                {
                    addAdministratorFormControls.map(input => {
                        return <FormInput key={input.id} {...input} value={addAdministratorValues[input.name]} onChange={handleOnChange} />
                    })
                }
                <Button variant="primary" type="submit">Dodaj administratora</Button>
            </Form>
        </article>
        )
}

export default AddAdministrator;