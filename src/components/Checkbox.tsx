import React, {ChangeEvent} from 'react';

type CheckboxType = {
    collBack: (isDone: boolean) => void
    isDone: boolean
}


export const Checkbox = (props: CheckboxType) => {

    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.collBack(e.currentTarget.checked)
    }

    return (
        <input type="checkbox" checked={props.isDone} onChange={changeIsDoneHandler}/>
    );
};