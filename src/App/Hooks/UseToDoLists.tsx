import {useState} from "react";
import {FilterValuesType, ToDoListType} from "../App";
import {toDoListId1, toDOListId2} from "../id-utils";
import {v1} from "uuid";

export function useToDoLists(taskObj:any,setTaskObj:any, onTodoListRemoved(id:string)=>void) {
    let [toDoList, setToDoLists] =
        useState<Array<ToDoListType>>([
            {id: toDoListId1, title: 'What to learn', filter: 'all'},
            {id: toDOListId2, title: 'What to buy', filter: 'all'}
        ]);

    function changeFilter(value: FilterValuesType, toDoListId: string) {
        let toDoListt = toDoList.find(tl => tl.id === toDoListId);
        if (toDoListt) {
            toDoListt.filter = value;
            setToDoLists([...toDoList])
        }
    }
    let c = (ToDoListId: string) => {
        let filtredToDoList = toDoList.filter(tl => tl.id !== ToDoListId);

        onTodoListRemoved(id)
    }
    function changeToDoListTitl(id: string, newTitle: string) {
        const todolist = toDoList.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setToDoLists([...toDoList])
        }
    }
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
    return {toDoList,changeFilter,removeToDoList,changeToDoListTitl,addToDoList}
}
