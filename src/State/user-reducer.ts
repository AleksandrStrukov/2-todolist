type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
let newName='Lopik'

export const userReducer = (state: StateType, action: any): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = newState.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount +1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }

        default:
           return state;
    }

}
