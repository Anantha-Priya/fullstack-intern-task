import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import PasswordInput from '../components/PasswordInput'
import AuthLayout from '../components/AuthLayout'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password) {
      return setError('All fields are required')
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    try {
      setLoading(true)
      const res = await api.post('/auth/register', form)
      login(res.data.token, res.data.user)
      navigate('/templates')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'mb-3 w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200'

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100"
      >
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 px-6 py-6 text-white">
          <h1 className="text-2xl font-bold">Get started 🚀</h1>
          <p className="mt-1 text-sm text-teal-100">Create your account and build your own template collection</p>
        </div>

        <div className="p-6">
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>
          )}

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          <PasswordInput
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            wrapperClassName="mb-5"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 p-3 font-semibold text-white shadow transition hover:shadow-lg hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>

          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
