export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    nav: {
      home: 'ACCUEIL',
      about: 'QUI SOMMES NOUS',
      services: 'NOS SERVICES',
      contact: 'CONTACTEZ-NOUS',
      cta: 'Demandez un devis',
    },
    hero: {
      badge: 'TRIWAYS LOGISTICS COMPANY',
      slides: [
        { title: 'Transport National\net International' },
        { title: 'Gestion Douanière\nIntégrée' },
        { title: 'Consulting\nStratégique' },
      ],
      subtitle: 'Votre partenaire logistique',
      cta1: 'Découvrir nos services',
      cta2: 'Contactez-nous',
      scrollText: 'DÉCOUVRIR',
      emailCta: 'Envoyez-nous un email',
      whatsapp: {
        number: '212660276334',
        message: '🚛 Besoin d\'un partenaire fiable pour votre logistique ?\nNous vous proposons :\n✔️ Transport national & international\n✔️ Transit & dédouanement\n✔️ Conseil et formation en commerce international\n🎯 Moins de stress, plus d\'efficacité\n📩 Écrivez-nous pour une prise en charge rapide !',
      },
    },
    home: {
      videoSection: {
        badge: 'Découvrez-nous',
        heading: 'Notre Vision',
        company: 'TRIWAYS International',
        tagline: 'Excellence en logistique',
        live: 'LIVE',
      },
    },
    servicesPreview: {
      badge: 'Nos Expertises',
      headingPart1: 'Nos',
      headingPart2: 'Services',
      description: 'Une approche complète, de la logistique au transport enrichie par le transit et le consulting pour accompagner votre croissance.',
      transport: 'Transport National et International',
      transportDesc: 'Solutions complètes de transport multimodal : maritime, aérien et terrestre pour vos expéditions nationales et internationales.',
      customs: 'Gestion Douanière',
      customsDesc: 'Nous proposons une gestion douanière intégrée couvrant l\'ensemble de vos opérations d\'importation et d\'exportation.',
      consulting: 'Consultation et Formation Stratégique',
      consultingDesc: 'Accompagnement stratégique sur mesure : formez vos équipes et optimisez vos choix pour un succès durable.',
      learnMore: 'En savoir plus',
      cta: 'Voir tous nos services',
      expandTransport: 'Voir les types de transport',
      subServices: [
        { title: 'Transport Maritime', description: 'Solutions de fret maritime internationale avec tracking en temps réel.' },
        { title: 'Transport Aérien', description: 'Livraison express par voie aérienne pour vos marchandises urgentes.' },
        { title: 'Logistique Terrestre', description: 'Réseau routier optimisé et solutions de stockage automatisée.' },
      ],
    },
    process: {
      marquee: 'GESTION DOUANIÈRE INTÉGRÉE • CONSULTING STRATÉGIQUE • TRANSPORT NATIONAL ET INTERNATIONAL •',
      methodology: 'Notre Méthodologie',
      heading: 'Notre Processus',
      description: 'Un processus simple et transparent pour une expérience client optimale',
      steps: [
        { id: 1, title: 'Ouverture du Compte Client', description: 'Notre chargée de clientèle enregistre vos informations et crée votre compte personnel pour un suivi personnalisé.' },
        { id: 2, title: 'Création du dossier de transit', description: 'Votre dossier est ouvert avec facture proforma, marquant la prise en charge officielle de votre expédition.' },
        { id: 3, title: 'Suivi Logistique', description: 'Recevez des notifications automatiques à chaque étape, de l\'expédition jusqu\'à la livraison finale.' },
        { id: 4, title: 'Réception de la marchandise', description: 'Votre marchandise arrive en parfait état, avec un service rapide et transparent du début à la fin.' },
      ],
      ctaText: 'Prêt à démarrer votre expédition ?',
      cta: 'Commencer maintenant',
    },
    aboutPreview: {
      badge: 'À propos',
      headingPart1: 'Pourquoi nous',
      headingPart2: 'choisir',
      closingSuffix: '?',
      description: 'Une expertise reconnue et des valeurs fortes au service de votre réussite',
      cta: 'Découvrir notre histoire',
      whyChooseUs: [
        { key: 'qualified', title: 'Équipe qualifiée', description: 'Des professionnels formés dans le domaine du transport et de la logistique.' },
        { key: 'availability', title: 'Disponibilité 24/7', description: 'Une équipe dédiée à votre service jour et nuit pour suivre vos dossiers en temps réel.' },
        { key: 'network', title: 'Réseau Mondial', description: 'Partenaires stratégiques dans plus de 20 pays pour une couverture logistique complète.' },
        { key: 'security', title: 'Sécurité', description: 'Protection maximale de vos marchandises.' },
        { key: 'custom', title: 'Solutions Sur Mesure', description: 'Des stratégies logistiques adaptées à vos besoins spécifiques et contraintes métier.' },
        { key: 'support', title: 'Support Dédié', description: 'Un interlocuteur unique et expert pour accompagner chaque étape de votre projet.' },
      ],
    },
    contact: {
      headerTag: 'Contact',
      heading: 'Parlons de votre projet',
      subheading: 'Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets logistiques.',
      followUs: 'Suivez-nous',
      info: [
        { label: 'Adresse', value: 'Dakhla, Maroc' },
        { label: 'Téléphone', value: '+212 611-087900' },
        { label: 'Email', value: 'sales@triwayslogistics.ma' },
        { label: 'Horaires', value: 'Lun–Ven, 8h–18h' },
      ],
      form: {
        name: 'Nom complet',
        email: 'Email',
        phone: 'Téléphone',
        subject: 'Sujet',
        message: 'Message',
        selectOption: 'Sélectionnez une option',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        subjectOptions: {
          general: 'Demande générale',
          transport: 'Transport',
          douane: 'Douane',
          consulting: 'Consulting',
          formation: 'Formation',
          autre: 'Autre',
        },
        transportTypes: [
          { id: 'maritime', label: 'Transport Maritime', desc: 'FCL / LCL / Conteneurs' },
          { id: 'aerien', label: 'Transport Aérien', desc: 'Express / Cargo / Charter' },
          { id: 'routier', label: 'Transport Routier', desc: 'FTL / LTL / Groupage' },
        ],
      },
      success: 'Message envoyé avec succès!',
      successMessage: 'Merci de votre message. Nous vous répondrons bientôt.',
      mapCoordinates: '23.7147° N, 15.9354° W',
      viewOnMaps: 'Voir sur Maps',
      privacyNote: 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité.',
      successTitle: 'Message envoyé !',
      successBody: 'Nous vous répondrons dans les plus brefs délais.',
      expandTransport: 'Voir les types de transport',
      location: 'Dakhla, Maroc',
      mapTag: 'Voir la carte',
    },
    about: {
      heading: 'À propos de nous',
      hero: { eyebrow: 'Découvrez notre histoire', title: 'TRIWAYS INTERNATIONAL' },
      
      // Hero section
      heroBadge: 'À propos de nous',
      heroEyebrow: 'Qui Sommes Nous',
      heroTagline: 'Nous relions les mondes, nous livrons vos rêves. Découvrez l\'histoire de TRIWAYS et notre engagement pour l\'excellence logistique.',
      heroImageAlt: 'Global Logistics',
      heroImageLabel: 'Global Logistics',

      // Ticker hint
      galleryHint: 'Molette ou flèches • Auto-play après 3s',

      // Mission section
      missionWords: ['transparence', 'innovation', 'engagement'],

      mission: {
        heading: 'HISTOIRE',
        description: ["Chez Triways Logistique, notre histoire commence avec une ambition claire : offrir des solutions de transport et de logistique fiables, modernes et accessibles à tous.", "Fondée récemment, notre société est née de la volonté de répondre aux besoins croissants des entreprises en matière de gestion des flux, d'import-export et de transport national et international.", "Conscients des défis du secteur, nous avons réuni une équipe passionnée et qualifiée, déterminée à proposer un service efficace et personnalisé.", "Dès le départ, nous avons fait le choix de placer la qualité, la réactivité et la transparence au cœur de notre démarche.", "Chaque client est unique, c'est pourquoi nous nous engageons à offrir des solutions sur mesure, adaptées à ses exigences et à ses objectifs.", "Aujourd'hui, Triways Logistique poursuit son développement avec une vision claire : devenir un partenaire de confiance, capable d'accompagner ses clients à chaque étape de leur croissance, au niveau national et international."],
        keywords: ['transparence', 'innovation', 'engagement'],
      },

      // CEO Quote section
      ceoQuote: { text: "Triways Logistique est née de la volonté de trois personnes partageant la même vision : offrir un service logistique fiable, humain et performant. Aujourd'hui, nous mettons toute notre énergie et notre engagement au service de nos clients, avec une priorité claire : bâtir une relation de confiance durable et accompagner chaque projet avec sérieux et réactivité." },
      ceoTitle: 'Directeur Général',
      ceoCompany: 'TRIWAYS International',

      // Services detail section
      servicesBadge: 'Nos Expertises',
      servicesHeading: 'Nos',
      servicesHeadingGradient: 'Services',
      servicesCta: 'Demander un devis',
      services: [
        {
          title: 'Gestion Douanière Intégrée',
          description: 'Simplifiez vos formalités douanières avec notre expertise spécialisée, couvrant tous les aspects du dédouanement, des déclarations et des procédures nécessaires pour un transit fluide et efficace.',
          features: ['Dédouanement complet', 'Suivi en temps réel', 'Conformité réglementaire', 'Documentation assurée'],
        },
        {
          title: 'Consulting Stratégique',
          description: "Maximisez vos opportunités d'importation grâce à notre consulting personnalisé. Nous vous guidons à travers chaque étape, en optimisant les processus pour minimiser les coûts.",
          features: ['Optimisation des coûts', 'Analyse des processus', 'Conseil personnalisé', 'Accompagnement continu'],
        },
        {
          title: 'Transport National et International',
          description: "Profitez de notre réseau mondial de partenaires pour des solutions de transport sur mesure, offrant des délais compétitifs et une fiabilité inégalée.",
          features: ['Réseau mondial', 'Délais compétitifs', 'Multi-modal', 'Traçabilité complète'],
        },
      ],

      // Why choose us section
      whyChooseBadge: 'Nos Atouts',
      whyChooseHeading: 'Pourquoi nous',
      whyChooseCtaText: 'Demandez un devis',
      whyChooseUs: [
        { title: 'Une expertise complète', description: 'Du transport maritime, aérien et routier à la gestion douanière, nous maîtrisons toute la chaîne logistique pour vous offrir une solution globale.' },
        { title: 'Un réseau international solide', description: 'Nous collaborons avec des partenaires et des compagnies reconnues à l\'échelle mondiale pour garantir des services fiables et compétitifs.' },
        { title: 'Des coûts optimisés', description: 'Nous vous proposons les meilleures offres du marché, en optimisant vos dépenses sans compromettre la qualité du service.' },
        { title: 'Respect des délais', description: 'La ponctualité est au cœur de nos engagements. Vos marchandises arrivent à temps, en toute sécurité.' },
        { title: 'Suivi et transparence', description: 'Nous assurons un suivi en temps réel et une communication claire à chaque étape de vos expéditions.' },
        { title: 'Accompagnement personnalisé', description: 'Chaque client est unique. Nous adaptons nos solutions à vos besoins spécifiques pour garantir votre satisfaction.' },
        { title: 'Service après-vente réactif', description: 'Notre équipe reste disponible pour vous accompagner même après la livraison, avec une prise en charge rapide de vos demandes.' },
      ],

      // Gallery section
      galleryBadge: 'Notre Galerie',
      galleryTitle: "L'univers",
      galleryTitleGradient: 'TRIWAYS',

      // Ticker cities
      tickerCities: [
        { name: 'CASABLANCA', flag: '🇲🇦', country: 'Maroc' },
        { name: 'PARIS', flag: '🇫🇷', country: 'France' },
        { name: 'DUBAI', flag: '🇦🇪', country: 'Émirats Arabes Unis' },
        { name: 'SHANGHAI', flag: '🇨🇳', country: 'Chine' },
        { name: 'MIAMI', flag: '🇺🇸', country: 'États-Unis' },
        { name: 'AMSTERDAM', flag: '🇳🇱', country: 'Pays-Bas' },
        { name: 'SINGAPORE', flag: '🇸🇬', country: 'Singapour' },
        { name: 'ROTTERDAM', flag: '🇳🇱', country: 'Pays-Bas' },
      ],
    },
    services: {
      badge: 'Nos Solutions',
      heading: 'Nos Services',
      subtitle: 'Explorez nos différents services et trouvez la solution adaptée à vos besoins logistiques',
      discover: 'Découvrir',
      section: {
        expertise: 'Nos Expertises',
        what: 'Ce que nous offrons',
      },
      methodology: 'Comment ça marche',
      process: 'Notre Processus',
      processSteps: [
        { number: '01', title: 'Consultation', description: 'Analyse de vos besoins en transport et logistique.' },
        { number: '02', title: 'Devis', description: 'Proposition d\'une offre adaptée (coût, délai, mode de transport).' },
        { number: '03', title: 'Confirmation', description: 'Validation de la commande et des modalités d\'expédition.' },
        { number: '04', title: 'Exécution', description: 'Organisation et suivi du transport (douane, transit, livraison).' },
        { number: '05', title: 'Livraison', description: 'Réception de la marchandise par le destinataire.' },
        { number: '06', title: 'Accompagnement Continu', description: 'Suivi post-livraison, assistance et gestion des demandes pour garantir votre satisfaction.' },
      ],
      cta: 'Prêt à optimiser votre logistique ?',
      ctaSubtitle: 'Contactez-nous dès maintenant pour obtenir un devis personnalisé',
      ctaButton: 'Demander un devis',
      items: [
        {
          id: '01',
          title: 'Gestion Douanière',
          shortDesc: 'Formalités douanières simplifiées et conformes',
          fullDesc: 'Nous assurons une gestion complète et rigoureuse de vos formalités douanières, en garantissant un suivi précis et conforme à la réglementation en vigueur. Grâce à l\'expertise de nos partenaires spécialisés dans le domaine du transit, nous facilitons toutes vos opérations d\'import et d\'export, en réduisant les délais et en optimisant les coûts.',
          image: '/assets/servis1.jpeg',
          sections: [
            {
              title: 'Nos services incluent',
              items: [
                'Préparation et vérification des dossiers douaniers',
                'Déclaration en douane (import / export)',
                'Suivi des procédures auprès des autorités compétentes',
                'Conseil en réglementation douanière',
                'Gestion des litiges et assistance administrative',
              ],
            },
            {
              title: 'Nos engagements',
              items: [
                'Conformité réglementaire',
                'Rapidité de traitement',
                'Accompagnement personnalisé',
                'Service après-vente réactif',
              ],
            },
          ],
        },
        {
          id: '02',
          title: 'Consultation et Formation Stratégique',
          shortDesc: 'Accompagnement expert pour optimiser vos opérations',
          fullDesc: 'Nous accompagnons les entreprises à travers des services de consultation et de formation stratégique dans les domaines du transport et de la logistique internationale. Grâce à notre expertise et à celle de nos partenaires, nous aidons nos clients à optimiser leurs opérations, renforcer leurs compétences et assurer la conformité de leurs activités.',
          image: '/assets/servis2.jpeg',
          sections: [
            {
              title: 'Nos services incluent',
              items: [
                'Formation des entreprises dans le domaine du transport et de la gestion des formalités douanières',
                'Accompagnement personnalisé pour améliorer les processus logistiques',
                'Conseil en logistique internationale (import / export)',
                'Optimisation des coûts et des délais de votre activité',
                'Assistance stratégique pour le développement de vos activités',
              ],
            },
            {
              title: 'Nos engagements',
              items: [
                'Expertise et professionnalisme',
                'Solutions adaptées à vos besoins',
                'Approche pratique et orientée résultats',
                'Suivi et accompagnement continu',
              ],
            },
          ],
        },
        {
          id: '03',
          title: 'Transport National et International',
          shortDesc: 'Solutions de transport sur mesure avec réseau mondial',
          fullDesc: 'Profitez de notre réseau mondial de partenaires pour des solutions de transport sur mesure, offrant des délais compétitifs et une fiabilité inégalée.',
          image: '/assets/servis3.jpeg',
          subsections: [
            {
              id: 'maritime',
              title: 'Transport Maritime',
              description: 'Nous proposons des solutions de transport maritime fiables et compétitives vers toutes les destinations internationales. Grâce à notre réseau de partenaires et de compagnies maritimes, nous assurons l\'acheminement sécurisé de vos marchandises, quel que soit leur volume.',
              items: [
                'FCL (Full Container Load) : pour des expéditions en conteneur complet',
                'LCL (Less than Container Load) : pour les envois de petits volumes',
                'Réservation, suivi et gestion documentaire',
                'Optimisation des coûts et délais',
              ],
              action: { navigate: '/services', state: { openServiceId: '03' } },
            },
            {
              id: 'aerien',
              title: 'Transport Aérien',
              description: 'Nous proposons des solutions de transport aérien rapides et efficaces vers toutes les destinations internationales, avec des offres compétitives adaptées à vos besoins.',
              items: [
                'Réservation auprès des meilleures compagnies aériennes',
                'Suivi en temps réel des expéditions',
                'Gestion complète des formalités et de la documentation',
                'Service après-vente réactif',
              ],
              action: { navigate: '/services', state: { openServiceId: '03' } },
            },
            {
              id: 'routier',
              title: 'Transport Routier',
              description: 'Nous proposons des solutions de transport routier fiables et flexibles, adaptées à vos besoins au niveau national et international.',
              items: [
                'Livraison porte-à-porte nationale et internationale',
                'Transport en FTL (lot complet) et LTL (groupage)',
                'Réseau de partenaires logistiques fiables',
                'Gestion des formalités douanières',
                'Suivi et coordination de bout en bout',
              ],
              action: { navigate: '/services', state: { openServiceId: '03' } },
            },
          ],
          sections: [
            {
              title: 'Nos engagements',
              items: [
                'Sécurité et fiabilité des livraisons',
                'Respect des délais',
                'Tarifs compétitifs',
                'Service après-vente réactif',
              ],
            },
          ],
        },
      ],
      tickerServices: ['DÉDOUANEMENT', 'CONSULTING', 'TRANSPORT', 'FREIGHT', 'EXPRESS', 'ASSURANCE', 'INTERNATIONAL'],
      tickerCities: [
        { name: 'CASABLANCA', flag: '🇲🇦', country: 'Maroc' },
        { name: 'PARIS', flag: '🇫🇷', country: 'France' },
        { name: 'DUBAI', flag: '🇦🇪', country: 'Émirats Arabes Unis' },
        { name: 'SHANGHAI', flag: '🇨🇳', country: 'Chine' },
        { name: 'MIAMI', flag: '🇺🇸', country: 'États-Unis' },
        { name: 'AMSTERDAM', flag: '🇳🇱', country: 'Pays-Bas' },
        { name: 'SINGAPORE', flag: '🇸🇬', country: 'Singapour' },
        { name: 'ROTTERDAM', flag: '🇳🇱', country: 'Pays-Bas' },
      ],
    },
    partners: {
      badge: 'Réseau Mondial',
      heading: 'Approuvés par les Leaders de l\'Industrie',
      description: 'Nous collaborons avec les plus grands armateurs et prestataires logistiques mondiaux pour offrir un service d\'exception partout dans le monde.',
    },
    footer: {
      description: 'Votre partenaire logistique de confiance pour le transport international. Solutions complètes, expertise reconnue et accompagnement personnalisé.',
      services: 'Services',
      company: 'Entreprise',
      contact: 'Contact',
      copyright: '© TRIWAYS International. Tous droits réservés.',
      transport: {
        maritime: 'Maritime',
        air: 'Aérien',
        land: 'Terrestre',
      },
      links: {
        services: [
          { name: 'Gestion Douanière', to: '/services' },
          { name: 'Consultation et Formation Stratégique', to: '/services' },
          { name: 'Transport National et International', to: '/services' },
        ],
        company: [
          { name: 'À propos', to: '/qui-sommes-nous' },
          { name: 'Contact', to: '/contact' },
        ],
      },
      info: [
        { icon: 'mail',  text: 'sales@triwayslogistics.ma' },
        { icon: 'phone',  text: '+212 6 34 36 27 01' },
        { icon: 'phone',  text: '+212 6 11 08 79 00' },
        { icon: 'location', text: 'Dakhla, Maroc' },
      ],
      brand: {
        name: 'TRIWAYS',
        tagline: 'INTERNATIONAL',
      },
      social: [
        { label: 'LinkedIn' },
        { label: 'Twitter' },
        { label: 'Instagram' },
      ],
    },
  },

  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT US',
      services: 'OUR SERVICES',
      contact: 'CONTACT US',
      cta: 'Get a quote',
    },
    hero: {
      badge: 'TRIWAYS LOGISTICS COMPANY',
      slides: [
        { title: 'National and\nInternational Transport' },
        { title: 'Integrated\nCustoms Management' },
        { title: 'Strategic\nConsulting' },
      ],
      subtitle: 'Your logistics partner',
      cta1: 'Explore our services',
      cta2: 'Contact us',
      scrollText: 'EXPLORE',
      emailCta: 'Send us an email',
      whatsapp: {
        number: '212660276334',
        message: '🚛 Need a reliable logistics partner?\nWe offer you:\n✔️ National & international transport\n✔️ Transit & customs clearance\n✔️ Consulting and training in international commerce\n🎯 Less stress, more efficiency\n📩 Write to us for quick handling!',
      },
    },
    home: {
      videoSection: {
        badge: 'Discover us',
        heading: 'Our Vision',
        company: 'TRIWAYS International',
        tagline: 'Excellence in logistics',
        live: 'LIVE',
      },
    },
    servicesPreview: {
      badge: 'Our Expertise',
      headingPart1: 'Our',
      headingPart2: 'Services',
      description: 'A complete approach, from logistics to transport enriched by customs clearance and consulting to support your growth.',
      transport: 'National and International Transport',
      transportDesc: 'Complete multimodal transport solutions: maritime, air and road transport for your national and international shipments.',
      customs: 'Customs Management',
      customsDesc: 'We offer integrated customs management covering all your import and export operations.',
      consulting: 'Consulting and Strategic Training',
      consultingDesc: 'Tailored strategic support: train your teams and optimize your choices for lasting success.',
      learnMore: 'Learn more',
      cta: 'View all our services',
      expandTransport: 'View transport types',
      subServices: [
        { title: 'Maritime Transport', description: 'International maritime freight solutions with real-time tracking.' },
        { title: 'Air Transport', description: 'Express air delivery for your urgent goods.' },
        { title: 'Road Logistics', description: 'Optimized road network and automated storage solutions.' },
      ],
    },
    process: {
      marquee: 'INTEGRATED CUSTOMS MANAGEMENT • STRATEGIC CONSULTING • NATIONAL AND INTERNATIONAL TRANSPORT •',
      methodology: 'Our Methodology',
      heading: 'Our Process',
      subheading: 'A simple and transparent process for optimal customer experience',
      steps: [
        { title: 'Client Account Opening', description: 'Our customer service representative registers your information and creates your personal account for personalized monitoring.' },
        { title: 'Transit File Creation', description: 'Your file is opened with a proforma invoice, marking the official management of your shipment.' },
        { title: 'Logistics Monitoring', description: 'Receive automatic notifications at each stage, from shipment to final delivery.' },
        { title: 'Goods Reception', description: 'Your goods arrive in perfect condition, with fast and transparent service from start to finish.' },
      ],
      ctaText: 'Ready to start your shipment?',
      ctaButton: 'Get started now',
    },
    aboutPreview: {
      badge: 'About',
      headingPart1: 'Why choose',
      headingPart2: 'us',
      closingSuffix: '?',
      description: 'Recognized expertise and strong values at your service',
      cta: 'Discover our story',
      whyChooseUs: [
        { key: 'qualified', title: 'Qualified Team', description: 'Professionals trained in the field of transport and logistics.' },
        { key: 'availability', title: '24/7 Availability', description: 'A team dedicated to your service day and night to monitor your files in real time.' },
        { key: 'network', title: 'Global Network', description: 'Strategic partners in over 20 countries for complete logistics coverage.' },
        { key: 'security', title: 'Security', description: 'Maximum protection of your goods.' },
        { key: 'custom', title: 'Custom Solutions', description: 'Logistics strategies tailored to your specific needs and business constraints.' },
        { key: 'support', title: 'Dedicated Support', description: 'A unique and expert point of contact to accompany each step of your project.' },
      ],
    },
    contact: {
      headerTag: 'Contact',
      heading: 'Let\'s talk about your project',
      subheading: 'Our team is available to answer all your questions and support you in your logistics projects.',
      followUs: 'Follow us',
      info: [
        { label: 'Address', value: 'Dakhla, Morocco' },
        { label: 'Phone', value: '+212 611-087900' },
        { label: 'Email', value: 'sales@triwayslogistics.ma' },
        { label: 'Hours', value: 'Mon–Fri, 8am–6pm' },
      ],
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message',
        selectOption: 'Select an option',
        send: 'Send message',
        sending: 'Sending...',
        subjectOptions: {
          general: 'General inquiry',
          transport: 'Transport',
          douane: 'Customs',
          consulting: 'Consulting',
          formation: 'Training',
          autre: 'Other',
        },
        transportTypes: [
          { id: 'maritime', label: 'Maritime Transport', desc: 'FCL / LCL / Containers' },
          { id: 'aerien', label: 'Air Transport', desc: 'Express / Cargo / Charter' },
          { id: 'routier', label: 'Road Transport', desc: 'FTL / LTL / Consolidation' },
        ],
      },
      success: 'Message sent successfully!',
      successMessage: 'Thank you for your message. We will get back to you soon.',
      mapCoordinates: '23.7147° N, 15.9354° W',
      viewOnMaps: 'View on Maps',
      privacyNote: 'By submitting this form, you agree to our privacy policy.',
      successTitle: 'Message sent!',
      successBody: 'We will get back to you as soon as possible.',
      expandTransport: 'View transport types',
      location: 'Dakhla, Morocco',
      mapTag: 'View map',
    },
    about: {
      heading: 'About us',
      hero: { eyebrow: 'Discover our story', title: 'TRIWAYS INTERNATIONAL' },
      
      // Hero section
      heroBadge: 'About us',
      heroEyebrow: 'Who We Are',
      heroTagline: 'We connect worlds, we deliver your dreams. Discover the story of TRIWAYS and our commitment to logistics excellence.',
      heroImageAlt: 'Global Logistics',
      heroImageLabel: 'Global Logistics',

      galleryHint: 'Scroll or arrows • Auto-play after 3s',

      missionWords: ['transparency', 'innovation', 'commitment'],

      mission: {
        heading: 'STORY',
        description: ['At Triways Logistics, our story begins with a clear ambition: to provide reliable, modern and accessible transport and logistics solutions to all.', 'Recently founded, our company was born from the desire to meet the growing needs of companies in terms of flow management, import-export and national and international transport.', 'Aware of the challenges of the industry, we have brought together a passionate and qualified team, determined to provide an efficient and personalized service.', 'From the start, we chose to place quality, responsiveness and transparency at the heart of our approach.', 'Every customer is unique, which is why we are committed to offering tailored solutions, adapted to their requirements and objectives.', 'Today, Triways Logistics continues its development with a clear vision: to become a trusted partner, capable of supporting our clients at every stage of their growth, at national and international level.'],
        keywords: ['transparency', 'innovation', 'commitment'],
      },

      ceoTitle: 'Chief Executive Officer',
      ceoCompany: 'TRIWAYS International',

      ceoQuote: { text: 'Triways Logistics was born from the desire of three people sharing the same vision: to provide a reliable, human and high-performing logistics service. Today, we put all our energy and commitment at the service of our clients, with one clear priority: to build a lasting relationship of trust and support each project with seriousness and responsiveness.' },

      servicesBadge: 'Our Expertise',
      servicesHeading: 'Our',
      servicesHeadingGradient: 'Services',
      servicesCta: 'Request a quote',
      services: [
        {
          title: 'Integrated Customs Management',
          description: 'Simplify your customs formalities with our specialized expertise, covering all aspects of customs clearance, declarations and procedures for smooth and efficient transit.',
          features: ['Full clearance', 'Real-time tracking', 'Regulatory compliance', 'Documentation assured'],
        },
        {
          title: 'Strategic Consulting',
          description: 'Maximize your import opportunities through our personalized consulting. We guide you through every step, optimizing processes to minimize costs.',
          features: ['Cost optimization', 'Process analysis', 'Personalized advice', 'Ongoing support'],
        },
        {
          title: 'National and International Transport',
          description: 'Take advantage of our global network of partners for tailor-made transport solutions, offering competitive deadlines and unmatched reliability.',
          features: ['Global network', 'Competitive deadlines', 'Multi-modal', 'Full traceability'],
        },
      ],

      whyChooseBadge: 'Why choose us',
      whyChooseHeading: 'Why choose',
      whyChooseCtaText: 'Request a quote',
      whyChooseUs: [
        { title: 'Complete Expertise', description: 'From maritime, air and road transport to customs management, we master the entire logistics chain to provide you with a comprehensive solution.' },
        { title: 'A Solid International Network', description: 'We collaborate with recognized partners and companies worldwide to guarantee reliable and competitive services.' },
        { title: 'Optimized Costs', description: 'We offer you the best market offers, optimizing your expenses without compromising service quality.' },
        { title: 'Respect for Deadlines', description: 'Punctuality is at the heart of our commitments. Your goods arrive on time, safely.' },
        { title: 'Follow-up and Transparency', description: 'We ensure real-time monitoring and clear communication at each stage of your shipments.' },
        { title: 'Personalized Support', description: 'Every customer is unique. We adapt our solutions to your specific needs to ensure your satisfaction.' },
        { title: 'Responsive After-Sales Service', description: 'Our team remains available to support you even after delivery, with quick handling of your requests.' },
      ],

      galleryBadge: 'Our Gallery',
      galleryTitle: 'The world of',
      galleryTitleGradient: 'TRIWAYS',

      tickerCities: [
        { name: 'CASABLANCA', flag: '🇲🇦', country: 'Morocco' },
        { name: 'PARIS', flag: '🇫🇷', country: 'France' },
        { name: 'DUBAI', flag: '🇦🇪', country: 'UAE' },
        { name: 'SHANGHAI', flag: '🇨🇳', country: 'China' },
        { name: 'MIAMI', flag: '🇺🇸', country: 'United States' },
        { name: 'AMSTERDAM', flag: '🇳🇱', country: 'Netherlands' },
        { name: 'SINGAPORE', flag: '🇸🇬', country: 'Singapore' },
        { name: 'ROTTERDAM', flag: '🇳🇱', country: 'Netherlands' },
      ],
    },
    services: {
      badge: 'Our Solutions',
      heading: 'Our Services',
      subtitle: 'Explore our different services and find the solution adapted to your logistics needs',
      discover: 'Explore',
      section: {
        expertise: 'Our Expertise',
        what: 'What we offer',
      },
      methodology: 'How it works',
      process: 'Our Process',
      processSteps: [
        { number: '01', title: 'Consultation', description: 'Analysis of your transport and logistics needs.' },
        { number: '02', title: 'Quote', description: 'Proposal of a customized offer (cost, deadline, transport mode).' },
        { number: '03', title: 'Confirmation', description: 'Validation of the order and shipping terms.' },
        { number: '04', title: 'Execution', description: 'Organization and monitoring of transport (customs, transit, delivery).' },
        { number: '05', title: 'Delivery', description: 'Receipt of goods by the recipient.' },
        { number: '06', title: 'Continuous Support', description: 'Post-delivery follow-up, assistance and request management to ensure your satisfaction.' },
      ],
      cta: 'Ready to optimize your logistics?',
      ctaSubtitle: 'Contact us now to get a personalized quote',
      ctaButton: 'Request a quote',
      items: [
        {
          id: '01',
          title: 'Customs Management',
          shortDesc: 'Simplified and compliant customs procedures',
          fullDesc: 'We ensure complete and rigorous management of your customs procedures, guaranteeing precise monitoring in compliance with current regulations. Thanks to the expertise of our partners specialized in the field of transit, we facilitate all your import and export operations, reducing delays and optimizing costs.',
          image: '/assets/servis1.jpeg',
          sections: [
            {
              title: 'Our services include',
              items: [
                'Preparation and verification of customs files',
                'Customs declaration (import / export)',
                'Monitoring of procedures with competent authorities',
                'Advice on customs regulations',
                'Dispute management and administrative assistance',
              ],
            },
            {
              title: 'Our commitments',
              items: [
                'Regulatory compliance',
                'Speed of processing',
                'Personalized support',
                'Responsive after-sales service',
              ],
            },
          ],
        },
        {
          id: '02',
          title: 'Consulting and Strategic Training',
          shortDesc: 'Expert support to optimize your operations',
          fullDesc: 'We support companies through consulting and strategic training services in the fields of transport and international logistics. Thanks to our expertise and that of our partners, we help our clients optimize their operations, strengthen their skills and ensure the compliance of their activities.',
          image: '/assets/servis2.jpeg',
          sections: [
            {
              title: 'Our services include',
              items: [
                'Training companies in the field of transport and customs procedures management',
                'Personalized support to improve logistics processes',
                'Advice on international logistics (import / export)',
                'Optimization of costs and deadlines for your activity',
                'Strategic assistance for the development of your activities',
              ],
            },
            {
              title: 'Our commitments',
              items: [
                'Expertise and professionalism',
                'Solutions tailored to your needs',
                'Practical and results-oriented approach',
                'Continuous follow-up and support',
              ],
            },
          ],
        },
        {
          id: '03',
          title: 'National and International Transport',
          shortDesc: 'Customized transport solutions with global network',
          fullDesc: 'Benefit from our global network of partners for customized transport solutions, offering competitive deadlines and unmatched reliability.',
          image: '/assets/servis3.jpeg',
          subsections: [
            {
              id: 'maritime',
              title: 'Maritime Transport',
              description: 'We offer reliable and competitive maritime transport solutions to all international destinations. Thanks to our network of partners and shipping companies, we ensure safe delivery of your goods, regardless of volume.',
              items: [
                'FCL (Full Container Load): for full container shipments',
                'LCL (Less than Container Load): for small volume shipments',
                'Booking, tracking and documentation management',
                'Cost and deadline optimization',
              ],
              action: { navigate: '/services', state: { openServiceId: '03' } },
            },
            {
              id: 'aerien',
              title: 'Air Transport',
              description: 'We offer fast and efficient air transport solutions to all international destinations, with competitive offers tailored to your needs.',
              items: [
                'Booking with the best airlines',
                'Real-time shipment tracking',
                'Complete management of formalities and documentation',
                'Responsive after-sales service',
              ],
              action: { navigate: '/services', state: { openServiceId: '03' } },
            },
            {
              id: 'routier',
              title: 'Road Transport',
              description: 'We offer reliable and flexible road transport solutions, tailored to your needs at national and international levels.',
              items: [
                'Door-to-door delivery, national and international',
                'Transport in FTL (full load) and LTL (consolidation)',
                'Network of reliable logistics partners',
                'Management of customs procedures',
                'End-to-end tracking and coordination',
              ],
              action: { navigate: '/services', state: { openServiceId: '03' } },
            },
          ],
          sections: [
            {
              title: 'Our commitments',
              items: [
                'Safety and reliability of deliveries',
                'Respect for deadlines',
                'Competitive prices',
                'Responsive after-sales service',
              ],
            },
          ],
        },
      ],
      tickerServices: ['CUSTOMS CLEARANCE', 'CONSULTING', 'TRANSPORT', 'FREIGHT', 'EXPRESS', 'INSURANCE', 'INTERNATIONAL'],
      tickerCities: [
        { name: 'CASABLANCA', flag: '🇲🇦', country: 'Morocco' },
        { name: 'PARIS', flag: '🇫🇷', country: 'France' },
        { name: 'DUBAI', flag: '🇦🇪', country: 'UAE' },
        { name: 'SHANGHAI', flag: '🇨🇳', country: 'China' },
        { name: 'MIAMI', flag: '🇺🇸', country: 'United States' },
        { name: 'AMSTERDAM', flag: '🇳🇱', country: 'Netherlands' },
        { name: 'SINGAPORE', flag: '🇸🇬', country: 'Singapore' },
        { name: 'ROTTERDAM', flag: '🇳🇱', country: 'Netherlands' },
      ],
    },
    partners: {
      badge: 'Global Network',
      heading: 'Trusted by Industry Leaders',
      description: 'We collaborate with the world\'s leading shipping lines and logistics providers to deliver exceptional service worldwide.',
    },
    footer: {
      description: 'Your trusted logistics partner for international transport. Complete solutions, recognized expertise and personalized support.',
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
      copyright: '© TRIWAYS International. All rights reserved.',
      transport: {
        maritime: 'Maritime',
        air: 'Air',
        land: 'Land',
      },
      links: {
        services: [
          { name: 'Customs Management', to: '/services' },
          { name: 'Consulting and Strategic Training', to: '/services' },
          { name: 'National and International Transport', to: '/services' },
        ],
        company: [
          { name: 'About', to: '/qui-sommes-nous' },
          { name: 'Contact', to: '/contact' },
        ],
      },
      info: [
        { icon: 'mail', text: 'sales@triwayslogistics.ma' },
        { icon: 'phone', text: '+212 6 34 36 27 01' },
        { icon: 'phone',  text: '+212 6 11 08 79 00' },
        { icon: 'location', text: 'Dakhla, Morocco' },
      ],
      brand: {
        name: 'TRIWAYS',
        tagline: 'INTERNATIONAL',
      },
      social: [
        { label: 'LinkedIn' },
        { label: 'Twitter' },
        { label: 'Instagram' },
      ],
    },
  },
};

export const getTranslation = (lang: Language, key: string): any => {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  return value;
};
