import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import PasswordInput from '../components/PasswordInput'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      return setError('Email and password are required')
    }

    try {
      setLoading(true)
      const res = await api.post('/auth/login', form)
      login(res.data.token, res.data.user)
      navigate('/templates')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-md px-4">
      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 w-full rounded border p-2"
        />
        <PasswordInput
  	  name="password"
  	  placeholder="Password"
  	  value={form.password}
          onChange={handleChange}
          wrapperClassName="mb-4"
         />

        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-sm">
          New here?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  )
}