// import {Provider} from "react-redux";
// import {store} from "../State/store";
//
// export const ReduxStoreProviderDecorator = (story:any) => {
//     return <Provider store={store}>{story()}</Provider>
// }
import React from 'react'
import {Provider} from "react-redux";
import {AppRootState, store} from "../State/store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import { tasksReducer } from '../State/tasks-reducer';
import {todolistsReducer} from "../State/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
