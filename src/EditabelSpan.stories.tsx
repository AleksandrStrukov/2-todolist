import React from "react";
import {action} from '@storybook/addon-actions'

import {EditabelSpan} from "./EditabelSpan";

export default {
    title: 'EditabelSpan',
    component: EditabelSpan
}
const onChangeCC = action('onChangeCC')
export const EditabelSpanBase = () => {
    return <EditabelSpan title={'StartValue'} onChange={onChangeCC}/>
}