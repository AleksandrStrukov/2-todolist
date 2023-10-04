import {AddItemForm} from "./AddItemForm/AddItemForm";
import React from "react";

export default {
    title:'AddItemForm',
    component: AddItemForm
}

export const AddItemFormBase = (props:any) => {
    return <AddItemForm addItem={(title:string)=>{alert(title)}}/>
}