interface User {
  id: string
  email: string
  name: string
}

interface Props {
  user: User
  onLogout: () => void
}

const stats = [
  { label: 'Projects',   value: '12' },
  { label: 'Tasks done', value: '84' },
  { label: 'Team size',  value: '5'  },
]

const activity = [
  { text: 'Pushed to main',          time: '2 min ago',  color: 'bg-emerald-400' },
  { text: 'Opened pull request #7',  time: '1 hr ago',   color: 'bg-sky-400'     },
  { text: 'Closed issue #42',        time: '3 hrs ago',  color: 'bg-rose-400'    },
  { text: 'Left a comment',          time: 'Yesterday',  color: 'bg-stone-300'   },
]

export default function SuccessPage({ user, onLogout }: Props) {
  const initials = user.name.slice(0, 2).toUpperCase()
  const hour     = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-stone-50 font-mono">

      {/* ── Nav ── */}
      <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-serif tracking-tight text-stone-900">
          work<em className="not-italic text-orange-600">.</em>
        </span>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-xs text-stone-400 hidden sm:block">{user.email}</span>
          <button
            onClick={onLogout}
            className="text-xs text-stone-400 border border-stone-200 rounded px-3 py-1.5 hover:text-stone-900 hover:border-stone-900 transition-all uppercase tracking-wider"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-2xl mx-auto px-8 py-14">

        {/* Greeting */}
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">{greeting}</p>
        <h1 className="text-4xl font-serif text-stone-900 mb-14">
          Welcome, <em className="italic text-orange-600">{user.name}</em>.
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-stone-200 border border-stone-200 rounded-xl bg-white mb-6">
          {stats.map(s => (
            <div key={s.label} className="px-6 py-6">
              <p className="text-3xl font-serif text-stone-900 mb-1">{s.value}</p>
              <p className="text-xs text-stone-400 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="bg-white border border-stone-200 rounded-xl px-6 py-5 mb-6">
          <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Recent activity</p>
          <ul className="space-y-3">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.color}`} />
                <span className="text-xs text-stone-700 flex-1">{a.text}</span>
                <span className="text-xs text-stone-300">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          {['New project', 'Invite teammate', 'View reports', 'Settings'].map(label => (
            <button
              key={label}
              className="text-xs text-stone-500 border border-stone-200 rounded-lg px-4 py-3 text-left hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
            >
              {label}
            </button>
          ))}
        </div>

      </main>
    </div>
  )
}