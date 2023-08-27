import ManageCategories from "./manage-categories"

export const ManageApplication = () => {
     return (
          <>
               <h1>Zarządzanie aplikacją</h1>
               <p>Korzystając z tego widoku możesz zarządzać aplikacją, tzn. dodać kategorię do listy dostepnej przy zgłaszaniu usterki, dodać miejsce do jakiego mozna przypisać zdarzenie, a także zarządzać administratorami systemu.</p>
               <section className="my-4 row g-3 p-2">
                    
                    <article className="col-md-6">
                        <ManageCategories />
                    </article>
                    <article className="col-md-6">
                        <ManageCategories />
                    </article>
               </section>
          </>
     )
}