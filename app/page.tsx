import { EphemerisCard } from "@/components/ephemeris-card"
import { StarField } from "@/components/star-field"
import { getEphemerisForDate } from "@/lib/ephemeris-data"

export default async function Home() {
  const today = new Date()
  const ephemeris = await getEphemerisForDate(today)

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      <StarField />

      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-500/15 to-orange-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-light text-slate-100 mb-2 tracking-wide bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent animate-gradient">
            Ephemeris
          </h1>
          <p className="text-slate-400 text-lg font-light tracking-wider">Atlas Astronómico Diario</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mt-4 animate-pulse" />
        </header>

        <div className="flex-1 flex items-center justify-center">
          <EphemerisCard ephemeris={ephemeris} />
        </div>

        <footer className="text-center text-slate-500 text-sm mt-8">
          <p className="mb-2">
            {today.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
            <span>Una nueva efeméride cada día</span>
            <div className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </footer>
      </div>
    </main>
  )
}
