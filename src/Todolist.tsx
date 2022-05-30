import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";
import s from './Todolist.module.css'
import {Checkbox} from "./components/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, removeID: string) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeFilter: (todolistId: string, value: FiltersValueType) => void
    changeIsDone: (todolistId: string, id: string, isDone: boolean) => void
    filter: FiltersValueType
    todolistId: string
    removeTodolist: (todolistId: string)=>void
}

export type FiltersValueType = "All" | "Active" | "Completed"

export function Todolist({changeFilter, addTask, removeTask, ...props}: PropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState(false)

    const addTaskHandler = () => {
        if(title.trim()!== ''){
            addTask(props.todolistId, title.trim())
            setTitle("")
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (todolistId: string, filterValue: FiltersValueType) => {
        changeFilter(props.todolistId,filterValue)
    }

    const removeTaskHandler = (elId: string) => {
        removeTask(props.todolistId, elId)
    }

    const changeIsDoneHandler = (isDone: boolean, elId: string) => {
        props.changeIsDone(props.todolistId, elId, isDone)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return <div>
        <h3>{props.title}
        <button onClick={removeTodolistHandler}>X</button>
        </h3>
        <div>
            <input className={error ? s.error : ''} value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
            <Button name={"+"} callBack={addTaskHandler} filter={props.filter}/>
            {error && <div className={s.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {props.tasks.map((el) => {
                return (
                    <li key={el.id} className={el.isDone ? s.isDone : ''}>
                        <Button name={"X"} callBack={() => removeTaskHandler(el.id)} filter={props.filter}/>
                        <Checkbox collBack={(isDone)=>changeIsDoneHandler(isDone, el.id)} isDone={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <Button name={"All"} callBack={() => changeFilterHandler(props.todolistId,"All")} filter={props.filter}/>
            <Button name={"Active"} callBack={() => changeFilterHandler(props.todolistId,"Active")} filter={props.filter}/>
            <Button name={"Completed"} callBack={() => changeFilterHandler(props.todolistId,"Completed")} filter={props.filter}/>
        </div>
    </div>
}
