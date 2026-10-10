export default function PageHeader({ title, subtitle }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 right-24 h-32 w-32 rounded-full bg-white/10" />
      <h1 className="relative text-2xl font-bold sm:text-3xl">{title}</h1>
      {subtitle && (
        <p className="relative mt-2 max-w-xl text-sm text-teal-100 sm:text-base">{subtitle}</p>
      )}
    </div>
  )
}
