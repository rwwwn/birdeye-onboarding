'use client'

import Navbar from '@/components/home/Navbar'
import SectorLeadForm from './SectorLeadForm'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  SectorData,
  sharedIntegrations,
  sharedCertifications,
  sharedClientsLabel,
  sharedIntegrationsLabel,
  sharedCertificationsLabel,
  sharedCertificationsBody,
} from '@/lib/sector-data'

export default function SectorPage({ data }: { data: SectorData }) {
  const { tr } = useLanguage()

  return (
    <>
      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-navy pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-12 flex flex-col items-center text-center gap-8">
          {/* Sector label */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold text-navy bg-yellow">
            {tr(data.label)}
          </span>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl whitespace-pre-line">
            {tr(data.hero.headline)}
          </h1>

          {/* Body */}
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            {tr(data.hero.body)}
          </p>

          {/* CTA */}
          <a
            href="#register"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-yellow text-navy text-base font-bold hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-navy"
          >
            {tr(data.hero.cta)}
          </a>

          {/* Video placeholder */}
          <div
            className="w-full max-w-4xl flex items-center justify-center mt-4"
            style={{ height: '400px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span className="text-white/30 text-sm font-medium">{tr(data.hero.videoLabel)}</span>
          </div>
        </div>
      </section>

      {/* ── S2: CLIENT LOGOS ──────────────────────────────────────────────── */}
      <section className="bg-[#F8F8FB] py-12">
        <div className="max-w-7xl mx-auto px-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy/40 mb-8">
            {tr(sharedClientsLabel)}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-12 rounded-xl bg-white border border-gray"
                aria-label="Client logo placeholder"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: PROJECT TYPES ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            {tr(data.projectsHeadline)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.projects.map((project) => (
              <div
                key={project.en}
                className="relative aspect-video rounded-2xl bg-[#F8F8FB] border border-gray flex items-end p-5 overflow-hidden group"
              >
                {/* Placeholder image bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="relative font-display text-lg font-bold text-white">
                  {tr(project)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: BENEFITS ──────────────────────────────────────────────────── */}
      <section className="bg-[#F8F8FB] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-14">
            {tr(data.benefitsHeadline)}
          </h2>
          <div className="flex flex-col gap-6">
            {data.benefits.map((benefit, i) => (
              <div
                key={benefit.hook.en}
                className={`rounded-3xl p-10 md:p-12 flex flex-col md:flex-row gap-8 items-start ${
                  i % 2 === 0 ? 'bg-white' : 'bg-yellow'
                }`}
              >
                {/* Number */}
                <span className="font-display text-5xl font-bold text-navy/10 flex-shrink-0 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-3">
                  {/* Hook */}
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {tr(benefit.hook)}
                  </h3>
                  {/* Problem */}
                  <p className="text-sm font-semibold text-purple">
                    {tr(benefit.problem)}
                  </p>
                  {/* Solution */}
                  <p className="text-navy/70 text-base leading-relaxed max-w-2xl">
                    {tr(benefit.solution)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: HARDWARE ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            {tr(data.hardwareHeadline)}
          </h2>
          <div className={`grid gap-6 ${data.hardware.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {data.hardware.map((device) => (
              <div key={device.name.en} className="rounded-2xl bg-[#F8F8FB] border border-gray p-8 flex flex-col gap-4">
                {/* Device image placeholder */}
                <div className="w-full aspect-video rounded-xl bg-navy/5 flex items-center justify-center">
                  <span className="text-navy/20 text-xs font-medium">{tr(device.name)}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-navy">{tr(device.name)}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{tr(device.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: INTEGRATIONS ──────────────────────────────────────────────── */}
      <section className="bg-[#F8F8FB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-4">
            {tr(sharedIntegrationsLabel)}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {sharedIntegrations.map((name) => (
              <div
                key={name}
                className="h-16 px-8 rounded-2xl bg-white border border-gray flex items-center justify-center"
              >
                <span className="text-sm font-semibold text-navy/50">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: SUCCESS STORY ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-12">
          <div className="bg-[#F8F8FB] rounded-3xl p-10 md:p-14 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 000 2h3a1 1 0 000-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-purple">
                {tr({ ar: 'قصة نجاح', en: 'Success Story' })}
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy leading-tight">
              {tr(data.successStory.title)}
            </h2>
            <p className="text-navy/70 text-base leading-relaxed">
              {tr(data.successStory.body)}
            </p>
          </div>
        </div>
      </section>

      {/* ── S8: CERTIFICATIONS ────────────────────────────────────────────── */}
      <section className="bg-[#F8F8FB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy mb-3">
            {tr(sharedCertificationsLabel)}
          </h2>
          <p className="text-navy/60 text-base mb-10 max-w-xl mx-auto">
            {tr(sharedCertificationsBody)}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {sharedCertifications.map((cert) => (
              <div
                key={cert.en}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border-2 border-navy/10 text-sm font-semibold text-navy"
              >
                <svg className="w-4 h-4 text-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tr(cert)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S9: LEAD FORM ─────────────────────────────────────────────────── */}
      <SectorLeadForm
        headline={data.formCta.headline}
        cta={data.formCta.cta}
        source={data.id}
        businessTypeOptions={data.businessTypeOptions}
      />

      {/* Simple footer */}
      <div className="bg-navy border-t border-white/10 py-6">
        <p className="text-center text-white/30 text-xs">
          © {new Date().getFullYear()} BirdEye · بيردآي. {tr({ ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' })}.
        </p>
      </div>
    </>
  )
}
