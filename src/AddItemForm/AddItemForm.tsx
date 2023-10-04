import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm =  React.memo( (props: AddItemFormPropsType) => {
const{newTaskTitle,onKeyPressHandler,onChangeHandler,addTask,error}=useAddItemForm(props.addItem)

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
})