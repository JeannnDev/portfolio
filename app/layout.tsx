import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jean Correa | Desenvolvedor Backend',
  description: 'Desenvolvedor Backend especializado em Supabase, PostgreSQL, APIs REST e PM2. Transformo ideias em soluções robustas e escaláveis.',
  keywords: ['Desenvolvedor Backend', 'Supabase', 'PostgreSQL', 'Node.js', 'Python', 'APIs REST', 'PM2', 'Jean Correa'],
  authors: [{ name: 'Jean Correa' }],
  creator: 'Jean Correa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: "Jean Correa | Engenheiro de Software",
    description: "Desenvolvedor Backend especializado em soluções robustas e escaláveis.",
    siteName: "Jean Correa Portfolio",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jean Correa | Desenvolvedor Backend',
    description: 'Desenvolvedor Backend especializado em Supabase, PostgreSQL, APIs REST e PM2',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1116' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents "website" zoom feel
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
