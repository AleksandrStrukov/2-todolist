import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
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
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('message is not right');
        }

    }


    return <div>
        <TextField value={newTaskTitle}
                   variant={"outlined"}
                   label={'Type value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        {/*<button onClick={addTask}>+</button>*/}
        <Button onClick={addTask} variant={"outlined"} color={"inherit"}>+</Button>

    </div>
}