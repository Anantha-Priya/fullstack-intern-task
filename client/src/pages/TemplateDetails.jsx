import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function TemplateDetails() {
  const { id } = useParams()
  const [template, setTemplate] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/templates/${id}`)
        setTemplate(res.data)

        if (isLoggedIn) {
          const favRes = await api.get('/favorites')
          setIsFavorite(favRes.data.some((t) => t.id === res.data.id))
        } else {
          setIsFavorite(false)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load template')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, isLoggedIn])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  // Short-lived message: success shows beside the category badge, errors float top-right
  const showToast = (type, text) => {
    clearTimeout(toastTimer.current)
    setToast({ type, text })
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  const handleToggle = async () => {
    if (!isLoggedIn) return navigate('/login')

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${template.id}`)
      } else {
        await api.post(`/favorites/${template.id}`)
      }
      setIsFavorite(!isFavorite)
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Could not update favorite')
    }
  }

  const handleUse = () => {
    showToast('success', `"${template.name}" selected`)
  }

  if (loading) {
    return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Loading template...</p>
  }

  if (!template) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
          {error || 'Template not found'}
        </p>
        <Link to="/templates" className="text-indigo-600 hover:underline">
          Back to templates
        </Link>
      </div>
    )
  }

  const price = Number(template.price)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link
        to="/templates"
        className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
      >
        &larr; Back to templates
      </Link>

      {/* On desktop the card fits the window height; the text side scrolls if the window is very short */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 lg:grid lg:h-[calc(100vh-11rem)] lg:max-h-[40rem] lg:min-h-[26rem] lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-0">
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col lg:min-h-0">
          <div className="flex-1 overflow-y-auto p-6 pb-4 sm:p-8 sm:pb-4">
            <div className="flex items-center gap-3">
              <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {template.category}
              </span>
              {toast?.type === 'success' && (
                <span
                  role="status"
                  className="min-w-0 truncate rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200"
                >
                  {toast.text}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-bold text-gray-900">{template.name}</h1>

            <p className="mt-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
              {price > 0 ? `$${price.toFixed(2)}` : 'Free'}
            </p>

            <p className="mt-4 leading-relaxed text-gray-600">{template.description}</p>

            {template.features.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Features
                </h2>
                <ul className="space-y-2">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row sm:px-8 sm:pb-8">
            <button
              onClick={handleUse}
              className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow transition hover:shadow-lg hover:brightness-110"
            >
              Use this template
            </button>
            <button
              onClick={handleToggle}
              aria-pressed={isFavorite}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                isFavorite
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow hover:brightness-110'
                  : 'border border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.3 6.3a4.5 4.5 0 016.4 0L12 7.6l1.3-1.3a4.5 4.5 0 016.4 6.4L12 20.4l-7.7-7.7a4.5 4.5 0 010-6.4z"
                />
              </svg>
              {isFavorite ? 'Favorited' : 'Favorite'}
            </button>
          </div>
        </div>
      </div>

      {toast?.type === 'error' && (
        <div
          role="alert"
          className="fixed right-4 top-20 z-20 w-[calc(100%-2rem)] max-w-sm rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg ring-1 ring-red-200 sm:right-6"
        >
          {toast.text}
        </div>
      )}
    </div>
  )
}
