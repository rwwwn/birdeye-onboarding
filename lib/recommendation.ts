export type BusinessType = 'retail' | 'food' | 'services'
export type BusinessSize = 'starter' | 'growing' | 'enterprise'
export type Plan = 'free' | 'professional' | 'premium'

const foodTags = new Set([
  'restaurant', 'cafe', 'food truck', 'takeaway / delivery',
  'bakery & desserts', 'juice & ice cream',
])
const serviceTags = new Set([
  'salon / barbershop', 'spa & wellness', 'car wash',
  'laundry', 'gym / fitness', 'repair & maintenance', 'cleaning services',
])

// Maps a raw tag string to its category
export function tagToCategory(tag: string): BusinessType {
  const t = tag.toLowerCase()
  if (foodTags.has(t)) return 'food'
  if (serviceTags.has(t)) return 'services'
  return 'retail'
}

// Food > services > retail in terms of plan requirements
const categoryPriority: Record<BusinessType, number> = {
  food: 3,
  services: 2,
  retail: 1,
}

// Given multiple selected tags, return the highest-priority category
export function resolveCategory(tags: string[]): BusinessType {
  if (tags.length === 0) return 'retail'
  return tags
    .map(tagToCategory)
    .reduce((best, cat) =>
      categoryPriority[cat] > categoryPriority[best] ? cat : best
    )
}

// Recommendation matrix
export function getRecommendation(type: BusinessType, size: BusinessSize): Plan {
  if (size === 'enterprise') return 'premium'
  if (size === 'growing') return type === 'food' ? 'premium' : 'professional'
  // starter
  return type === 'food' ? 'professional' : 'free'
}

export const planDetails: Record<Plan, { name: string; price: string; features: string[] }> = {
  free: {
    name: 'Starter Plan',
    price: 'Free',
    features: [
      'Sales & Discounts',
      'Inventory Management',
      'NFC Payment Gateway',
      'Daily Email Reports',
      'Up to 2,000 Products',
    ],
  },
  professional: {
    name: 'Professional Plan',
    price: '3,570 ر.س / year',
    features: [
      'Custom Online Store',
      'Unlimited Products',
      'Free Product Templates',
      'Priority Support',
    ],
  },
  premium: {
    name: 'Premium Plan',
    price: '4,820 ر.س / year',
    features: [
      'Advanced Performance Analytics',
      'Multi-location Dashboard',
      'Dedicated Account Manager',
      'Custom Integrations',
    ],
  },
}
