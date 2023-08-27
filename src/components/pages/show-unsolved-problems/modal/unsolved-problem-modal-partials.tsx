import { Dispatch, SetStateAction, useEffect } from "react"
import { IValuesToEdit } from "../../../../types/states"
import FormInput from "../../../partials/form-input"
import { useQuery } from "react-query"
import { callError } from "../../../../utils/toast-notifications/toast"
import { Alert } from "react-bootstrap"
import mapOptions from "../../../../utils/map-form-options"
import { ICategory } from "../../../../types/forms-data"
import { getCategories } from "../../../../fetchers/apiRequestFunctions"

export const EditPriority: React.FC<{
    state: IValuesToEdit,
    setState: Dispatch<SetStateAction<IValuesToEdit>>
}> = ({ state, setState }) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setState((prevState: IValuesToEdit) => {
            return { ...prevState, priority: e.target.value }
        })
    }

    return <FormInput id={1} name="priority" type="select" label="Wybierz priorytet" options={[
        { value: "3", label: "Najniższy" },
        { value: "2", label: "Średni" },
        { value: "1", label: "Najwyższy" },
    ]} value={state.priority} onChange={handleOnChange} />
}

export const EditCategory: React.FC<{
    state: IValuesToEdit,
    setState: Dispatch<SetStateAction<IValuesToEdit>>
}> = ({ state, setState }) => {

    const categoryQuery = useQuery("categories", getCategories, { staleTime: 60000 });

    useEffect(() => {
        if (
            (categoryQuery.isError)
        ) {
            callError(
                "Błąd połączenia z siecią. Proszę zaczekać chwilę i odświeżyć stronę."
            );
        }
    }, [categoryQuery.error, categoryQuery.isError]);


    if (categoryQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Formularz nie został wyrenderowany.</Alert>
    )
    if (categoryQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );


    const categories: ICategory[] = categoryQuery.data;
    const options = mapOptions(categories);
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setState((prevState: IValuesToEdit) => {
            return {
                ...prevState, category: {
                    ...prevState.category, id: e.target.value
                }
            }
        })
    }

    return <FormInput id={2} name="category" type="select" label="Wybierz kategorię" options={options} value={state.category.id} onChange={handleOnChange} />
}
