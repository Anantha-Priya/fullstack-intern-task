import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import TemplateCard from '../components/TemplateCard'
import PageHeader from '../components/PageHeader'

export default function Templates() {
  const [templates, setTemplates] = useState([])
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const { isLoggedIn, user } = useAuth()
  const firstName = user?.name?.trim().split(' ')[0]
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const templatesRes = await api.get('/templates')
        setTemplates(templatesRes.data)

        // Only logged-in users have favorites
        if (isLoggedIn) {
          const favRes = await api.get('/favorites')
          setFavoriteIds(new Set(favRes.data.map((t) => t.id)))
        } else {
          setFavoriteIds(new Set())
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load templates')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoggedIn])

  const handleToggle = async (templateId) => {
    if (!isLoggedIn) return navigate('/login')

    const isFavorite = favoriteIds.has(templateId)
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${templateId}`)
      } else {
        await api.post(`/favorites/${templateId}`)
      }
      setFavoriteIds((prev) => {
        const next = new Set(prev)
        if (isFavorite) next.delete(templateId)
        else next.add(templateId)
        return next
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update favorite')
    }
  }

  const categories = ['All', ...new Set(templates.map((t) => t.category))]

  const query = search.trim().toLowerCase()
  const filtered = templates.filter(
    (t) =>
      (category === 'All' || t.category === category) &&
      (!query ||
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query))
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <PageHeader
        title={
          isLoggedIn && firstName
            ? `Hey ${firstName}, Find a template you’ll love ✨`
            : 'Find a template you’ll love ✨'
        }
        subtitle="Tap the heart on your favorites and keep them all in one place 💖"
      />

      {error && (
        <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading templates...</p>
      ) : (
        <>
          <div className="mb-6 space-y-4">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                aria-label="Search templates"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((name) => (
                <button
                  key={name}
                  onClick={() => setCategory(name)}
                  aria-pressed={category === name}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    category === name
                      ? 'bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-sm ring-1 ring-gray-100">
              <p className="text-lg font-semibold text-gray-900">No templates found 🔍</p>
              <p className="mt-1 text-sm">Try a different search or category.</p>
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('All')
                }}
                className="mt-4 rounded-full bg-gradient-to-r from-teal-600 to-sky-600 px-5 py-2 text-sm font-medium text-white shadow hover:brightness-110"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isFavorite={favoriteIds.has(template.id)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
