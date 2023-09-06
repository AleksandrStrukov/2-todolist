import {combineReducers, createStore} from "redux";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer);
// type AppRootState = {
//     todolists: Array<ToDoListType>
//     tasks: TasksStateType
// }

type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store;
