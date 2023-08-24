import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { TChangeEmailNames } from "../../../types/form-inputs-names";
import { IFormInput } from "../../../types/input";
import FormInput from "../../partials/form-input";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import ConfirmationModal from "../../partials/confirm-modal";
import putChangeEmail from "../../../fetchers/put-change-email";
import { AuthData } from "../../../auth/AuthWrapper";

interface IChangeEmailsValues { newEmail: string };

const ChangeEmail = ({ userEmail, userAuthToken, UserID }: { userEmail: string, userAuthToken: string, UserID: string }) => {

    const { logout } = AuthData();

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const [changeEmailValues, setChangeEmailValues] = useState<IChangeEmailsValues>({
        newEmail: ""
    })

    const changeEmailFormControls: IFormInput<TChangeEmailNames>[] = [
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
        setChangeEmailValues((prevState: IChangeEmailsValues) => { return { newEmail: "" } })
    }

    const handleOnSubmitChangeEmail = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!changeEmailValues.newEmail) {
            callError("Brak danych");
            return;
        }

        if (changeEmailValues.newEmail === userEmail) {
            callError("Nowy adres email nie może być taki sam jak poprzedni");
            return;
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
            callError("Wystąpił błąd podczas zmiany adresu email!");
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