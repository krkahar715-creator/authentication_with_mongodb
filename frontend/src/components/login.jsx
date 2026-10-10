import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataContext from "../context/DataContext.jsx"

export default function Login() {
  const { serverurl, setUser } = useContext(DataContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setMessage("")
    setIsError(false)
    setIsSubmitting(true)

    try {
      const response = await axios.post(`${serverurl}/api/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      })
      setUser(response.data.user)
      navigate("/home")
    } catch (error) {
      setIsError(true)
      setMessage(error.response?.data?.message || "Unable to sign in. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.15),transparent_65%)]" />
      </div>

      <main className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/30 lg:min-h-[620px] lg:grid-cols-[1fr_0.9fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-600 via-sky-700 to-indigo-900 p-12 text-white lg:flex">
          <div aria-hidden="true" className="absolute -right-24 top-28 h-72 w-72 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-12 top-40 h-48 w-48 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-2xl" />

          <Link to="/login" className="relative inline-flex w-fit items-center gap-3 text-lg font-bold tracking-wide">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M12 3 4.5 6v5.2c0 4.5 3.2 8.5 7.5 9.8 4.3-1.3 7.5-5.3 7.5-9.8V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>KAHAR</span>
          </Link>

          <div className="relative max-w-md">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Your space, securely</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              Good to have you back.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-sky-100/90">
              Sign in to pick up right where you left off. Your account is waiting for you.
            </p>
          </div>

          <p className="relative text-sm text-sky-100/70">A calmer place to get things done.</p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-sm">
            <Link to="/login" className="mb-10 inline-flex items-center gap-2 text-base font-bold tracking-wide text-slate-900 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 3 4.5 6v5.2c0 4.5 3.2 8.5 7.5 9.8 4.3-1.3 7.5-5.3 7.5-9.8V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Northstar
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-cyan-700">WELCOME BACK</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Enter your details below to access your account.</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                  Email address
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-14 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {message && (
                <p
                  className={`rounded-xl px-4 py-3 text-sm ${isError ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}
                  role={isError ? "alert" : "status"}
                  aria-live="polite"
                >
                  {message}
                </p>
              )}

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
                {!isSubmitting && (
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              New to Kahar?{" "}
              <Link className="font-semibold text-cyan-700 transition hover:text-cyan-900" to="/signup">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
