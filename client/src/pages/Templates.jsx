import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import TemplateCard from '../components/TemplateCard'

export default function Templates() {
  const [templates, setTemplates] = useState([])
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isLoggedIn } = useAuth()
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Templates</h1>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading templates...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorite={favoriteIds.has(template.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
