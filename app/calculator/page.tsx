'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/home/Navbar'
import { captureLead } from '@/lib/leads'

interface Inputs {
  revenue: string
  cogs: string
  rent: string
  employees: string
  avgSalary: string
}

type Verdict = 'Healthy' | 'At Risk' | 'Critical'

const verdictConfig: Record<Verdict, { bg: string; text: string; border: string }> = {
  Healthy:  { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  'At Risk': { bg: 'bg-amber-50', text: 'text-amber-700',  border: 'border-amber-200' },
  Critical: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
}

function parseNum(v: string): number {
  const n = parseFloat(v.replace(/,/g, ''))
  return isNaN(n) ? 0 : n
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    revenue: '',
    cogs: '',
    rent: '',
    employees: '',
    avgSalary: '',
  })
  const [emailInput, setEmailInput] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const results = useMemo(() => {
    const revenue = parseNum(inputs.revenue)
    const cogs = parseNum(inputs.cogs)
    const rent = parseNum(inputs.rent)
    const employees = parseNum(inputs.employees)
    const avgSalary = parseNum(inputs.avgSalary)

    if (revenue === 0) return null

    const grossProfit = revenue - cogs
    const grossMargin = (grossProfit / revenue) * 100
    const totalSalaries = employees * avgSalary
    const netProfit = grossProfit - rent - totalSalaries
    const totalFixed = rent + totalSalaries
    const breakEven = cogs > 0 && revenue > cogs
      ? (totalFixed / (1 - cogs / revenue))
      : totalFixed

    const verdict: Verdict =
      grossMargin >= 30 ? 'Healthy' : grossMargin >= 15 ? 'At Risk' : 'Critical'

    return { grossMargin, netProfit, breakEven, verdict }
  }, [inputs])

  function handleChange(key: keyof Inputs, value: string) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!emailInput.trim() || !results) return

    const result = await captureLead({
      source: 'calculator',
      email: emailInput.trim(),
      monthly_revenue: parseNum(inputs.revenue),
      gross_margin: parseFloat(results.grossMargin.toFixed(1)),
      net_profit: results.netProfit,
      verdict: results.verdict,
    })

    if (!result.success) {
      console.error('Lead capture failed silently:', result.error)
    }

    setEmailSubmitted(true)
  }

  function inputField(
    key: keyof Inputs,
    label: string,
    placeholder: string
  ) {
    return (
      <div className="flex flex-col gap-1.5" key={key}>
        <label htmlFor={key} className="text-sm font-medium text-navy">
          {label}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-navy/40 font-medium select-none">
            ر.س
          </span>
          <input
            id={key}
            type="number"
            min="0"
            placeholder={placeholder}
            value={inputs[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray text-sm text-navy placeholder:text-navy/30 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F8FB] py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              Is your business profitable?
            </h1>
            <p className="mt-3 text-navy/60 text-base">
              Enter your numbers to find out instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Inputs */}
            <div className="bg-white rounded-2xl border border-gray p-8 flex flex-col gap-5">
              <h2 className="font-semibold text-navy text-lg">Your monthly numbers</h2>
              {inputField('revenue', 'Monthly Revenue', '0')}
              {inputField('cogs', 'Cost of Goods (COGS)', '0')}
              {inputField('rent', 'Monthly Rent', '0')}
              {inputField('employees', 'Number of Employees', '0')}
              {inputField('avgSalary', 'Average Salary per Employee', '0')}
            </div>

            {/* Results */}
            <div className="flex flex-col gap-5">
              {results ? (
                <>
                  {/* Verdict badge */}
                  <div
                    className={`rounded-2xl border-2 p-6 flex items-center justify-between ${verdictConfig[results.verdict].bg} ${verdictConfig[results.verdict].border}`}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1">
                        Overall verdict
                      </p>
                      <p className={`text-2xl font-bold ${verdictConfig[results.verdict].text}`}>
                        {results.verdict}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${verdictConfig[results.verdict].bg}`}
                    >
                      {results.verdict === 'Healthy' ? '✓' : results.verdict === 'At Risk' ? '⚠' : '✕'}
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        label: 'Gross Profit Margin',
                        value: `${results.grossMargin.toFixed(1)}%`,
                        note: results.grossMargin >= 30 ? 'Strong margin' : results.grossMargin >= 15 ? 'Watch this closely' : 'Below healthy threshold',
                      },
                      {
                        label: 'Net Profit Estimate',
                        value: `${results.netProfit >= 0 ? '' : '-'}ر.س ${Math.abs(results.netProfit).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                        note: results.netProfit >= 0 ? 'After rent & salaries' : 'Operating at a loss',
                      },
                      {
                        label: 'Break-even Point',
                        value: `ر.س ${results.breakEven.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                        note: 'Monthly revenue needed to cover all costs',
                      },
                    ].map((m) => (
                      <div key={m.label} className="bg-white rounded-xl border border-gray p-5">
                        <p className="text-xs text-navy/40 font-medium uppercase tracking-widest">
                          {m.label}
                        </p>
                        <p className="text-2xl font-bold text-navy mt-1">{m.value}</p>
                        <p className="text-xs text-navy/50 mt-1">{m.note}</p>
                      </div>
                    ))}
                  </div>

                  {/* Email capture */}
                  <div className="bg-navy rounded-2xl p-6 text-white">
                    <p className="font-semibold text-base mb-1">Get your detailed report</p>
                    <p className="text-white/60 text-xs mb-4">
                      We&apos;ll send a full breakdown with recommendations to your inbox.
                    </p>
                    {emailSubmitted ? (
                      <p className="text-yellow text-sm font-medium">
                        ✓ Report on its way to {emailInput}
                      </p>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="flex gap-2">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          required
                          className="flex-1 h-10 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-yellow text-navy text-sm font-semibold hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-navy"
                        >
                          Send
                        </button>
                      </form>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-gray p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[320px]">
                  <div className="w-12 h-12 rounded-full bg-[#F8F8FB] flex items-center justify-center">
                    <svg className="w-6 h-6 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-navy/40 text-sm">Enter your monthly revenue to see your results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
