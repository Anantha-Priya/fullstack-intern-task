import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import TemplateCard from '../components/TemplateCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/favorites')
        setFavorites(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load favorites')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Every card here is a favorite, so toggling removes it
  const handleToggle = async (templateId) => {
    try {
      await api.delete(`/favorites/${templateId}`)
      setFavorites((prev) => prev.filter((t) => t.id !== templateId))
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove favorite')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">My Favorites</h1>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p className="text-gray-600">
          You have no favorites yet.{' '}
          <Link to="/templates" className="text-blue-600 hover:underline">
            Browse templates
          </Link>
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorite={true}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
