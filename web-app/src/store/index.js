import {configureStore, createSlice} from "@reduxjs/toolkit";

const authInitialState = {
    user: {
        name: "",
        email: "",
        photo: ""
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setData: (state, action) => {
            state.user = action.payload.data.user
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        },
        removeData: (state, action) => {
            state.user = null
            localStorage.removeItem('token')
        },
        updateData: (state, action) => {
            state.user = action.payload.user
            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        }
    }
})

export const authAction = authSlice.actions

const store = configureStore({
    reducer: authSlice.reducer
})

export default store