import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {CheckBox, Menu} from "@mui/icons-material";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {
    addTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./State/store";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

function AppWithReducers() {
    function removeTask(id: string, toDoListId: string) {
        dispatch(removeTaskAC(id, toDoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListId));
    }


    function changeTaskTitle(taskId: string, newValue: string, toDoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newValue, toDoListId))

    }

    function addTask(title: string, toDoListId: string) {
        dispatch(addTasksAC(title, toDoListId));

    }


    function changeFilter(value: FilterValuesType, toDoListId: string) {
        const action = changeTodolistFilterAC(toDoListId, value);
        dispatch(action);
    }

    let toDoListId1 = v1();
    let toDOListId2 = v1();
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    let removeToDoList = (ToDoListId: string) => {
        const action = removeTodolistAC(ToDoListId);
        dispatch(action);

    }

    function changeToDoListTitl(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action)
    }

    type TasksStType = {
        [key: string]: Array<TaskType>
    }


    function addToDoList(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        ToDoList
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container padding={'16px'}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        tasks.map((tl) => {

                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeToDoList={removeToDoList}
                                        changeTaskTitle={changeTaskTitle}

                                        changeToDoListTitl={changeToDoListTitl}

                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
