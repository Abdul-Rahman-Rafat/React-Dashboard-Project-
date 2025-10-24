import { useSelector, useDispatch } from 'react-redux'
import { logout } from './slices/authSlice'
import { increment, reset as resetCounter } from './slices/counterSlice'
import { start, pause, reset as resetTimer, tick } from './slices/timerSlice'
import { addNote, toggleDone } from './slices/notesSlice'
import { fetchUsers } from './slices/usersSlice'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, username } = useSelector(s => s.auth)
  const counter = useSelector(s => s.counter.value)
  const timer = useSelector(s => s.timer)
  const notes = useSelector(s => s.notes)
  const usersState = useSelector(s => s.users)
  const [noteText, setNoteText] = useState('')
  const [userId, setUserId] = useState('')
  const intervalRef = useRef()

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  // Timer effect
  useEffect(() => {
    if (timer.running) {
      intervalRef.current = setInterval(() => dispatch(tick()), 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [timer.running, dispatch])

  // Fetch users on mount or when userId changes
  useEffect(() => {
    dispatch(fetchUsers(userId))
  }, [dispatch, userId])

  return (
    <div>
      <header>
        <span>Welcome, {username}</span>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </header>
      <div style={{display:'flex', gap:20, flexWrap:'wrap', justifyContent:'center', marginTop:20}}>
        {/* Counter Card */}
        <div className="card">
          <h3>Counter</h3>
          <div>{counter}</div>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(resetCounter())}>Reset</button>
        </div>
        {/* Timer Card */}
        <div className="card">
          <h3>Timer</h3>
          <div>{timer.seconds} sec</div>
          <button onClick={() => dispatch(start())} disabled={timer.running}>Start</button>
          <button onClick={() => dispatch(pause())} disabled={!timer.running}>Pause</button>
          <button onClick={() => dispatch(resetTimer())}>Reset</button>
        </div>
        {/* Notes Card */}
        <div className="card">
          <h3>Notes</h3>
          <form onSubmit={e => {e.preventDefault(); if(noteText){dispatch(addNote(noteText)); setNoteText('')}}}>
            <input value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add note" />
            <button type="submit">Add</button>
          </form>
          <ul style={{textAlign:'left'}}>
            {notes.map((n, i) => (
              <li key={i} style={{
                color: n.done ? 'green' : 'black',
                textDecoration: n.done ? 'line-through' : 'none',
                cursor: 'pointer'
              }} onClick={() => dispatch(toggleDone(i))}>
                {n.text}
              </li>
            ))}
          </ul>
        </div>
        {/* Users List Card */}
        <div className="card">
          <h3>Users</h3>
          <input
            placeholder="User ID (empty for all)"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            style={{marginBottom:10}}
          />
          <button onClick={() => dispatch(fetchUsers(userId))}>Fetch</button>
          {usersState.loading && <div>Loading...</div>}
          {usersState.error && <div style={{color:'red'}}>{usersState.error}</div>}
          <ul style={{textAlign:'left'}}>
            {usersState.users.map(u => (
              <li key={u.id}>
                <b>{u.name}</b> <br />
                <span>{u.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
