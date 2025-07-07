import './globals.css';
import { Inter, Dancing_Script, Lobster, Pacifico } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' });
const lobster = Lobster({ subsets: ['latin'], weight: '400', variable: '--font-lobster' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' });

export const metadata = {
  title: 'UpSkillFam',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable} 
          ${dancing.variable} 
          ${lobster.variable} 
          ${pacifico.variable} 
          font-sans 
          bg-weird-gradient 
          text-gray-900 
          scroll-smooth
        `}
      >
        {children}
      </body>
    </html>
  );
}
