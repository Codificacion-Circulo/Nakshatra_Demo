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
            state.user = action.payload.data
        },
        removeData: (state, action) => {
            state.user = null
            localStorage.removeItem('token')
        },
        updateData: (state, action) => {
            console.log(action.payload)
            state.user = action.payload.user
            localStorage.removeItem('token')
            localStorage.setItem('token', action.payload.token)
        }
    }
})

export const authAction = authSlice.actions

const store = configureStore({
    reducer: authSlice.reducer
})

export default store