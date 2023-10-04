import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../State/store";
import {useCallback} from "react";
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../State/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../State/todolists-reducer";
import {FilterValuesType, TasksStateType, ToDoListType} from "./AppWithRedux";

export const useAppWithredux = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)
    const task = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = useCallback ( (id: string, toDoListId: string) => {
        dispatch(removeTaskAC(id, toDoListId))
    },[])

    const changeStatus = useCallback ( (taskId: string, isDone: boolean, toDoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListId));
    }, [dispatch])


    const changeTaskTitle = useCallback (  (taskId: string, newValue: string, toDoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, toDoListId))

    }, [dispatch])

    const addTask = useCallback ( (title: string, toDoListId: string)=> {
        dispatch(addTasksAC(title, toDoListId))
    }, [dispatch])


    const changeFilter = useCallback ( (value: FilterValuesType, toDoListId: string) => {
        const action = changeTodolistFilterAC(toDoListId, value);
        dispatch(action);
    }, [dispatch])

    const removeToDoList = useCallback (   (ToDoListId: string) => {
        const action = removeTodolistAC(ToDoListId);
        dispatch(action);

    }, [dispatch])

    const changeToDoListTitl = useCallback ( (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action)
    }, [dispatch])

    const addToDoList = useCallback( (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);
    return {
        todolists,
        addToDoList,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
        removeToDoList,
        changeTaskTitle,
        changeToDoListTitl,
        task
    }
}