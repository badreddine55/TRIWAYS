import ScrollExpandMedia from '@/components/blocks/ScrollExpandMedia';

export default function ScrollExpandSection() {
  return (
    <section className="relative">
      <ScrollExpandMedia
        mediaSrc="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1280&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
        title="Logistics Excellence"
        date="Since 2015"
        scrollToExpand="Scroll to discover"
        mediaType="image"
        textBlend={true}
      >
        <p className="text-slate-300 text-lg leading-relaxed">
          Chez TRIWAYS International, nous croyons en une logistique transparente et efficace.
          Notre mission est de connecter les entreprises marocaines aux marchés mondiaux
          avec des solutions sur mesure, une expertise douanière incomparable et un engagement
          inébranlable envers l&apos;excellence opérationnelle.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">500+</p>
            <p className="text-slate-400 text-sm">Clients satisfaits</p>
          </div>
          <div className="w-px h-12 bg-slate-700" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">50+</p>
            <p className="text-slate-400 text-sm">Pays desservis</p>
          </div>
          <div className="w-px h-12 bg-slate-700" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">10K+</p>
            <p className="text-slate-400 text-sm">Expéditions/an</p>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
