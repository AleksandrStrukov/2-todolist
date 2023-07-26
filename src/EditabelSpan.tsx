import React, {ChangeEvent, useState} from "react";

type EditabelSpanPropsType = {
    title: string
    onChange: (newValue:string)=>void
}

export function EditabelSpan(props: EditabelSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');
    const activateEditMode = () => {

        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode ? <input value={title} onChange={onChangeHandlerTitle} onBlur={activateViewMode} autoFocus/> :

        <span onDoubleClick={activateEditMode}>{props.title}</span>
}