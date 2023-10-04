import {useState} from "react";
import {v1} from "uuid";
import {TasksStType} from "../App";
import {toDoListId1, toDOListId2} from "../id-utils";


export function useTasks() {

    let [task, setTasks] = useState<TasksStType>({
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

    function removeTask(id: string, toDoListId: string) {
        let tasks = task[toDoListId];

        let filtredTasks = tasks.filter(r => r.id !== id)
        task[toDoListId] = filtredTasks
        setTasks({...task});
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
        setTasks(task => {
            const updatedTasks = {...task};
            updatedTasks[toDoListId] = updatedTasks[toDoListId].map(task =>
                task.id === taskId ? {...task, isDone} : task
            );
            return updatedTasks;
        });
    }


    function changeTaskTitle(taskId: string, newValue: string, toDoListId: string) {
        setTasks(task => {
            const updatedTasks = {...task};
            updatedTasks[toDoListId] = updatedTasks[toDoListId].map(task =>
                task.id === taskId ? {...task, title: newValue} : task
            );
            return updatedTasks;
        });
    }


    function addTask(title: string, toDoListId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = task[toDoListId];

        let newTasks = [newTask, ...tasks];
        task[toDoListId] = newTasks;
        setTasks({...task})
    }

    function onTodoListRemoved(id: string) {
        delete task[id];
        setTasks({...task})
    }

    function addStateForNewToDoList(newToDoListId: string) {
        setTasks({
            ...task, [newToDoListId]: []
        })
    }

    return {
        tasks: task,
        setTasks: setTasks,
        addTask,
        changeTaskTitle,
        changeStatus,
        removeTask,
        onTodoListRemoved,
        addStateForNewToDoList

    }
}