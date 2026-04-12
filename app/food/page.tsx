import SectorPage from '@/components/sector/SectorPage'
import { foodData } from '@/lib/sector-data'

export const metadata = {
  title: 'بيردآي للمطاعم والمقاهي — من الكاشير للمطبخ بنظام واحد',
  description: 'نظام الكاشير الذكي للمطاعم والمقاهي في السعودية. ربط المطبخ، إدارة الطاولات، وتطبيقات التوصيل من شاشة واحدة.',
}

export default function FoodPage() {
  return <SectorPage data={foodData} />
}
