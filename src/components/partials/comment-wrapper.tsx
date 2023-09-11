import { useQuery } from "react-query";
import { AuthData } from "../../auth/AuthWrapper";
import { getCommentsToProblem, insertComment } from "../../fetchers/apiRequestFunctions";
import { Alert, Button, Form } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import { callError, callSuccess } from "../../utils/toast-notifications/toast";
import IComment, { ICommentWrapperProps } from "../../types/comment";
import Comment from "./comment";
import { IFormInputControl } from "../../types/input";
import { TInsertComment } from "../../types/form-inputs-names";
import FormInput from "./form-input";

interface IInsertComment {
    content: string
}

const CommentWrapper = ({ProblemID} : ICommentWrapperProps) => {

    const { user } = AuthData();

    
    const commentsQuery = useQuery("comments", () => getCommentsToProblem(user.AuthToken, ProblemID), { staleTime: 60000 });

    const [insertCommentValues, setInsertCommentValues] = useState<IInsertComment>({
        content: ""
    })

    const handleResetFormData = () => {
        setInsertCommentValues((prevState: IInsertComment) => {
            return { ...prevState, content: "" }
        })
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInsertCommentValues((prevState: IInsertComment) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const insertCommentFormControls: IFormInputControl<TInsertComment>[] = [
        {
            id: 1,
            name: "content",
            label: "Treść",
            placeholder: "Treść",
            type: "text"
        }
    ]



    const handleSubmitInsertComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!insertCommentValues.content){
            callError("Komentarz nie może być pusty"); return;
        }

        try {
            await insertComment(user.AuthToken, ProblemID, insertCommentValues.content, user.id);
            callSuccess("Komentarz został dodany!")
            handleResetFormData();
            commentsQuery.refetch();
        } catch(error) {
            callError("Wystąpił błąd podczas przesyłania komentarza. Sprawdź treść swojego komentarza i spróbuj ponownie!")
        }

    }




    useEffect(() => {
        if (commentsQuery.isError) callError("Błąd podczas pobierania komentarzy.");
    })

    if (commentsQuery.isError) return (
        <Alert variant="danger" className="text-center">Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Komentarze nie zostały wyrenderowane.</Alert>
    )
    if (commentsQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    );

    return (
        <section>
            {
                commentsQuery.data.map((comment: IComment) => <Comment key={Math.random()} {...comment}/>) 
            }
            <Form className="p-3 border" onSubmit={handleSubmitInsertComment}>
                {
                    insertCommentFormControls.map((input: IFormInputControl<TInsertComment>) => <FormInput key={input.id} {...input} value={insertCommentValues[input.name]} onChange={handleOnChange} />)
                }
                <p className="text-justify">Dodaj nowy komentarz do zgłoszenia!</p>
                <Button variant="primary" className="my-1 w-100" type="submit"><i className="bi bi-send-fill" /></Button>
            </Form>
        </section>
    )
}

export default CommentWrapper;