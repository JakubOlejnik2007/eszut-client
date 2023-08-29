import AddAdministrator from "./add-administrator"
import DeleteAdministrator from "./delete-administrator"
import ManageCategories from "./manage-categories"
import ManagePlaces from "./manage-places"

export const ManageApplication = () => {
     return (
          <>
               <h1>Zarządzanie aplikacją</h1>
               <p>Korzystając z tego widoku możesz zarządzać aplikacją, tzn. dodać kategorię do listy dostepnej przy zgłaszaniu usterki, dodać miejsce do jakiego mozna przypisać zdarzenie, a także zarządzać administratorami systemu.</p>
               <section className="my-4 row g-3 p-2">
                    <div className="col-md-6">
                        <ManageCategories />
                    </div>
                    <div className="col-md-6">
                        <ManagePlaces />
                    </div>
                    <div className="cal-md-6">
                         <AddAdministrator />
                    </div>
                    <div className="cal-md-6">
                         <DeleteAdministrator />
                    </div>
               </section>
          </>
     )
}