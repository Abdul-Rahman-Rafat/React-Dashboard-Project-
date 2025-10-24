import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (id = '') => {
    let url = 'https://jsonplaceholder.typicode.com/users'
    if (id) url += `/${id}`
    const res = await fetch(url)
    if (!res.ok) {
      if (res.status === 404) throw new Error('not found')
      throw new Error('error')
    }
    return id ? [await res.json()] : await res.json()
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.users = []
      })
  },
})

export default usersSlice.reducer
