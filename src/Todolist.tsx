import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: Function
    changeFilter: Function
}

export function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map(r => <li>
                        <input type="checkbox" checked={r.isDone}/>
                        <span>{r.title}</span>
                        <button onClick={() => {props.removeTask(r.id)}}>X</button>
                    </li>
                )
            }
        </ul>
        <div>
            <button onClick={ () => {props.changeFilter('all')}}>All</button>
            <button onClick={ () => {props.changeFilter('active')}}>Active</button>
            <button onClick={ () => {props.changeFilter('completed')}}>Completed</button>
        </div>
    </div>
}
