import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataContext from "../context/DataContext.jsx"


export default function Signup() {
  const { serverurl, setUser } = useContext(DataContext)
  const navigate = useNavigate()
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    return () => {
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview)
      }
    }
  }, [profileImagePreview])

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setProfileImage(null)
      setProfileImagePreview("")
      return
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setIsError(true)
      setMessage("Choose a JPG, PNG, or WebP image.")
      event.target.value = ""
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setIsError(true)
      setMessage("Choose an image smaller than 5 MB.")
      event.target.value = ""
      return
    }

    setMessage("")
    setIsError(false)
    setProfileImage(file)
    setProfileImagePreview(URL.createObjectURL(file))
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setMessage("")
    setIsError(false)
    setIsSubmitting(true)

    try {
      const formdata = new FormData()
      formdata.append("firstName", firstname)
      formdata.append("lastName", lastname)
      formdata.append("email", email)
      formdata.append("password", password)
      formdata.append("userName", username)
      if (profileImage) {
        formdata.append("profileImage", profileImage)
      }

      const response = await axios.post(`${serverurl}/api/signup`, formdata, {
        withCredentials: true,
      })
      setUser(response.data.user)
      navigate("/home")
    } catch (error) {
      setIsError(true)
      setMessage(error.response?.data?.message || "Unable to create your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full bg-indigo-600/25 blur-3xl" />
      </div>

      <main className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/30 lg:min-h-[680px] lg:grid-cols-[0.9fr_1fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-600 via-sky-700 to-indigo-900 p-12 text-white lg:flex">
          <div aria-hidden="true" className="absolute -right-24 top-28 h-72 w-72 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-12 top-40 h-48 w-48 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-2xl" />

          <Link to="/signup" className="relative inline-flex w-fit items-center gap-3 text-lg font-bold tracking-wide">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M12 3 4.5 6v5.2c0 4.5 3.2 8.5 7.5 9.8 4.3-1.3 7.5-5.3 7.5-9.8V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>KAHAR</span>
          </Link>

          <div className="relative max-w-md">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">A fresh start</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              Make room for what matters.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-sky-100/90">
              Create your account and bring your work, ideas, and next big thing together.
            </p>
            <div className="mt-10 flex items-center gap-3 text-sm text-sky-100/90">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="m5 10 3.2 3.2L15.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Quick setup. Your account, your way.
            </div>
          </div>

          <p className="relative text-sm text-sky-100/70">A calmer place to get things done.</p>
        </section>

        <section className="flex items-center justify-center px-6 py-8 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <Link to="/signup" className="mb-7 inline-flex items-center gap-2 text-base font-bold tracking-wide text-slate-900 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 3 4.5 6v5.2c0 4.5 3.2 8.5 7.5 9.8 4.3-1.3 7.5-5.3 7.5-9.8V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              KAHAR
            </Link>

            <div className="mb-6">
              <p className="mb-2 text-sm font-semibold text-cyan-700">GET STARTED</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">A few details and you’ll be ready to go.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="firstname">
                    First name
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                    value={firstname}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="lastname">
                    Last name
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                    value={lastname}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="profileImage">
                  Profile image <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  {profileImagePreview ? (
                    <img
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
                      src={profileImagePreview}
                      alt="Selected profile preview"
                    />
                  ) : (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                        <path d="M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <input
                      className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:font-semibold file:text-slate-700 hover:file:bg-cyan-50"
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleProfileImageChange}
                    />
                    <p className="mt-2 text-xs text-slate-500">JPG, PNG, or WebP; up to 5 MB.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                  Email address
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
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
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="username">
                  Username
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    minLength={6}
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
                {isSubmitting ? "Creating account..." : "Create account"}
                {!isSubmitting && (
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link className="font-semibold text-cyan-700 transition hover:text-cyan-900" to="/login">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
