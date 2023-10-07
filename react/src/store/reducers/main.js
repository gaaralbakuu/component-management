import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        sidebar: {
            width: 300,
            min: 300,
            max: window.innerWidth - 300
        }
    },
    reducers: {
        setSidebarWidth: (state, action) => {
            state.sidebar.width = action.payload
        },
        setSidebarMax: (state, action) => {
            state.sidebar.max = action.payload
        }
    }
})

export const { setSidebarWidth, setSidebarMax } = mainSlice.actions
export default mainSlice.reducer