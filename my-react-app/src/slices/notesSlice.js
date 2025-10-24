import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote(state, action) {
      state.push({ text: action.payload, done: false })
    },
    toggleDone(state, action) {
      const note = state[action.payload]
      if (note) note.done = !note.done
    },
  },
})

export const { addNote, toggleDone } = notesSlice.actions
export default notesSlice.reducer
