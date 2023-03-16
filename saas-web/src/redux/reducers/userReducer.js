import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: 'Wellington',
        company: "WellSistemasWeb",
        token: "mnc90823hf9dh329bf2f3br237gh7"
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setName, setCompany, setToken } = slice.actions
export default slice.reducer