import React, {useCallback, useReducer, useState} from 'react';
import '../App.css';
import {TaskType, Todolist} from '../Todolist';
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {CheckBox, Menu} from "@mui/icons-material";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

import {useAppWithredux} from "./useAppRedux";

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
const { todolists,
    addToDoList, removeTask,
    changeFilter,
    addTask,
    changeStatus,
    removeToDoList,
    changeTaskTitle, changeToDoListTitl, task} = useAppWithredux()
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

                            let tasksForTodolist = task[tl.id];


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
