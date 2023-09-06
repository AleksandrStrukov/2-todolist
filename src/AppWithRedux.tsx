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
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

function AppWithRedux() {
    function removeTask(id: string, toDoListId: string) {
        dispatchToTaskReducer(removeTaskAC(id, toDoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
        dispatchToTaskReducer(changeTaskStatusAC(taskId, isDone, toDoListId));
    }


    function changeTaskTitle(taskId: string, newValue: string, toDoListId: string) {
        dispatchToTaskReducer(changeTaskTitleAC(taskId, newValue, toDoListId))

    }

    function addTask(title: string, toDoListId: string) {
        dispatchToTaskReducer(addTasksAC(title, toDoListId));

    }


    function changeFilter(value: FilterValuesType, toDoListId: string) {
        const action = changeTodolistFilterAC(toDoListId, value);
        dispatchToDoListsReducer(action);
    }

    let toDoListId1 = v1();
    let toDOListId2 = v1();

    let [toDoList, dispatchToDoListsReducer] =
        useReducer(todolistsReducer, [
            {id: toDoListId1, title: 'What to learn', filter: 'all'},
            {id: toDOListId2, title: 'What to buy', filter: 'all'}
        ]);
    let removeToDoList = (ToDoListId: string) => {
        const action = removeTodolistAC(ToDoListId);
        dispatchToDoListsReducer(action);
        dispatchToTaskReducer(action);
    }

    function changeToDoListTitl(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatchToDoListsReducer(action)
    }

    type TasksStType = {
        [key: string]: Array<TaskType>
    }
    let [taskObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [toDoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [toDOListId2]: [
            {id: v1(), title: "Bananas", isDone: true},
            {id: v1(), title: "Cola", isDone: true},
            {id: v1(), title: "Bread", isDone: false}
        ]

    })

    function addToDoList(title: string) {
        const action = addTodolistAC(title);
        dispatchToDoListsReducer(action);
        dispatchToTaskReducer(action);
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
                        toDoList.map((tl) => {

                            let tasksForTodolist = taskObj[tl.id];
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

export default AppWithRedux;
