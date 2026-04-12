import SectorPage from '@/components/sector/SectorPage'
import { retailData } from '@/lib/sector-data'

export const metadata = {
  title: 'بيردآي للتجزئة — سيطر على تجارتك بمنظومة واحدة',
  description: 'نظام الكاشير الذكي لتجار التجزئة في السعودية. مخزون موحد، متجر إلكتروني، وبرنامج ولاء في مكان واحد.',
}

export default function RetailPage() {
  return <SectorPage data={retailData} />
}
