import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const switzer = localFont({
    src: '../../fonts/Switzer-Bold.woff2',
    display: 'swap',
});

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});