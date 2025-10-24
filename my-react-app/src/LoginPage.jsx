import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './slices/authSlice'
import { useNavigate } from 'react-router-dom'

const USER = 'abdo'
const PASS = '12345'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated)

  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (username === USER && password === PASS) {
      dispatch(login(username))
      navigate('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  )
}
