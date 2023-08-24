import { ListGroup } from "react-bootstrap";
import { AuthData } from "../../../auth/AuthWrapper"
import ChangePassword from "./changePassword";
import ChangeEmail from "./changeEmail";

const Account = () => {

     const { user } = AuthData();

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
                         <ChangePassword userAuthToken={user.AuthToken} UserID={user.id} />
                         <ChangeEmail userAuthToken={user.AuthToken} UserID={user.id} userEmail={user.email} />
                    </div>
               </section>
          </>
     )
}

export default Account;