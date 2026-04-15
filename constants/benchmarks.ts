export const BENCHMARKS = {
  restaurant: {
    name_ar: 'مطعم',
    name_en: 'Restaurant',
    food_cost_min: 28,
    food_cost_max: 35,
    gross_margin_min: 28,
    gross_margin_max: 35,
    net_margin_min: 3,
    net_margin_max: 9,
    net_margin_good: 15,
    labor_cost_min: 25,
    labor_cost_max: 35,
    source: 'National Restaurant Association + Toast Industry Report 2023',
  },
  cafe: {
    name_ar: 'مقهى',
    name_en: 'Cafe / Coffee Shop',
    food_cost_min: 25,
    food_cost_max: 35,
    gross_margin_min: 25,
    gross_margin_max: 35,
    net_margin_min: 3,
    net_margin_max: 9,
    net_margin_good: 15,
    labor_cost_min: 25,
    labor_cost_max: 35,
    source: 'National Restaurant Association + Lightspeed Benchmark Report 2023',
  },
  bakery: {
    name_ar: 'مخبز / حلويات',
    name_en: 'Bakery & Desserts',
    food_cost_min: 30,
    food_cost_max: 35,
    gross_margin_min: 30,
    gross_margin_max: 35,
    net_margin_min: 3,
    net_margin_max: 9,
    net_margin_good: 12,
    labor_cost_min: 25,
    labor_cost_max: 35,
    source: 'National Restaurant Association 2023',
  },
  retail_clothing: {
    name_ar: 'ملابس وأزياء',
    name_en: 'Clothing & Fashion',
    gross_margin_min: 40,
    gross_margin_max: 60,
    net_margin_min: 2,
    net_margin_max: 6,
    net_margin_good: 10,
    inventory_turnover_min: 4,
    inventory_turnover_max: 6,
    source: 'National Retail Federation Annual Benchmarks',
  },
  retail_beauty: {
    name_ar: 'عطور ومستحضرات',
    name_en: 'Beauty & Perfume',
    gross_margin_min: 50,
    gross_margin_max: 70,
    net_margin_min: 4,
    net_margin_max: 8,
    net_margin_good: 12,
    inventory_turnover_min: 4,
    inventory_turnover_max: 8,
    source: 'Euromonitor International Beauty Retail Report',
  },
  retail_grocery: {
    name_ar: 'بقالة / سوبرماركت',
    name_en: 'Grocery & Mini Market',
    gross_margin_min: 15,
    gross_margin_max: 25,
    net_margin_min: 1,
    net_margin_max: 3,
    net_margin_good: 5,
    inventory_turnover_min: 12,
    inventory_turnover_max: 15,
    source: 'Food Marketing Institute Annual Report',
  },
  salon: {
    name_ar: 'صالون / حلاقة',
    name_en: 'Salon & Barbershop',
    gross_margin_min: 50,
    gross_margin_max: 70,
    net_margin_min: 5,
    net_margin_max: 15,
    net_margin_good: 20,
    labor_cost_min: 30,
    labor_cost_max: 40,
    source: 'Professional Beauty Association Industry Report',
  },
  gym: {
    name_ar: 'جيم / نادي رياضي',
    name_en: 'Gym & Fitness',
    gross_margin_min: 55,
    gross_margin_max: 75,
    net_margin_min: 5,
    net_margin_max: 15,
    net_margin_good: 20,
    labor_cost_min: 25,
    labor_cost_max: 35,
    source: 'IHRSA Health Club Report',
  },
}

export type BusinessType = keyof typeof BENCHMARKS

export function getBenchmark(type: BusinessType) {
  return BENCHMARKS[type]
}

export function getMarginVerdict(margin: number, benchmark: (typeof BENCHMARKS)[BusinessType]) {
  if (margin >= benchmark.gross_margin_min) {
    return {
      verdict: 'Healthy',
      verdict_ar: 'صحي',
      color: '#22c55e',
      message_ar: 'هامشك ضمن المعيار الصناعي',
      message_en: 'Your margin is within industry standard',
    }
  } else if (margin >= benchmark.gross_margin_min * 0.8) {
    return {
      verdict: 'At Risk',
      verdict_ar: 'في خطر',
      color: '#f59e0b',
      message_ar: 'هامشك أقل من المعيار الصناعي',
      message_en: 'Your margin is below industry standard',
    }
  } else {
    return {
      verdict: 'Critical',
      verdict_ar: 'حرج',
      color: '#ef4444',
      message_ar: 'هامشك في المنطقة الحرجة',
      message_en: 'Your margin is in critical territory',
    }
  }
}
