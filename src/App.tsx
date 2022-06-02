import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "All" | "Active" | "Completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"},
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

    function removeTask(toDolistId: string, id: string) {
        setTasks({...tasks, [toDolistId]: tasks[toDolistId].filter(el => el.id !== id)})
    }

    function addTask(title: string, toDolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [toDolistId]: [newTask, ...tasks[toDolistId]]})
    }

    function changeStatus(toDolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [toDolistId]: tasks[toDolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeFilter(toDolistId: string, value: FilterValuesType) {
        setTodolist(todolist.map(el => el.id === toDolistId ? {...el, filter: value} : el))
    }

    function removeTodolist(toDolistId: string) {
        setTodolist(todolist.filter(el => el.id !== toDolistId))
        delete tasks[toDolistId]
        setTasks({...tasks})
    }

    function addToDolist(newTitle: string) {
        const newTodolistId = v1()
        const newToDolist: TodolistType = {id: newTodolistId, title: newTitle, filter: "All"}
        setTodolist([newToDolist, ...todolist])
        setTasks({
            ...tasks, [newTodolistId]: [
                /*                {id: v1(), title: "newHTML", isDone: false},
                                {id: v1(), title: "newJS", isDone: false},
                                {id: v1(), title: "newReactJS", isDone: false},
                                {id: v1(), title: "newReactJS", isDone: false},*/
            ]
        })
    }

    const editToDolist = (toDolistId: string, changeTitle: string) => {
        setTodolist(todolist.map(el => el.id === toDolistId ? {...el, title: changeTitle} : el))
    }

    const editTask = (toDolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [toDolistId]: tasks[toDolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    return (
        <div className="App">
            <div>
                <AddItemForm callBack={addToDolist}/>
            </div>
            {todolist.map((el) => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "Active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "Completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <div className="App">
                        <Todolist
                            key={el.id}
                            toDolistId={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={el.filter}
                            removeTodolist={removeTodolist}
                            editToDolist={editToDolist}
                            editTask={editTask}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default App;
