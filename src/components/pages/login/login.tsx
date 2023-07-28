import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import urls from "../../../utils/urls";
import FormInput from "../../partials/form-input";
import { IFormInput } from "../../../types/input";
import { TLoginFormValues } from "../../../types/forms";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";

const Login = () => {

     const [values, setValues] = useState({
          email: "",
          password: "",
     });

     const { login } = AuthData();
     const navigate = useNavigate();

     const inputs: IFormInput[] = [
          {
               id: 1,
               name: "email",
               type: "email",
               label: "Email:",
               placeholder: "Email administratora"
          },
          {
               id: 2,
               name: "password",
               type: "password",
               label: "Hasło:",
               placeholder: "Hasło"
          }
     ];

     const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [e.target.name]: e.target.value });
     };


     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const rawdata = new FormData(form);
          const data = Object.fromEntries(rawdata.entries());
          console.log(data)
          if (
               !('email' in data && data.email !== "") ||
               !('password' in data && data.password !== "")
          ) {
                callError("Wprowadzono błędne lub niewszystkie dane!")
          } else {
               let response = await login(String(data.email), String(data.password))
               if(!response) return;
               navigate(urls.client.problems)
          }
     }

     return (
          <div>
               <h1 className="text-center">Zaloguj się do panelu administratora</h1>
               <div className="row d-flex flex-row-reverse flex-sm-row">
                    <div className="col-sm-5 p-3 order-2 order-sm-1">
                         <h2 className="h3 text-center">Instrukcja</h2>
                         <p className="text-justify">
                              Na tej stronie umieszczony jest formularz logowania do panelu administratora poprzez osobiste konta administratorów. W celu uzyskania dostępu należy zalogować się, podając adres e-mail przypisany do konta oraz hasło. Po zalogowaniu nastąpi przekierowanie do widoku zgłoszeń.
                         </p>
                    </div>
                    <Form className="col-sm-7 p-3 order-1 order-sm-2" onSubmit={handleSubmit}>
                         <h2 className="h3 text-center">Formularz</h2>
                         {inputs.map((input, _) => {
                              return (
                                   <FormInput key={input.id} {...input} value={values[input.name as TLoginFormValues]} onChange={onChange} />
                              )
                         })}
                         <div className="d-flex">
                              <Button variant="primary" type="submit" className="text-center m-auto">
                                   Zaloguj
                              </Button></div>


                    </Form>
               </div>
          </div>
     )
}

export default Login;