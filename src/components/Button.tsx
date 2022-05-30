import React from 'react';
import s from './Button.module.css'
import {FiltersValueType} from "../Todolist";

type ButtonPropsType = {
    name: string
    callBack: ()=> void
    filter: FiltersValueType
}

export const Button = (props: ButtonPropsType) => {

    const onClickHandler = ()=> {
        props.callBack()
    }

    return (
<button className={props.filter === props.name ? s.activeFilter : ''} onClick={onClickHandler}>{props.name}</button>
    );
};