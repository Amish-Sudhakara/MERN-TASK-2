import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const submit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        setIsError(false)
        setMsg(data.message || 'Signed up successfully')
      } else {
        setIsError(true)
        setMsg(data.error || 'Error signing up')
      }
    } catch (err) {
      setIsError(true)
      setMsg('Could not connect to server (port 3000)')
    }
  }

  return (
    <div className="page-wrapper">
      <div className="bg-decorations">
        <div className="dot-grid top-left"></div>
        <div className="dot-grid bottom-right">
          <svg className="sparkle" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
        <div className="geometric-lines"></div>
      </div>

      <form className="card" onSubmit={submit}>
        <div className="card-header">
          <h1>Create Your Account</h1>
          <h2>Sign Up</h2>
        </div>

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <div className="input-box">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              placeholder="Enter your business email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {email ? (
              <button
                type="button"
                className="icon-btn"
                onClick={() => setEmail('')}
                aria-label="Clear email"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ) : (
              <span className="input-icon trailing">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            )}
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>
          <div className="input-box">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="15.5" r="4.5" />
                <path d="m21 3-9.5 9.5" />
                <path d="m15.5 7.5 3 3" />
                <path d="m18 5 2 2" />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a secure password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            </button>
          </div>
          <span className="hint">Hint: Minimum 8 characters.</span>
        </div>

        <button type="submit" className="submit-btn">
          Sign Up
        </button>

        {msg && <p className={`status-msg ${isError ? 'error' : 'success'}`}>{msg}</p>}

        <div className="card-footer">
          <a href="#terms">Terms of Service</a>
          <span className="dot">·</span>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </form>
    </div>
  )
}
