import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, Clock, Globe, Leaf, Users, Target } from 'lucide-react';

const serviceSlides = [
  {
    id: 1,
    title: 'Gestion Douanière Intégrée',
    description: 'Prise en charge complète des formalités douanières avec notre plateforme de suivi en temps réel. Nous gérons tous les documents, dédouanements et conformités réglementaires pour vous.',
    image: 'https://images.unsplash.com/photo-1542296332-2e44a996aa0d?w=800&q=80',
  },
  {
    id: 2,
    title: 'Consulting Stratégique',
    description: 'Expertise et conseils personnalisés pour optimiser votre chaîne logistique, réduire vos coûts d\'importation et améliorer votre compétitivité sur les marchés internationaux.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
  {
    id: 3,
    title: 'Transport National et International',
    description: 'Réseau mondial de partenaires de confiance offrant des délais de transit compétitifs et une couverture complète pour tous vos besoins de transport terrestre, maritime et aérien.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
];

const reasons = [
  { icon: Shield, title: 'Expertise complète', description: 'Plus de 10 ans d\'expérience dans la logistique internationale' },
  { icon: Target, title: 'Solutions sur mesure', description: 'Chaque client bénéficie d\'une solution adaptée à ses besoins' },
  { icon: Clock, title: 'Fiabilité et ponctualité', description: 'Respect strict des délais et engagement qualité' },
  { icon: Globe, title: 'Approche intégrée', description: 'De la prise en charge à la livraison finale' },
  { icon: Leaf, title: 'Engagement écoresponsable', description: 'Solutions logistiques respectueuses de l\'environnement' },
  { icon: Users, title: 'Partenaire stratégique', description: 'Un accompagnement durable pour votre croissance' },
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceSlides.length) % serviceSlides.length);
  };

  return (
    <section id="qui-sommes-nous" className="relative bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80"
          alt="Logistics Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
                À propos de nous
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Qui Sommes Nous
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="py-20 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sky-500 text-lg font-medium mb-4"
          >
            Nous relions les mondes, nous livrons vos rêves
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-800 leading-relaxed"
          >
            &ldquo;Notre engagement envers la transparence et la satisfaction client guide chacune de nos actions.
            Chez TRIWAYS, nous ne transportons pas seulement des marchandises,
            nous bâtissons des partenariats durables fondés sur la confiance.&rdquo;
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <p className="text-slate-500 font-medium">— Le Directeur Général</p>
          </motion.div>
        </div>
      </div>

      {/* Services Carousel */}
      <div className="py-20 bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
              Nos Expertises
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Ce qui nous définit
            </h3>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={serviceSlides[currentSlide].image}
                      alt={serviceSlides[currentSlide].title}
                      className="w-full h-[300px] lg:h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="lg:pl-8">
                    <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                      {serviceSlides[currentSlide].title}
                    </h4>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      {serviceSlides[currentSlide].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 text-red-accent font-semibold hover:underline"
                    >
                      En savoir plus
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white shadow-lg text-slate-600 hover:text-red-accent transition-colors"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <div className="flex items-center gap-2">
                  {serviceSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide
                          ? 'bg-red-accent w-8'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white shadow-lg text-slate-600 hover:text-red-accent transition-colors"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80"
                  alt="Why Choose Us"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/30" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
              >
                <p className="text-4xl font-bold text-gradient">10+</p>
                <p className="text-slate-500 text-sm">Années d&apos;expérience</p>
              </motion.div>
            </motion.div>

            {/* Reasons Grid */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
                  Nos Atouts
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Pourquoi nous choisir ?
                </h3>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group p-5 rounded-xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <reason.icon size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          {reason.title}
                        </h4>
                        <p className="text-slate-500 text-sm">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
