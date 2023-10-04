import {useState} from "react";
import {FilterValuesType, ToDoListType} from "../App";
import {toDoListId1, toDOListId2} from "../id-utils";
import {v1} from "uuid";

export function useToDoLists(onTodoListRemoved: (id: string) => void, onToDoListAdded: (id: string) => void){
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

    // let c = (ToDoListId: string) => {
    //     let filtredToDoList = toDoList.filter(tl => tl.id !== ToDoListId);
    //
    //
    function removeToDoList(id: string) {
        setToDoLists(toDoList.filter(tl => tl.id !== id));
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
   let newToDoListId =v1();
    let newTtoDoList: ToDoListType = {
        id: newToDoListId,
        title: title,
        filter: 'all'

    }
    setToDoLists([newTtoDoList, ...toDoList]);
    onToDoListAdded(newToDoListId)

}

return {toDoList, changeFilter, removeToDoList, changeToDoListTitl, addToDoList}
}
