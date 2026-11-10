import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="text-5xl font-bold">404</h1>
      <p>Page introuvable</p>
      <Link href="/" className="rounded-full bg-indigo-600 px-6 py-3">Retour à l’accueil</Link>
    </section>
  );
}
