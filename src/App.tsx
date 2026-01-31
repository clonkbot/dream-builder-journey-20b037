import { useState } from 'react'

interface Dream {
  id: number
  text: string
  completed: boolean
  category: 'freedom' | 'travel' | 'family' | 'growth'
}

interface JournalEntry {
  id: number
  date: string
  mood: string
  note: string
}

function App() {
  const [dreams, setDreams] = useState<Dream[]>([
    { id: 1, text: 'Build something of my own', completed: true, category: 'growth' },
    { id: 2, text: 'See the world 🌎', completed: false, category: 'travel' },
    { id: 3, text: 'Escape the 9-5 ⏰', completed: false, category: 'freedom' },
    { id: 4, text: 'Live on my own terms', completed: false, category: 'freedom' },
    { id: 5, text: 'Help my family out 💞', completed: false, category: 'family' },
  ])

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    { id: 1, date: '2024-01-15', mood: '🙃', note: 'Started my journey. Not following the traditional path but feeling great!' },
  ])

  const [newDream, setNewDream] = useState('')
  const [newCategory, setNewCategory] = useState<Dream['category']>('growth')
  const [newNote, setNewNote] = useState('')
  const [selectedMood, setSelectedMood] = useState('😊')
  const [activeTab, setActiveTab] = useState<'dreams' | 'journal' | 'stats'>('dreams')

  const moods = ['😊', '🙃', '🔥', '💪', '🌟', '😴', '🤔', '💖']

  const categoryColors = {
    freedom: 'bg-purple-100 text-purple-700 border-purple-300',
    travel: 'bg-blue-100 text-blue-700 border-blue-300',
    family: 'bg-pink-100 text-pink-700 border-pink-300',
    growth: 'bg-green-100 text-green-700 border-green-300',
  }

  const categoryIcons = {
    freedom: '🕊️',
    travel: '✈️',
    family: '💞',
    growth: '🌱',
  }

  const addDream = () => {
    if (newDream.trim()) {
      setDreams([...dreams, {
        id: Date.now(),
        text: newDream,
        completed: false,
        category: newCategory
      }])
      setNewDream('')
    }
  }

  const toggleDream = (id: number) => {
    setDreams(dreams.map(d => 
      d.id === id ? { ...d, completed: !d.completed } : d
    ))
  }

  const deleteDream = (id: number) => {
    setDreams(dreams.filter(d => d.id !== id))
  }

  const addJournalEntry = () => {
    if (newNote.trim()) {
      setJournalEntries([{
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood,
        note: newNote
      }, ...journalEntries])
      setNewNote('')
    }
  }

  const completedCount = dreams.filter(d => d.completed).length
  const progressPercent = dreams.length > 0 ? (completedCount / dreams.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="text-6xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              I'm <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">21</span>
            </h1>
            <p className="text-xl text-purple-200 mb-6">Building my own path, not climbing someone else's ladder</p>
            
            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                💸 Not a millionaire (yet)
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                🎓 Uni student
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm rounded-full text-white text-sm border border-pink-400/30">
                🙃 Couldn't be happier
              </span>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercent * 3.52} 352`}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-2xl font-bold">{completedCount}/{dreams.length}</span>
                <span className="text-xs text-purple-300">Dreams</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 inline-flex">
            {(['dreams', 'journal', 'stats'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab === 'dreams' && '🌟 Dreams'}
                {tab === 'journal' && '📔 Journal'}
                {tab === 'stats' && '📊 Stats'}
              </button>
            ))}
          </div>
        </div>

        {/* Dreams Tab */}
        {activeTab === 'dreams' && (
          <div className="max-w-2xl mx-auto">
            {/* Add Dream Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Add a new dream ✨</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newDream}
                  onChange={(e) => setNewDream(e.target.value)}
                  placeholder="What do you want to achieve?"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  onKeyPress={(e) => e.key === 'Enter' && addDream()}
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Dream['category'])}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="growth" className="bg-slate-800">🌱 Growth</option>
                  <option value="freedom" className="bg-slate-800">🕊️ Freedom</option>
                  <option value="travel" className="bg-slate-800">✈️ Travel</option>
                  <option value="family" className="bg-slate-800">💞 Family</option>
                </select>
                <button
                  onClick={addDream}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Dreams List */}
            <div className="space-y-3">
              {dreams.map((dream) => (
                <div
                  key={dream.id}
                  className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-all hover:bg-white/15 ${
                    dream.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleDream(dream.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        dream.completed
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-transparent'
                          : 'border-white/30 hover:border-pink-400'
                      }`}
                    >
                      {dream.completed && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`text-white font-medium ${dream.completed ? 'line-through text-white/60' : ''}`}>
                        {dream.text}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[dream.category]}`}>
                      {categoryIcons[dream.category]} {dream.category}
                    </span>
                    <button
                      onClick={() => deleteDream(dream.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Journal Tab */}
        {activeTab === 'journal' && (
          <div className="max-w-2xl mx-auto">
            {/* Add Entry Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">How are you feeling today?</h3>
              <div className="flex gap-2 mb-4">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`text-2xl p-2 rounded-xl transition-all ${
                      selectedMood === mood
                        ? 'bg-white/20 scale-110'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write about your journey today..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-24"
              />
              <button
                onClick={addJournalEntry}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Save Entry 📝
              </button>
            </div>

            {/* Journal Entries */}
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{entry.mood}</span>
                    <span className="text-purple-300 text-sm">{entry.date}</span>
                  </div>
                  <p className="text-white">{entry.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(categoryIcons).map(([category, icon]) => {
                const count = dreams.filter(d => d.category === category).length
                const completed = dreams.filter(d => d.category === category && d.completed).length
                return (
                  <div
                    key={category}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                  >
                    <span className="text-4xl mb-2 block">{icon}</span>
                    <p className="text-white font-semibold capitalize">{category}</p>
                    <p className="text-purple-300 text-sm">{completed}/{count} done</p>
                  </div>
                )
              })}
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-400/20 text-center">
              <p className="text-2xl text-white font-medium mb-4">
                "Is it traditional? <span className="text-pink-400">No.</span>"</p>
              <p className="text-2xl text-white font-medium">
                "Does it make me happy? <span className="text-purple-400">Absolutely.</span>" 🙃
              </p>
            </div>

            {/* Journey Stats */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4 text-center">Your Journey So Far</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-pink-400">{dreams.length}</p>
                  <p className="text-purple-300 text-sm">Total Dreams</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">{completedCount}</p>
                  <p className="text-purple-300 text-sm">Achieved</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{journalEntries.length}</p>
                  <p className="text-purple-300 text-sm">Journal Entries</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-purple-400/50 text-xs">
          Requested by <a href="https://twitter.com/BHQpDJmjAs43022" className="hover:text-purple-300">@BHQpDJmjAs43022</a> · Built by <a href="https://twitter.com/clonkbot" className="hover:text-purple-300">@clonkbot</a>
        </p>
      </footer>
    </div>
  )
}

export default App