import {useState} from "react";
import {v1} from "uuid";
import {TasksStType} from "../App";
import {toDoListId1, toDOListId2} from "../id-utils";


export function useTasks() {

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

    function onTodoListRemoved(id:string) {
        delete taskObj[id];
        setTaskObj({...taskObj})
    }
    return {
        taskObj,
        setTaskObj,
        addTask,
        changeTaskTitle,
        changeStatus,
        removeTask,
        onTodoListRemoved

    }
}