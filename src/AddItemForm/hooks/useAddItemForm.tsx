import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (onItemAdded:(title:string)=>void) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState('');
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(' ')
        }

        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            onItemAdded  (newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('message is not right');
        }

    }
return {
    newTaskTitle,onKeyPressHandler,onChangeHandler,addTask,error
}
}