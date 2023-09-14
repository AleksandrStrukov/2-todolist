import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListActionType, RemoveTodoListActionType, toDoListId1, toDOListId2} from "./todolists-reducer";


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
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ActionType =
    remoovetaskActionType
    | addTasksACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const removeTaskAC = (taskID: string, todolistId: string): remoovetaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskID}
}
export const addTasksAC = (title: string, todolistId: string): addTasksACType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}

const initialState: TasksStateType = {
    // [toDoListId1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false}
    // ],
    // [toDOListId2]: [
    //     {id: v1(), title: "Bananas", isDone: true},
    //     {id: v1(), title: "Cola", isDone: true},
    //     {id: v1(), title: "Bread", isDone: false}
    // ]

}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filtredTasks = tasks.filter(t => t.id !== action.taskID);
            stateCopy[action.todolistId] = filtredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone}
                : t)
            return ({...state});
        }
        case
        'CHANGE-TASK-TITLE' : {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ?
                {...t, title: action.title}: t)
            return ({...state});
        }
        case
        'Add-TODOLIST'
        : {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case
        'REMOVE-TODOLIST'
        : {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state;
    }

}
