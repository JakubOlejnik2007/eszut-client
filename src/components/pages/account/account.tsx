import { Button, Form, ListGroup } from "react-bootstrap";
import { AuthData } from "../../../auth/AuthWrapper"
import { IFormInput } from "../../../types/input";
import { TChangeEmailNames, TChangePasswordNames } from "../../../types/form-inputs-names";
import FormInput from "../../partials/form-input";
import { useState } from "react";
import { IOnConfirmChangeUserData, TOnConfirmChangeUserData } from "../../../types/confirm-modal";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import putChangePassword from "../../../fetchers/put-change-password";
import ConfirmationModal from "../../partials/confirm-modal";

interface IChangePasswordValues { oldPassword: string; newPassword: string; confirmNewPassword: string }
interface IChangeEmailsValues { newEmail: string };

export const Account = () => {

     const { user } = AuthData();

     const [changePasswordValues, setChangePasswordValues] = useState<IChangePasswordValues>({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
     })

     const [changeEmailValues, setChangeEmailValues] = useState<IChangeEmailsValues>({
          newEmail: ""
     })

     const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

     const [action, setAction] = useState<TOnConfirmChangeUserData>("CHANGE PASSWORD");

     const onConfirmActions: IOnConfirmChangeUserData = {
          "CHANGE PASSWORD": async () => {
               try {
                    await putChangePassword(user.AuthToken, changePasswordValues.newPassword, user.id);
                    callSuccess("Zmieniono hasło!")
               } catch {
                    callError("Wystąpił błąd podczas zmiany hasła!");
               }
          },
          "CHANGE EMAIL": async () => {
               try {

               } catch {
                    callError("Wystąpił błąd podczas zmiany adresu email!")
               }
          }
     }

     const changePasswordFormControls: IFormInput<TChangePasswordNames>[] = [
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
          setChangePasswordValues((prevState: IChangePasswordValues) => {
               return { ...prevState, [e.target.name]: e.target.value }
          })
     }

     const handleOnSubmitChangePassword = (e: React.ChangeEvent<HTMLFormElement>) => {
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
          setShowConfirmationModal(true)
          setAction("CHANGE PASSWORD");

     }

     const handleOnSubmitChangeEmail = (e: React.ChangeEvent<HTMLFormElement>) => {
          if (!changeEmailValues.newEmail) {
               callError("Brak danych");
               return;
          }

          if (changeEmailValues.newEmail === user.email) {
               callError("Nowy adres email nie może być taki sam jak poprzedni");
               return;
          }

          setShowConfirmationModal(true);
          setAction("CHANGE EMAIL");
     }


     return (
          <>
               <h1>Twoje konto</h1>
               <p>Poniżej zaprezentowane są dane przypisane do konta. Ten widok umożliwia także zmianę hasła (którym administrator loguje się do systemu) oraz adresu email (na adres ten przychodzą powiadomienia mailowe o nowych zgłoszeniach).</p>
               <section className="my-4">
                    <h2>Dane użytkownika</h2>
                    <ListGroup >
                         <ListGroup.Item>Nazwa: {user.name} </ListGroup.Item>
                         <ListGroup.Item>Przypisany adres email do konta: {user.email} </ListGroup.Item>
                    </ListGroup>
               </section>
               <section>
                    <h2>Edycja danych konta</h2>
                    <div className="row g-3 p-2">
                         <Form onSubmit={handleOnSubmitChangePassword} className="col-md-6">
                              <h3>Zmiana hasła</h3>
                              {changePasswordFormControls.map(input => {
                                   return <FormInput key={input.id} {...input} value={changePasswordValues[input.name]} onChange={handleOnChange} />
                              })}
                              <Button variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
                         </Form>

                         <Form onSubmit={handleOnSubmitChangeEmail} className="col-md-6">
                              <h3>Zmiana adresu email</h3>
                              {changeEmailFormControls.map(input => {
                                   return <FormInput key={input.id} {...input} value={changeEmailValues[input.name]} onChange={handleOnChange} />
                              })}
                              <Button variant="primary" type="submit">Zatwierdź zmianę adresu email</Button>
                         </Form>
                    </div>
                    <ConfirmationModal show={showConfirmationModal} onHide={handleOnHide} onConfirm={onConfirmActions[action]} />
               </section>
          </>
     )
}