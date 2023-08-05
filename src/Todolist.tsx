import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditabelSpan} from "./EditabelSpan";
import {Button, Grid, IconButton} from "@mui/material";
import {CheckBox, Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, toDoListId: string) => void
    changeFilter: (value: FilterValuesType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, toDoListId: string) => void
    filter: FilterValuesType
    id: string
    removeToDoList: (toDoListId: string) => void
    changeToDoListTitl:(id: string, newTitle:string)=>void

}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeToDoList = () => {
        props.removeToDoList(props.id);
    }
    const changeToDoListTitle = (newTitle:string) => {
        props.changeToDoListTitl(props.id, newTitle);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return <div>
        <h3> <EditabelSpan title={props.title} onChange={changeToDoListTitle}/>
            {/*<button onClick={removeToDoList}>XXX</button>*/}
            <IconButton onClick={removeToDoList}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>


        <ul>
            {
                props.tasks.map(r => {
                    const onRemoveHandler = () => {
                        props.removeTask(r.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(r.id, e.target.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue:string) => {
                       props.changeTaskTitle(r.id, newValue, props.id)
                    }
                    return <div key={r.id} className={r.isDone ? 'is-done' : ''}>
                        <input type='checkbox' checked={r.isDone} onChange={onChangeHandler}/>
                        <EditabelSpan title ={r.title}
                                      onChange={onChangeTitleHandler}/>
                        {/*<button onClick={onRemoveHandler}>X</button>*/}
                        <IconButton onClick={onRemoveHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })

            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={"primary"} variant={props.filter === 'active' ? "contained" : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} className={props.filter === 'completed' ? "contained" : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>

    </div>
}


