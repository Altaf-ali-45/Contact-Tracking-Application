/*import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { setToken } from '../auth'*/

import { setToken, clearToken } from "../auth";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
  clearToken();
}, []);

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/auth/login', form)
      setToken(response.data.token)
      navigate('/contacts', { replace: true })
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-600">Access your contacts</p>

        <label className="block mt-4 text-sm font-medium text-slate-700">Username</label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          name="username"
          value={form.username}
          onChange={onChange}
          required
        />

        <label className="block mt-4 text-sm font-medium text-slate-700">Password</label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
        />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button
          className="mt-5 w-full rounded bg-slate-900 text-white py-2 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="mt-4 text-sm text-slate-600">
          No account?{' '}
          <Link className="text-slate-900 underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </main>
  )
}

export default LoginPage
