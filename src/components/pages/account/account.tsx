import { Button, Form, ListGroup } from "react-bootstrap";
import { AuthData } from "../../../auth/AuthWrapper"
import { IFormInput } from "../../../types/input";
import { TChangeEmailNames, TChangePasswordNames } from "../../../types/form-inputs-names";
import FormInput from "../../partials/form-input";
import { useState } from "react";
import { IOnConfirmChangeUserData, TOnConfirmChangeUserData } from "../../../types/confirm-modal";
import { callError } from "../../../utils/toast-notifications/toast";

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

     const [action, setAction] = useState<TOnConfirmChangeUserData>("CHANGE PASSWORD");

     const onConfirmActions: IOnConfirmChangeUserData = {
          "CHANGE PASSWORD": async () => {

          },
          "CHANGE EMAIL": async () => {

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
               id: 1,
               name: "newEmail",
               type: "email",
               placeholder: "Nowy adres email...",
               label: "Nowy adres email:"
          }
     ]

     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setChangePasswordValues((prevState: IChangePasswordValues) => {
               return { ...prevState, [e.target.name]: e.target.value }
          })
     }

     const handleOnSubmitChangePasswordForm = (e: React.ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!changePasswordValues.oldPassword || !changePasswordValues.newPassword || !changePasswordValues.confirmNewPassword) {
               callError("Brak danych."); return;
          }

          if(changePasswordValues.newPassword !== changePasswordValues.confirmNewPassword){
               callError("Nowe hasło nie zostało potwierdzone."); return;
          }

          if(changePasswordValues.oldPassword === changePasswordValues.newPassword){
               callError("Nowe hasło nie jest inne od starego hasła."); return;
          }

          
     }


     return (
          <>
               <h1>Twoje konto</h1>
               <div className="hr-separator"></div>
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
                         <Form onSubmit={handleOnSubmitChangePasswordForm} className="col-md-6">
                              <h3>Zmiana hasła</h3>
                              {changePasswordFormControls.map(input => {
                                   return <FormInput key={input.id} {...input} value={changePasswordValues[input.name]} onChange={handleOnChange} />
                              })}
                              <Button variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
                         </Form>
                         <Form onSubmit={handleOnSubmitChangePasswordForm} className="col-md-6">
                              <h3>Zmiana adresu email</h3>
                              {changeEmailFormControls.map(input => {
                                   return <FormInput key={input.id} {...input} value={changeEmailValues[input.name]} onChange={handleOnChange} />
                              })}
                              <Button variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
                         </Form>
                         <Form onSubmit={handleOnSubmitChangePasswordForm} className="col-md-6">
                              <h3>Zmiana adresu email</h3>
                              {changeEmailFormControls.map(input => {
                                   return <FormInput key={input.id} {...input} value={changeEmailValues[input.name]} onChange={handleOnChange} />
                              })}
                              <Button variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
                         </Form>
                         <Form onSubmit={handleOnSubmitChangePasswordForm} className="col-md-6">
                              <h3>Zmiana adresu email</h3>
                              {changeEmailFormControls.map(input => {
                                   return <FormInput key={input.id} {...input} value={changeEmailValues[input.name]} onChange={handleOnChange} />
                              })}
                              <Button variant="primary" type="submit">Zatwierdź zmianę hasła</Button>
                         </Form>
                    </div>
               </section>
          </>
     )
}