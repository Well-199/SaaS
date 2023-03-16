import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: '' || localStorage.getItem("systemName"),
        company: '' || localStorage.getItem("systemCompany"),
        company_id: 0 || localStorage.getItem("systemCompany_id"),
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
        setCompanyId: (state, action) => {
            state.company_id = action.payload
            localStorage.setItem("systemCompany_id", JSON.stringify(action.payload))
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem("systemToken", action.payload)
        }
    }
})

export const { setName, setCompany, setCompanyId, setToken } = slice.actions
export default slice.reducer