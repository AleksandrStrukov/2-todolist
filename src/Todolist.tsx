import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "./App/App";
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

    changeFilter: (value: FilterValuesType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void

    filter: FilterValuesType
    id: string
    removeToDoList: (toDoListId: string) => void
    changeToDoListTitl: (id: string, newTitle: string) => void
    removeTask: (id: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, toDoListId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])

    const removeToDoList = () => {
        props.removeToDoList(props.id);
    }
    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitl(props.id, newTitle);
    }, [props.id, props.changeToDoListTitl])

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
                props.tasks.map(r => <Task
                    task={r}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistid={props.id}
                    key={r.id}
                />)

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
export type TaskPropsType = {
    removeTask: (id: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, toDoListId: string) => void
    task: TaskType
    todolistid: string
}
export const Task = (props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistid)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistid)
    }
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistid)
    }
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <input type='checkbox' checked={props.task.isDone} onChange={onChangeHandler}/>
        <EditabelSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>
        {/*<button onClick={onRemoveHandler}>X</button>*/}
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
}
