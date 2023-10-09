import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        search: {
            isFocused: false,
        },
        sidebar: {
            width: 300,
            min: 300,
            max: window.innerWidth - 300,
            isDrag: false
        },
        container: {
            isFullscreen: false,
        }
    },
    reducers: {
        setSidebarWidth: (state, action) => {
            state.sidebar.width = action.payload;
        },
        setSidebarMax: (state, action) => {
            state.sidebar.max = action.payload;
        },
        setSidebarDrag: (state, action) => {
            state.sidebar.isDrag = action.payload;
        },
        setSearchFocus: (state, action) => {
            state.search.isFocused = action.payload;
        },
        setFullscreen: (state, action) => {
            state.container.isFullscreen = action.payload;
        }
    }
})

export const { setSidebarWidth, setSidebarMax, setSidebarDrag, setSearchFocus, setFullscreen } = mainSlice.actions
export default mainSlice.reducer