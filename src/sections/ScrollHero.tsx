import { ContainerScroll } from "../components/ui/container-scroll-animation";

export function ScrollHero() {
  return (
    <section className="bg-slate-950">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-300 text-sm font-medium tracking-widest uppercase">
                Espace Client
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white/80">
              Gérez votre logistique
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              En temps réel
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mt-4">
              Suivez vos dossiers douaniers, vos expéditions et vos livraisons
              depuis une seule plateforme intuitive.
            </p>
          </div>
        }
      >
        <div className="w-full h-full bg-slate-900 rounded-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center max-w-xs mx-auto">
                espaceclient.TRIWAYS.ma
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 md:p-6 h-full overflow-hidden">
            {/* Top stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "En transit", value: "12", color: "indigo" },
                { label: "Livrés", value: "48", color: "green" },
                { label: "En attente", value: "5", color: "amber" },
                { label: "Ce mois", value: "65", color: "purple" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl p-3 border ${
                    stat.color === "indigo"
                      ? "bg-indigo-500/10 border-indigo-500/20"
                      : stat.color === "green"
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : stat.color === "amber"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-purple-500/10 border-purple-500/20"
                  }`}
                >
                  <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                  <p
                    className={`text-2xl font-bold ${
                      stat.color === "indigo"
                        ? "text-indigo-400"
                        : stat.color === "green"
                        ? "text-emerald-400"
                        : stat.color === "amber"
                        ? "text-amber-400"
                        : "text-purple-400"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="grid grid-cols-5 px-4 py-2.5 bg-slate-800/60 text-xs font-medium text-slate-400 uppercase tracking-wider">
                <span>N° Dossier</span>
                <span>Origine</span>
                <span>Destination</span>
                <span>Statut</span>
                <span>Progression</span>
              </div>
              {[
                {
                  id: "LT-2024001",
                  from: "Shanghai",
                  to: "Casablanca",
                  status: "En transit",
                  pct: 72,
                  color: "indigo",
                },
                {
                  id: "LT-2024002",
                  from: "Marseille",
                  to: "Casablanca",
                  status: "Dédouanement",
                  pct: 45,
                  color: "amber",
                },
                {
                  id: "LT-2024003",
                  from: "Dubai",
                  to: "Rabat",
                  status: "Livré",
                  pct: 100,
                  color: "green",
                },
                {
                  id: "LT-2024004",
                  from: "Rotterdam",
                  to: "Tanger",
                  status: "En attente",
                  pct: 10,
                  color: "slate",
                },
              ].map((row, i) => (
                <div
                  key={row.id}
                  className="grid grid-cols-5 px-4 py-3 text-sm border-t border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                >
                  <span className="text-indigo-400 font-medium">{row.id}</span>
                  <span className="text-slate-300">{row.from}</span>
                  <span className="text-slate-300">{row.to}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                      row.color === "green"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : row.color === "amber"
                        ? "bg-amber-500/15 text-amber-400"
                        : row.color === "indigo"
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-slate-500/15 text-slate-400"
                    }`}
                  >
                    {row.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          row.color === "green"
                            ? "bg-emerald-400"
                            : row.color === "amber"
                            ? "bg-amber-400"
                            : row.color === "indigo"
                            ? "bg-indigo-400"
                            : "bg-slate-500"
                        }`}
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{row.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}