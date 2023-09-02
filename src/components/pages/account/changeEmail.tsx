import { FormEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { TChangeEmailNames } from "../../../types/form-inputs-names";
import { IFormInputControl } from "../../../types/input";
import FormInput from "../../partials/form-input";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import ConfirmationModal from "../../partials/confirm-modal";
import { AuthData } from "../../../auth/AuthWrapper";
import { putChangeEmail } from "../../../fetchers/apiRequestFunctions";
import { validateEmail } from "../../../utils/validators";

interface IChangeEmailsValues { newEmail: string };

const ChangeEmail = ({ userEmail, userAuthToken, UserID }: { userEmail: string, userAuthToken: string, UserID: string }) => {

    const { logout } = AuthData();

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const [changeEmailValues, setChangeEmailValues] = useState<IChangeEmailsValues>({
        newEmail: ""
    })

    const changeEmailFormControls: IFormInputControl<TChangeEmailNames>[] = [
        {
            id: 4,
            name: "newEmail",
            type: "email",
            placeholder: "Nowy adres email...",
            label: "Nowy adres email:"
        }
    ]

    const handleOnHide = () => {
        setShowConfirmationModal(false);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEmailValues((prevState: IChangeEmailsValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const resetFormData = () => {
        setChangeEmailValues((prevState: IChangeEmailsValues) => { return { ...prevState, newEmail: "" } })
    }

    const handleOnSubmitChangeEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!changeEmailValues.newEmail) {
            callError("Brak danych");
            return;
        }

        if (changeEmailValues.newEmail === userEmail) {
            callError("Nowy adres email nie może być taki sam jak poprzedni");
            return;
        }

        if(!validateEmail(changeEmailValues.newEmail)){
            callError("Nowa adres nie spełnia wymogów")
        }

        setShowConfirmationModal(true);
    }

    const handleChangeEmailConfirm = async () => {
        try {
            await putChangeEmail(userAuthToken, changeEmailValues.newEmail, UserID)
            callSuccess("Zmieniono adres email!");
            resetFormData();
            logout();
        } catch {
            callError("Wystąpił błąd podczas zmiany adresu email! Sprawdź poprawność wprowadzonych przez siebie danych", 3000);
        }
    }

    return (
        <Form onSubmit={handleOnSubmitChangeEmail} className="col-md-6">
            <h3>Zmiana adresu email</h3>
            <p><span className="text-danger">UWAGA!</span> Zmiana adresu email spowoduje wylogowanie z panelu administracyjnego!</p>
            {changeEmailFormControls.map(input => {
                return <FormInput key={input.id} {...input} value={changeEmailValues[input.name]} onChange={handleOnChange} />
            })}
            <Button variant="primary" type="submit">Zatwierdź zmianę adresu email</Button>
            <ConfirmationModal show={showConfirmationModal} onHide={handleOnHide} onConfirm={handleChangeEmailConfirm} />
        </Form>
    )
}

export default ChangeEmail