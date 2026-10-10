import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/templates" className="text-xl font-bold text-blue-600">
          Template Store
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isLoggedIn ? (
            <>
              <Link to="/templates" className="hover:text-blue-600">Templates</Link>
              <Link to="/favorites" className="hover:text-blue-600">My Favorites</Link>
              <span className="hidden text-gray-500 sm:inline">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link
                to="/register"
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
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