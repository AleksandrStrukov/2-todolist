import React from "react";
import AppWithRedux from "./AppWithRedux";
import {store} from "./State/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}
export const AppWithReduxBase = () => {
    return <AppWithRedux/>
}