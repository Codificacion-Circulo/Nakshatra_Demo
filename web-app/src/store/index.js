import {configureStore, createSlice} from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem('token'))

const authInitialState = {
    data: token ? token : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
            localStorage.setItem('token', JSON.stringify(state.data))
        },
        removeData: (state, action) => {
            state.data = null
            localStorage.clear()
        },
        updateData: (state, action) => {
            state.data = action.payload
            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(state.data))
        }
    }
})

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

export default store