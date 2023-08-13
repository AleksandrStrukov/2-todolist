import {userReducer} from "./user-reducer";

test('userReducer should increment age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Step'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2)
});

test('user reducer should incrrement only children', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Ales'};

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

test('user reducer should change name', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Ales'};
    const newName = 'Lopik';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})