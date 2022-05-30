import React, {useState} from 'react';
import './App.css';
import {FiltersValueType, TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

type TodolistType = {
    id: string
    title: string
    filter: FiltersValueType
}

type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "Active"},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS222", isDone: true},
            {id: v1(), title: "JS222", isDone: true},
            {id: v1(), title: "ReactJS222", isDone: false},
            {id: v1(), title: "ReactJS222", isDone: false}
        ]
    })

    const changeFilter = (todolistId: string, filterValue: FiltersValueType) => {
        setTodolist(todolist.map(el => todolistId === el.id ? {...el, filter: filterValue} : el))
    }

    const removeTask = (todolistId: string, removeID: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== removeID)})
    }

    const addTask = (todolistId: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(el => todolistId !== el.id))
        delete(tasks[todolistId])
        console.log(tasks)
    }

    return (
        <div className="App">
            {todolist.map((el) => {
                let taskForTodolist = tasks[el.id]
                if (el.filter === "Active") {
                    taskForTodolist = tasks[el.id].filter((el) => el.isDone === false)
                }
                if (el.filter === "Completed") {
                    taskForTodolist = tasks[el.id].filter((el) => el.isDone === true)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeIsDone={changeIsDone}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
