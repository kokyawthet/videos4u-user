const initialState = [];

export const reducer = (state = initialState, action) => {
    if (action.type == "add")
    {
        return action.payLoad
    }
    return state;
}