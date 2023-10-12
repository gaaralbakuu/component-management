import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        search: {
            isFocused: false,
            text: "",
        },
        sidebar: {
            width: 300,
            min: 300,
            max: window.innerWidth - 300,
            isDrag: false,
            tab: 1, // 1 is components, 2 is search recently
        },
        container: {
            isFullscreen: false,
        },
        list: {
            item: [],
            selected: 0
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
        setSidebarTab: (state, action) => {
            state.sidebar.tab = action.payload;
        },
        setSearchFocus: (state, action) => {
            state.search.isFocused = action.payload;
        },
        setSearchText: (state, action) => {
            state.search.text = action.payload;
        },
        setFullscreen: (state, action) => {
            state.container.isFullscreen = action.payload;
        },
        setListSelected: (state, action) => {
            state.list.selected = action.payload;
        }
    }
})

export const { setSidebarWidth, setSidebarMax, setSidebarDrag, setSidebarTab, setSearchFocus, setSearchText, setFullscreen, setListSelected } = mainSlice.actions
export default mainSlice.reducer