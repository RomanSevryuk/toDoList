import React, {ChangeEvent} from 'react';

type EditableCheckboxType = {
    callBack: (newIsDone: boolean) => void
    isDone: boolean
}

export function EditableCheckbox(props: EditableCheckboxType) {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
        <>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={props.isDone}/>
        </>
    )
}