import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'بيردآي — الكاشير الذكي',
  description: 'الجيل الجديد من أنظمة المتاجر مصمّم لزيادة مبيعاتك ورفع تكرار الشراء.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Default: Arabic RTL — LanguageProvider will update these via useEffect on toggle
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
