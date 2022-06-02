import React, {} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {EditableCheckbox} from "./components/EditableCheckbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    toDolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (toDolistId: string, taskId: string) => void
    changeFilter: (toDolistId: string, value: FilterValuesType) => void
    addTask: (toDolistId: string, title: string) => void
    changeTaskStatus: (toDolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (toDolistId: string) => void
    editToDolist: (toDolistId: string, changeTitle: string) => void
    editTask: (toDolistId: string, taskId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.toDolistId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.toDolistId)
    }

    const editToDolistHandler = (changeTitle: string) => {
        props.editToDolist(props.toDolistId, changeTitle)
    }

    const editTaskHandler = (taskId: string, changeTitle: string) => {
        props.editTask(props.toDolistId, taskId, changeTitle)
    }

    const editCheckboxHandler = (taskId: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.toDolistId, taskId, newIsDone)
    }

    const onAllClickHandler = () => props.changeFilter(props.toDolistId, "All");
    const onActiveClickHandler = () => props.changeFilter(props.toDolistId, "Active");
    const onCompletedClickHandler = () => props.changeFilter(props.toDolistId, "Completed");

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editToDolistHandler}/>
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
        <AddItemForm callBack={(title) => {
            addTaskHandler(title)
        }}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.toDolistId, t.id)
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <EditableCheckbox isDone={t.isDone} callBack={(newIsDone) => {
                            editCheckboxHandler(t.id, newIsDone)
                        }}/>
                        <EditableSpan title={t.title} callBack={(changeTitle) => {
                            editTaskHandler(t.id, changeTitle)
                        }}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'All' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'Active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'Completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
