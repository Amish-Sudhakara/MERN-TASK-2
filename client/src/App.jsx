import { useState } from 'react'
export default function App() {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [msg, setMsg] = useState('')
 const submit = async e => {
  e.preventDefault()
  const res = await fetch('/signup', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  setMsg(data.message || data.error)
 }
 return (
  <form onSubmit={submit}>
   <h2>Sign Up</h2>
   <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br /><br />
   <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br /><br />
   <button>Sign Up</button>
   <p>{msg}</p>
  </form>
 )
}
