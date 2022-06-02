import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (changeTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    let [changeTitle, setChangeTitle] = useState(props.title)
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            updateTitle();
        }
    }

    const updateTitle = () => {
        if (changeTitle.trim() !== "") {
            editHandler()
            props.callBack(changeTitle.trim())
        } else {
            setError("Title is required");
        }
    }

    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
    }

    return (
        <>
            {edit
                ?
                <input className={error ? "error" : ""}
                       type={"text"}
                       onBlur={updateTitle}
                       onKeyPress={onKeyPressHandler}
                       autoFocus value={changeTitle}
                       onChange={onChangeHandler}/>
                :
                <span onDoubleClick={editHandler}> {props.title} </span>}

            {error && <div className="error-message">{error}</div>}
        </>
    );
};