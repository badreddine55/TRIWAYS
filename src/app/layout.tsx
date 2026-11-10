import type { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import NavigationEffects from '@/components/layout/NavigationEffects';
import './globals.css';
import { syne, dmSans, jetbrainsMono } from '@/lib/fonts';

export const metadata: Metadata = { title: 'TRIWAYS Logistics' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
        <div className="min-h-screen bg-white">
          <Navbar />
          <NavigationEffects />
          <main>{children}</main>
          <Footer />
        </div>
        <noscript><style>{`.service-panel { height: auto !important; overflow: visible !important; }`}</style></noscript>
      </body>
    </html>
  );
}
