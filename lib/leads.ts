import { getSupabaseClient } from './supabase'

export type LeadSource = 'onboarding' | 'calculator' | 'sales_form' | 'retail' | 'services' | 'food' | 'cashier' | 'store' | 'pricing_calculator' | 'inventory_health' | 'system_cost'

export interface LeadData {
  source: LeadSource
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  business_name?: string
  business_type?: string
  business_size?: string
  recommended_plan?: string
  gross_margin?: number
  net_profit?: number
  monthly_revenue?: number
  verdict?: string
  message?: string
}

export async function captureLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      console.warn('Supabase not configured — lead capture skipped')
      return { success: false, error: 'Supabase not configured' }
    }

    const { error } = await supabase
      .from('leads')
      .insert({
        ...data,
        status: 'new',
        called: false,
        followed_up: false,
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return { success: false, error: error.message }
    }

    // Ping n8n webhook after successful insert
    try {
      await fetch('https://rwn.app.n8n.cloud/webhook/new-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (webhookError) {
      // Silent fail — never block the user flow
      console.log('n8n webhook failed silently:', webhookError)
    }

    return { success: true }

  } catch (err) {
    console.error('captureLead unexpected error:', err)
    return { success: false, error: 'Unexpected error' }
  }
}
