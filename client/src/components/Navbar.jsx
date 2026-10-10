import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 transition ${
    isActive
      ? 'bg-teal-50 font-semibold text-teal-700'
      : 'text-gray-600 hover:bg-gray-100 hover:text-teal-700'
  }`

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-white/60 bg-white/80 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/templates" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 text-lg font-bold text-white shadow">
            T
          </span>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Template
            <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
              Store
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 text-sm sm:gap-2">
          <NavLink to="/templates" className={linkClass}>Templates</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/favorites" className={linkClass}>My Favorites</NavLink>
              <button
                onClick={handleLogout}
                className="rounded-full border border-gray-300 px-4 py-1.5 font-medium text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-teal-600 to-sky-600 px-4 py-1.5 font-medium text-white shadow transition hover:shadow-md hover:brightness-110"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
