import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { TSetNewPIN } from "../../../types/form-inputs-names"
import { IFormInputControl } from "../../../types/input"
import { callError, callSuccess } from "../../../utils/toast-notifications/toast"
import FormInput from "../../partials/form-input"
import { FormEvent, useState } from "react"
import ConfirmationModal from "../../partials/confirm-modal"
import { putNewPIN } from "../../../fetchers/apiRequestFunctions"
import { AuthData } from "../../../auth/AuthWrapper"


interface IChangePasswordValues { newPIN: string }

const ChangePIN = () => {
    const { user } = AuthData();
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const [changePINValues, setChangePINValues] = useState<IChangePasswordValues>({
        newPIN: ""
    })

    const changePasswordFormControls: IFormInputControl<TSetNewPIN>[] = [
        {
            id: 1,
            name: "newPIN",
            type: "password",
            placeholder: "Nowy PIN...",
            label: "PIN:"
        }
    ]

    const handleOnHide = () => {
        setShowConfirmationModal(false);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangePINValues((prevState: IChangePasswordValues) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const resetFormData = () => {
        setChangePINValues((prevState: IChangePasswordValues) => {
            return {
                ...prevState,
                newPIN: ""
            }
        })
    }

    const handleOnSubmitChangePIN = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!changePINValues.newPIN) {
            callError("Brak danych."); return;
        }

        setShowConfirmationModal(true)

    }

    const handleChangePINConfirm = async () => {
        try {
            await putNewPIN(user.AuthToken, changePINValues.newPIN);
            callSuccess("Zmieniono PIN!");
            resetFormData();
        } catch {
            callError("Wystąpił błąd podczas zmiany PINu! Sprawdź poprawnośc wprowadzonych przez siebie danych.", 3000);
        }
    }

    return (
        <Form onSubmit={handleOnSubmitChangePIN}>
            <h3>Zmiana PINu</h3>
            <p className="text-justify">Numer PIN jest stosowany w celu autoryzacji zgłaszającego. Jego długość powinna wynosić ok. 4 znaków (niekoniecznie cyfr - dopuszcza się użycie małych i dużych liter alfabetu angielskiego, cyfr i znaków specjalnych).</p>
            {changePasswordFormControls.map(input => {
                return <FormInput key={input.id} {...input} value={changePINValues[input.name]} onChange={handleOnChange} />
            })}
            <Button className="my-2" variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
            <ConfirmationModal show={showConfirmationModal} onHide={handleOnHide} onConfirm={handleChangePINConfirm} />
        </Form>
    )
}

export default ChangePIN;