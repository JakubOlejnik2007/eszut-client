import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { TChangePasswordNames } from "../../../types/form-inputs-names"
import { IFormInputControl } from "../../../types/input"
import { callError, callSuccess } from "../../../utils/toast-notifications/toast"
import FormInput from "../../partials/form-input"
import { FormEvent, useState } from "react"
import ConfirmationModal from "../../partials/confirm-modal"
import { putChangePassword } from "../../../fetchers/apiRequestFunctions"
import { validatePassword } from "../../../utils/validators"

interface IChangePasswordValues { oldPassword: string; newPassword: string; confirmNewPassword: string }

const ChangePassword = ({ userAuthToken, UserID }: { userAuthToken: string, UserID: string }) => {

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const [changePasswordValues, setChangePasswordValues] = useState<IChangePasswordValues>({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const changePasswordFormControls: IFormInputControl<TChangePasswordNames>[] = [
        {
            id: 1,
            name: "oldPassword",
            type: "password",
            placeholder: "Poprzednie hasło...",
            label: "Poprzednie hasło:"
        },
        {
            id: 2,
            name: "newPassword",
            type: "password",
            placeholder: "Nowe hasło...",
            label: "Nowe hasło:"
        },
        {
            id: 3,
            name: "confirmNewPassword",
            type: "password",
            placeholder: "Poprzednie hasło...",
            label: "Potwierdź nowe hasło:"
        }
    ]

    const handleOnHide = () => {
        setShowConfirmationModal(false);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangePasswordValues((prevState: IChangePasswordValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const resetFormData = () => {
        setChangePasswordValues((prevState: IChangePasswordValues) => {
            return {
                ...prevState,
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }
        })
    }

    const handleOnSubmitChangePassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!changePasswordValues.oldPassword || !changePasswordValues.newPassword || !changePasswordValues.confirmNewPassword) {
            callError("Brak danych."); return;
        }

        if (changePasswordValues.newPassword !== changePasswordValues.confirmNewPassword) {
            callError("Nowe hasło nie zostało potwierdzone."); return;
        }

        if (changePasswordValues.oldPassword === changePasswordValues.newPassword) {
            callError("Nowe hasło nie jest inne od starego hasła."); return;
        }

        if(!validatePassword(changePasswordValues.newPassword)){
            callError("Nowe hasło nie spełnia wymogów!"); return;
        }

        setShowConfirmationModal(true)

    }

    const handleChangePasswordConfirm = async () => {
        try {
            await putChangePassword(userAuthToken, changePasswordValues.oldPassword, changePasswordValues.newPassword, UserID);
            callSuccess("Zmieniono hasło!");
            resetFormData();
        } catch {
            callError("Wystąpił błąd podczas zmiany hasła! Sprawdź poprawnośc wprowadzonych przez siebie danych.", 3000);
        }
    }

    return (
        <Form onSubmit={handleOnSubmitChangePassword} className="col-md-6">
            <h3>Zmiana hasła</h3>
            <p>Hasło powinno być niekrótsze niż osiem znaków, a także zawierać przynajmniej jedną cyfrę, małą literę i wielką literę.</p>
            {changePasswordFormControls.map(input => {
                return <FormInput key={input.id} {...input} value={changePasswordValues[input.name]} onChange={handleOnChange} />
            })}
            <Button variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
            <ConfirmationModal show={showConfirmationModal} onHide={handleOnHide} onConfirm={handleChangePasswordConfirm} />
        </Form>
    )
}

export default ChangePassword;