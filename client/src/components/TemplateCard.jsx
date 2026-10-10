export default function TemplateCard({ template, isFavorite, onToggle }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
      <img
        src={template.thumbnail_url}
        alt={template.name}
        loading="lazy"
        className="h-44 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2 w-fit rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          {template.category}
        </span>

        <h3 className="text-lg font-semibold">{template.name}</h3>
        <p className="mt-1 flex-1 text-sm text-gray-600">{template.description}</p>

        <button
          onClick={() => onToggle(template.id)}
          aria-pressed={isFavorite}
          className={`mt-4 flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm font-medium transition ${
            isFavorite
              ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
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
