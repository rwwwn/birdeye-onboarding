import SectorPage from '@/components/sector/SectorPage'
import { servicesData } from '@/lib/sector-data'

export const metadata = {
  title: 'بيردآي للخدمات — وقتك وسمعتك بمنظومة واحدة',
  description: 'نظام الكاشير الذكي لقطاع الخدمات في السعودية. اشتراكات، ولاء، وعمولات الموظفين في مكان واحد.',
}

export default function ServicesPage() {
  return <SectorPage data={servicesData} />
}
