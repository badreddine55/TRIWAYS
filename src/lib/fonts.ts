import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';

export const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-syne' });
export const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap', variable: '--font-dm-sans' });
export const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-jetbrains-mono' });
