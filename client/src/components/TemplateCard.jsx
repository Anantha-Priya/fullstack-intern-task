import { Link } from 'react-router-dom'

export default function TemplateCard({ template, isFavorite, onToggle }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/templates/${template.id}`} className="relative block h-48 overflow-hidden">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/50 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
          {template.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link to={`/templates/${template.id}`} className="hover:text-teal-600">
            {template.name}
          </Link>
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{template.description}</p>

        <button
          onClick={() => onToggle(template.id)}
          aria-pressed={isFavorite}
          className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            isFavorite
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow hover:brightness-110'
              : 'border border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
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
  )
}
