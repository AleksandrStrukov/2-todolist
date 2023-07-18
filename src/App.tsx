import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {
    function removeTask(id: string, toDoListId: string) {
        let tasks = taskObj[toDoListId];

        let filtredTasks = tasks.filter(r => r.id !== id)
        taskObj[toDoListId]=filtredTasks
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
            {id: toDoListId1, title: 'What to learn', filter: 'active'},
            {id: toDOListId2, title: 'What to buy', filter: 'completed'}
        ]);
let removeToDoList = (ToDoListId: string)=> {
    let filtredToDoList = toDoList.filter(tl=>tl.id !== ToDoListId);
    setToDoLists(filtredToDoList);
    delete taskObj[ToDoListId];
    setTaskObj({...taskObj});
}
    let [taskObj, setTaskObj] = useState({
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

    return (
        <div className="App">

            {
                toDoList.map((tl) => {

                    let tasksForTodolist = taskObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }

                    return <Todolist
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
                    />
                })
            }


        </div>
    );
}

export default App;
