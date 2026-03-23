import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mail, Folder, ArrowUpRight, Search, Bell, User } from 'lucide-react';

const dossiers = [
  { id: 'DT-2024-001', date: '15/03/2024', status: 'En cours', statusColor: 'bg-amber-500' },
  { id: 'DT-2024-002', date: '12/03/2024', status: 'Livré', statusColor: 'bg-emerald-500' },
  { id: 'DT-2024-003', date: '10/03/2024', status: 'En attente', statusColor: 'bg-slate-500' },
  { id: 'DT-2024-004', date: '08/03/2024', status: 'Livré', statusColor: 'bg-emerald-500' },
];

export default function ClientSpace() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="espace-client" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              Espace Client
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              Votre tableau de bord
            </h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Suivez vos expéditions en temps réel, gérez vos dossiers et accédez
              à toutes vos informations en un seul endroit.
            </p>
          </motion.div>

          {/* Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Red container background */}
            <div className="relative bg-red-accent rounded-3xl p-4 sm:p-8 shadow-2xl">
              {/* Floating icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 p-4 bg-white rounded-2xl shadow-xl"
              >
                <Mail className="w-8 h-8 text-red-accent" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -right-6 p-4 bg-white rounded-2xl shadow-xl"
              >
                <Folder className="w-8 h-8 text-indigo-500" />
              </motion.div>

              {/* Laptop frame */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                {/* Browser header */}
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-4">
                  {/* macOS dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  {/* URL bar */}
                  <div className="flex-1 max-w-md">
                    <div className="bg-slate-700 rounded-lg px-4 py-1.5 text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      espaceclient.TRIWAYS.ma
                    </div>
                  </div>
                  {/* Right icons */}
                  <div className="flex items-center gap-3 text-slate-400">
                    <Search size={18} />
                    <Bell size={18} />
                    <User size={18} />
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="bg-slate-50 p-6">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                      <p className="text-slate-500 text-sm mb-1">En cours</p>
                      <p className="text-3xl font-bold text-amber-500">12</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                      <p className="text-slate-500 text-sm mb-1">Livrés</p>
                      <p className="text-3xl font-bold text-emerald-500">48</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                      <p className="text-slate-500 text-sm mb-1">En attente</p>
                      <p className="text-3xl font-bold text-slate-500">5</p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                      <h4 className="font-semibold text-slate-800">Derniers dossiers</h4>
                    </div>
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                            Dossier
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                            Statut
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {dossiers.map((dossier) => (
                          <tr key={dossier.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {dossier.id}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {dossier.date}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${dossier.statusColor}`}
                              >
                                {dossier.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Voir détails
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Play/Pause overlay */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute bottom-4 right-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="#qui-sommes-nous"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              En savoir plus sur TRIWAYS
              <ArrowUpRight size={18} className="transform rotate-45" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
