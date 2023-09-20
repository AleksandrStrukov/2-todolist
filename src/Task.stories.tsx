import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Todolist";

export default {
    title: 'Task',
    component: Task
}
const changeTaskStatus = action('changeTaskStatus')
const changeTaskTitle = action('changeTaskTitle')
const removeTask = action('removeTask')


export const TaskBase = (props: any) => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistid={'toDoListId1'}
        />
    </>
}