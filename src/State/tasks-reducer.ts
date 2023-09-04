import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";


export type remoovetaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string

}
export type addTasksACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ActionType = remoovetaskActionType | addTasksACType


export const removeTaskAC = (taskID: string, todolistId: string): remoovetaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskID}
}
export const addTasksAC = (title: string, todolistId:string): addTasksACType => {
    return {type: 'ADD-TASK', title, todolistId}
}


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filtredTasks = tasks.filter(t => t.id !== action.taskID);
            stateCopy[action.todolistId]=filtredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTask = {id:v1(),title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        default:
            throw new Error("I don't know you")
    }

}
