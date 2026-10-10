import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataContext from "../context/DataContext.jsx"

const highlights = [
  {
    number: "01",
    title: "Your space",
    description: "A personal home base for the things you want to focus on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M3.75 10.5 12 3.75l8.25 6.75v9a.75.75 0 0 1-.75.75h-5.25v-6h-4.5v6H4.5a.75.75 0 0 1-.75-.75v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Built around you",
    description: "Your profile is ready whenever you are. Pick up at your own pace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="m19.4 15 .05.04a1.8 1.8 0 1 1-2.55 2.54l-.04-.04a1.8 1.8 0 0 0-3.07 1.27v.12a1.8 1.8 0 1 1-3.6 0v-.06a1.8 1.8 0 0 0-3.07-1.27l-.04.04a1.8 1.8 0 1 1-2.55-2.54l.05-.04a1.8 1.8 0 0 0-1.27-3.07h-.06a1.8 1.8 0 1 1 0-3.6h.06a1.8 1.8 0 0 0 1.27-3.07l-.05-.04a1.8 1.8 0 1 1 2.55-2.54l.04.04A1.8 1.8 0 0 0 10.2 4.5v-.12a1.8 1.8 0 1 1 3.6 0v.06a1.8 1.8 0 0 0 3.07 1.27l.04-.04a1.8 1.8 0 1 1 2.55 2.54l-.05.04a1.8 1.8 0 0 0 1.27 3.07h.06a1.8 1.8 0 1 1 0 3.6h-.06A1.8 1.8 0 0 0 19.4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "A fresh start",
    description: "Take a breath, make a plan, and get started with what matters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
]

export default function Home() {
  const { serverurl, user, setUser } = useContext(DataContext)
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState("")
  const firstName = user?.firstName?.trim()

  const handleLogout = async () => {
    setLogoutError("")
    setIsLoggingOut(true)

    try {
      await axios.post(`${serverurl}/api/logout`, {}, { withCredentials: true })
      setUser(null)
      navigate("/login", { replace: true })
    } catch (error) {
      setLogoutError(error.response?.data?.message || "Unable to log out. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/90">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/home" className="inline-flex items-center gap-3 text-lg font-bold tracking-wide">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-900/15">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M12 3 4.5 6v5.2c0 4.5 3.2 8.5 7.5 9.8 4.3-1.3 7.5-5.3 7.5-9.8V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            KAHAR
          </Link>
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              {user.profileImage ? (
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.profileImage}
                  alt={`${user.firstName}'s profile`}
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-800" aria-label={`Signed in as ${user.firstName}`}>
                  {firstName?.[0]?.toUpperCase() || "U"}
                </span>
              )}
              <button
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          )}
        </nav>
      </header>

      {logoutError && (
        <p className="mx-auto mt-4 max-w-7xl px-5 text-sm text-rose-700 sm:px-8 lg:px-10" role="alert">
          {logoutError}
        </p>
      )}

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-10 text-white shadow-xl shadow-slate-900/10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="absolute -right-16 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />
          <div aria-hidden="true" className="absolute right-10 top-12 hidden h-64 w-64 rounded-full border border-white/10 md:block" />
          <div aria-hidden="true" className="absolute right-20 top-24 hidden h-44 w-44 rounded-full border border-white/10 md:block" />

          <div className="relative max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Your account is ready
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {firstName ? `Welcome, ${firstName}.` : "Welcome to KAHAR."}
              <span className="mt-1 block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Good things start here.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              This is your space to slow down, get organized, and focus on what matters most. You’re all set to begin.
            </p>
            <a
              href="#your-space"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Explore your space
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <section id="your-space" className="pt-12 sm:pt-16">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">A little about your space</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Make yourself at home</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">A fresh start doesn’t have to be complicated. Begin with one thing at a time.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article key={highlight.number} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-950/5">
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white">
                    {highlight.icon}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-slate-400">{highlight.number}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Thanks for being here. Your next chapter starts now.</p>
          {!user && (
            <Link className="font-semibold text-cyan-700 transition hover:text-cyan-900" to="/login">
              Sign in to your account
            </Link>
          )}
        </footer>
      </main>
    </div>
  )
}