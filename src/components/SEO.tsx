import { Helmet } from 'react-helmet-async';

interface SEOProps {
  page?: 'home' | 'services' | 'about' | 'contact';
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const seoConfig = {
  home: {
    title: 'TRIWAYS International — Transit & Logistique',
    description: 'Leader en transit, dédouanement et logistique au Maroc. Services complets d\'importation, d\'exportation et de gestion douanière intégrée.',
    image: 'https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo',
    url: 'https://www.triways.ma',
  },
  services: {
    title: 'Services de Transit & Logistique | TRIWAYS International',
    description: 'Découvrez nos services complets: gestion douanière, consulting stratégique, transport et logistique intégrée. Solutions personnalisées pour vos besoins logistiques.',
    image: 'https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo',
    url: 'https://www.triways.ma/services',
  },
  about: {
    title: 'À Propos de TRIWAYS International',
    description: 'Qui sommes-nous? TRIWAYS International, leader reconnu en logistique et transit au Maroc. Découvrez notre expertise depuis 2014 et nos engagements envers nos clients.',
    image: 'https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo',
    url: 'https://www.triways.ma/qui-sommes-nous',
  },
  contact: {
    title: 'Contactez TRIWAYS International',
    description: 'Nous sommes à écoute de vos questions. Contactez-nous pour discuter de vos besoins logistiques. Basé à Casablanca, Maroc.',
    image: 'https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo',
    url: 'https://www.triways.ma/contact',
  },
};

export default function SEO({
  page = 'home',
  title,
  description,
  image,
  url,
}: SEOProps) {
  const config = seoConfig[page];
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalImage = image || config.image;
  const finalUrl = url || config.url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="French" />
      <meta name="author" content="TRIWAYS International" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0f172a" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="TRIWAYS International" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@TRIWAYS" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        href="https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo"
      />
      <link
        rel="apple-touch-icon"
        href="https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo"
      />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'TRIWAYS International',
          url: 'https://www.triways.ma',
          logo: finalImage,
          description: finalDescription,
          sameAs: [
            'https://www.facebook.com/TRIWAYS',
            'https://www.twitter.com/TRIWAYS',
            'https://www.linkedin.com/company/triways-international',
            'https://www.instagram.com/triways.ma',
          ],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Casablanca',
            addressCountry: 'MA',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            telephone: '+212 611-087900',
            email: 'sales@triwayslogistics.ma',
          },
        })}
      </script>
    </Helmet>
  );
}
