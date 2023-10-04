import React from 'react';
import '../App.css';
import {TaskType, Todolist} from '../Todolist';
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Menu} from "@mui/icons-material";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {useTasks} from "./Hooks/UseTasks";
import {useToDoLists} from "./Hooks/UseToDoLists";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStType = {
    [key: string]: Array<TaskType>
}



function App() {

    let {tasks, setTasks, addTask, changeTaskTitle, changeStatus, removeTask, onTodoListRemoved, addStateForNewToDoList} = useTasks();

    let {toDoList, changeFilter,removeToDoList,changeToDoListTitl, addToDoList} = useToDoLists(onTodoListRemoved,addStateForNewToDoList)


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
                        toDoList.map((tl) => {

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

export default App;
