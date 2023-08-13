import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {CheckBox, Menu} from "@mui/icons-material";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {
    function removeTask(id: string, toDoListId: string) {
        let tasks = taskObj[toDoListId];

        let filtredTasks = tasks.filter(r => r.id !== id)
        taskObj[toDoListId] = filtredTasks
        setTaskObj({...taskObj});
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
        let tasks = taskObj[toDoListId];

        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;

            setTaskObj({...taskObj});
        }
    }

    function changeTaskTitle(taskId: string, newValue: string, toDoListId: string) {
        let tasks = taskObj[toDoListId];

        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newValue;

            setTaskObj({...taskObj});
        }
    }

    function addTask(title: string, toDoListId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = taskObj[toDoListId];

        let newTasks = [newTask, ...tasks];
        taskObj[toDoListId] = newTasks;
        setTaskObj({...taskObj})
    }


    function changeFilter(value: FilterValuesType, toDoListId: string) {
        let toDoListt = toDoList.find(tl => tl.id === toDoListId);
        if (toDoListt) {
            toDoListt.filter = value;
            setToDoLists([...toDoList])
        }
    }

    let toDoListId1 = v1();
    let toDOListId2 = v1();
    let [toDoList, setToDoLists] =
        useState<Array<ToDoListType>>([
            {id: toDoListId1, title: 'What to learn', filter: 'all'},
            {id: toDOListId2, title: 'What to buy', filter: 'all'}
        ]);
    let removeToDoList = (ToDoListId: string) => {
        let filtredToDoList = toDoList.filter(tl => tl.id !== ToDoListId);
        setToDoLists(filtredToDoList);
        delete taskObj[ToDoListId];
        setTaskObj({...taskObj});
    }

    function changeToDoListTitl(id: string, newTitle: string) {
        const todolist = toDoList.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setToDoLists([...toDoList])
        }
    }

    type TasksStType = {
        [key: string]: Array<TaskType>
    }
    let [taskObj, setTaskObj] = useState<TasksStType>({
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
        let newTtoDoList: ToDoListType = {
            id: v1(),
            title: title,
            filter: 'all'

        }
        setToDoLists([newTtoDoList, ...toDoList]);
        setTaskObj({
            ...taskObj,
            [newTtoDoList.id]: []
        })
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
                                <Paper  style={{padding: '10px'}}>
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
