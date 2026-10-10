import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import PasswordInput from '../components/PasswordInput'
import AuthLayout from '../components/AuthLayout'

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
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100"
      >
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 px-6 py-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back 👋</h1>
          <p className="mt-1 text-sm text-teal-100">Log in to see your favorite templates.</p>
        </div>

        <div className="p-6">
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
          <PasswordInput
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            wrapperClassName="mb-5"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 p-3 font-semibold text-white shadow transition hover:shadow-lg hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-5 text-center text-sm text-gray-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-teal-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
