import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: '' || localStorage.getItem("systemName"),
        company: '' || localStorage.getItem("systemCompany"),
        token: null || localStorage.getItem("systemToken")
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
            localStorage.setItem("systemName", action.payload)
        },
        setCompany: (state, action) => {
            state.company = action.payload
            localStorage.setItem("systemCompany", action.payload)
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem("systemToken", action.payload)
        }
    }
})

export const { setName, setCompany, setToken } = slice.actions
export default slice.reducer