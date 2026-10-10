import { useEffect, useState } from 'react'

const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=70`

const templates = [
  { name: 'Modern Portfolio', category: 'Portfolio', word: 'portfolio', price: 29, image: unsplash('1467232004584-a241de8bcf5d') },
  { name: 'SaaS Landing Page', category: 'Landing Page', word: 'landing page', price: 49, image: unsplash('1522542550221-31fd19575a2d') },
  { name: 'Admin Dashboard', category: 'Dashboard', word: 'dashboard', price: 59, image: unsplash('1460925895917-afdab827c52f') },
  { name: 'Online Store', category: 'E-commerce', word: 'online store', price: 69, image: unsplash('1556742049-0cfed4f6a45d') },
  { name: 'Personal Blog', category: 'Blog', word: 'blog', price: 19, image: unsplash('1499750310107-5fef28a66643') },
  { name: 'Startup Pitch Deck', category: 'Pitch Deck', word: 'pitch deck', price: 24, image: unsplash('1559136555-9303baea8ebd') },
]

// Where each card sits in the stack, by its distance from the front card
const positions = [
  'z-30 translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100',
  'z-20 translate-x-14 -translate-y-3 rotate-3 scale-95 opacity-90',
  'z-10 translate-x-28 -translate-y-6 rotate-6 scale-90 opacity-60',
]
const hidden = 'z-0 translate-x-28 -translate-y-6 rotate-6 scale-75 opacity-0'

export default function AuthLayout({ children }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % templates.length), 3000)
    return () => clearInterval(timer)
  }, [active])

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] lg:grid-cols-2 lg:overflow-hidden">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-teal-700 via-cyan-700 to-sky-800 p-10 text-white lg:flex lg:flex-col lg:justify-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="animate-float absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20" />
        <div className="animate-float absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/20 [animation-delay:-2s]" />
        <div className="animate-float absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/10 [animation-delay:-4s]" />

        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">
            Find your next
            <br />
            <span key={active} className="animate-word inline-block text-cyan-200">
              {templates[active].word}
            </span>
          </h2>
          <p className="mt-3 max-w-sm text-teal-100">
            Your personal store for beautiful, ready-to-use website designs.
          </p>

          <div className="relative mt-10 h-60 w-full max-w-md [@media(max-height:560px)]:hidden">
            <div className="animate-float absolute inset-0">
              {templates.map((template, i) => {
                const distance = (i - active + templates.length) % templates.length
                return (
                  <div
                    key={template.name}
                    className={`absolute left-0 top-10 w-56 overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl transition-all duration-700 ease-out ${
                      positions[distance] || hidden
                    }`}
                  >
                    <img src={template.image} alt="" className="h-32 w-full object-cover" />
                    <div className="flex items-center justify-between p-3">
                      <div>
                        <p className="text-sm font-semibold">{template.name}</p>
                        <p className="text-xs text-teal-700">{template.category}</p>
                      </div>
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
                        ${template.price}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            {templates.map((template, i) => (
              <button
                key={template.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${template.name}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-8 lg:overflow-y-auto lg:py-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
