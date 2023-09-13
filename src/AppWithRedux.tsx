import React, {useCallback, useReducer, useState} from 'react';
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

} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./State/store";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function AppWithRedux() {




    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)
    const taskObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = useCallback ( (id: string, toDoListId: string) => {
        dispatch(removeTaskAC(id, toDoListId))
    },[])

    const changeStatus = useCallback ( (taskId: string, isDone: boolean, toDoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListId));
    }, [dispatch])


   const changeTaskTitle = useCallback (  (taskId: string, newValue: string, toDoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, toDoListId))

    }, [dispatch])

    const addTask = useCallback ( (title: string, toDoListId: string)=> {
        dispatch(addTasksAC(title, toDoListId))
    }, [dispatch])


    const changeFilter = useCallback ( (value: FilterValuesType, toDoListId: string) => {
        const action = changeTodolistFilterAC(toDoListId, value);
        dispatch(action);
    }, [dispatch])

    const removeToDoList = useCallback (   (ToDoListId: string) => {
        const action = removeTodolistAC(ToDoListId);
        dispatch(action);

    }, [dispatch])

    const changeToDoListTitl = useCallback ( (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action)
    }, [dispatch])

    const addToDoList = useCallback( (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

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
                        todolists.map(tl => {

                            let tasksForTodolist = taskObj[tl.id];


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

export default AppWithRedux;
