import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import urls from "../../../utils/urls";
import FormInput from "../../partials/form-input";
import { IFormInputControl } from "../../../types/input";
import { TLoginFormNames } from "../../../types/form-inputs-names";
import { callError } from "../../../utils/toast-notifications/toast";

interface ILoginFormValues {
     email: string,
     password: string
}

const Login = () => {

     const [values, setValues] = useState<ILoginFormValues>({
          email: "",
          password: "",
     });

     const { login } = AuthData();

     const navigate = useNavigate();

     const inputs: IFormInputControl<TLoginFormNames>[] = [
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


     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (
               !values.email || !values.password
          ) {
               callError("Wprowadzono błędne lub niewszystkie dane!")
               return;
          }

          await login(values.email, values.password)
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
                                   <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
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