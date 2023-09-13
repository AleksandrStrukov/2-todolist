import React, {ChangeEvent, useCallback} from 'react';
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
    changeToDoListTitl: (id: string, newTitle: string) => void

}

export const Todolist = React.memo(function (props: PropsType) {
    const onAllClickHandler = useCallback( ()=> {
        props.changeFilter('all', props.id)
    },[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    },[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter, props.id])

    const removeToDoList = () => {
        props.removeToDoList(props.id);
    }
    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitl(props.id, newTitle);
    },[props.id,  props.changeToDoListTitl])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    let tasksForTodolist = props.tasks;

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    return <div>
        <h3><EditabelSpan title={props.title} onChange={changeToDoListTitle}/>
            {/*<button onClick={removeToDoList}>XXX</button>*/}
            <IconButton onClick={removeToDoList}>
                <Delete/>
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
                        props.changeTaskStatus(r.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(r.id, newValue, props.id)
                    }
                    return <div key={r.id} className={r.isDone ? 'is-done' : ''}>
                        <input type='checkbox' checked={r.isDone} onChange={onChangeHandler}/>
                        <EditabelSpan title={r.title}
                                      onChange={onChangeTitleHandler}/>
                        {/*<button onClick={onRemoveHandler}>X</button>*/}
                        <IconButton onClick={onRemoveHandler}>
                            <Delete/>
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
})
// type PropsType ={
//
// }
// const Task = (props:PropsType) => {
//
// }
