import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme/ThemeProvider';
import TransitionProvider from '@/components/navigation/TransitionProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Rishi Thakor — Independent Designer & Developer',
  description:
    'Freelance web and app development, UI/UX design and graphic design by Rishi Thakor. Working remotely with clients worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var savedTheme=window.localStorage.getItem('portfolio-theme');if(savedTheme==='light'||savedTheme==='dark'){document.documentElement.dataset.theme=savedTheme}else{document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}}catch(error){console.error('Unable to read the saved portfolio theme.',error);document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
