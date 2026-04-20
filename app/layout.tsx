import type { Metadata } from 'next'
import './global.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'بيردآي — الكاشير الذكي',
  description: 'الجيل الجديد من أنظمة المتاجر مصمّم لزيادة مبيعاتك ورفع تكرار الشراء.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E5F25TDMKN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E5F25TDMKN');
          `}
        </Script>

      </body>
    </html>
  )
}