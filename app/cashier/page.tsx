'use client'

import Link from 'next/link'
import Navbar from '@/components/home/Navbar'
import SectorLeadForm from '@/components/sector/SectorLeadForm'
import { useLanguage } from '@/contexts/LanguageContext'
import { sharedIntegrations, sharedCertifications, sharedCertificationsLabel, sharedCertificationsBody } from '@/lib/sector-data'

const copy = {
  hero: {
    headline: { ar: 'الكاشير الذكي..عقل التشغيل اللي يمنحك الوضوح والسيطرة!', en: 'The Intelligent POS — the operational brain that gives you clarity and control!' },
    body:     { ar: 'نظامنا مو مجرد شاشة تحسب الفلوس؛ نقدملك مركز قيادة متكامل يزيد مبيعاتك، يراقب ورديات موظفيك، ويضمن إن كل هللة تدخل الدرج أو تطلع منه مسجلة ومحسوبة صح. سيطر على الكاشير.. تسيطر على تجارتك.', en: "Our system isn't just a screen that tallies money—it's a complete command center that grows your sales, monitors employee shifts, and ensures every halala in or out of the drawer is recorded and accounted for. Control the cashier... control your business." },
    cta:      { ar: 'جرب النظام الآن مجاناً', en: 'Try the System Free Now' },
  },
  clientsLabel: { ar: 'تجار سيطروا على تجارتهم مع نظام الكاشير الذكي', en: 'Merchants who took control with the Intelligent POS' },
  interfaceHeadline: { ar: 'واجهة ذكية وسهلة.. تتفصّل على مقاس مشروعك!', en: 'A smart, easy interface — tailored to your business!' },
  retail_if: { ar: 'تجارة التجزئة: شاشة بيع سريعة، مسح للباركود، وتعليق للفواتير بلمح البصر عشان الطابور ما يوقف ولا ثانية.', en: 'Retail: fast sales screen, barcode scanning, and invoice suspension in an instant so the queue never stops for a second.' },
  food_if:   { ar: 'المطاعم والمقاهي: توجيه الطلبات للمطبخ فورًا، إدارة دقيقة للطاولات، واستقبال طلبات تطبيقات التوصيل من شاشة واحدة.', en: 'Restaurants & Cafes: instant kitchen order routing, precise table management, and all delivery app orders from one screen.' },
  featuresHeadline: { ar: '', en: '' },
  features: [
    {
      hook:     { ar: 'السرعة تنهي الزحمة.. والعميل ما عنده صبر!', en: "Speed ends the rush — and customers have no patience!" },
      body:     { ar: 'الانتظار يخسرك زباينك. صممنا واجهة بيردآي لإنهاء العمليات في ثواني؛ امسح الباركود، طبق الخصم، أو علق فاتورة العميل المتردد لعميل جاهز، وامشي بالطابور بدون أي تعطيل.', en: "Waiting loses you customers. We designed BirdEye's interface to complete transactions in seconds—scan the barcode, apply the discount, or suspend a hesitant customer's invoice for the next ready customer, and move the queue without any interruption." },
      bg: 'bg-yellow',
    },
    {
      hook:     { ar: 'الدرج ما يكذب.. رقابة صارمة على الورديات!', en: "The drawer doesn't lie — strict shift control!" },
      body:     { ar: 'خايف من التلاعب أو أخطاء الحسابات نهاية اليوم؟ مع نظام الكاشير الذكي، كل موظف له صلاحيات محددة. تقفل الوردية بدقة، سجل العهدة من الدرج مباشرة، واستلم تقريرك اليومي بالهللة. صفر مجال للتخمين والخطأ.', en: "Worried about manipulation or end-of-day accounting errors? With the Intelligent POS, every employee has defined permissions. Close shifts precisely, record drawer custody directly, and receive your daily report to the halala. Zero room for guesswork and error." },
      bg: 'bg-teal',
    },
    {
      hook:     { ar: 'النت يفصل؟ تجارتك ما توقف!', en: "Internet cuts out? Your business doesn't stop!" },
      body:     { ar: 'لا تربط رزقك باتصال الإنترنت. نظام الكاشير الذكي يستمر في البيع وطباعة الفواتير، حتى لو فصل النت. وبمجرد عودة الاتصال، تتزامن كل مبيعاتك ومخزونك تلقائياً وبدون أي تدخل منك. أساس صلب ما ينهز.', en: "Don't tie your livelihood to an internet connection. The Intelligent POS continues selling and printing invoices even when offline. Once the connection returns, all your sales and inventory sync automatically without any intervention from you. A solid foundation that never shakes." },
      bg: 'bg-[#EEEDFE]',
    },
    {
      hook:     { ar: 'لا تبيع وتترك الزبون يمشي.. حوّله لعميل دائم.', en: "Don't sell and let the customer walk — turn them into a loyal one." },
      body:     { ar: 'من نفس شاشة الكاشير، وبدون أنظمة خارجية؛ ابدأ في بناء قاعدة عملائك. فعّل "نقاط الولاء"، اشحن رصيدهم في "محفظة العميل"، وأدر مبيعات "الدفع الآجل" بضغطة زر. العميل اللي يشتري اليوم، الكاشير الذكي يضمن لك رجعته بكرة.', en: 'From the same cashier screen, without external systems—start building your customer base. Activate loyalty points, top up balances in the customer wallet, and manage deferred payment sales with the press of a button. The customer who buys today, the Intelligent POS guarantees their return tomorrow.' },
      bg: 'bg-white',
    },
  ],
  hardwareHeadline: { ar: 'أجهزة تعكس احترافيتك.. وتتحمل ضغط العمل!', en: 'Devices that reflect your professionalism and handle work pressure!' },
  hardwareBody:     { ar: 'لا ترضى بأجهزة كاشير بطيئة أو تشوه ديكور محلك. وفرنا لك مجموعة من الأجهزة المصممة لتعطيك أداء ثابت وقت الزحمة، ومظهر يترك انطباع احترافي عند عميلك.', en: "Don't settle for slow POS devices that ruin your store's decor. We provide a range of devices designed to give you stable performance during rush hours and a professional appearance that impresses your customers." },
  hardware: [
    { name: { ar: 'جهاز إكس (X)', en: 'X Device' }, desc: { ar: 'المحطة المتكاملة بشاشتين. شاشة لك تدير منها الزحمة، وشاشة لعميلك تضمن له الشفافية التامة. مصمم لنقاط البيع ذات الضغط العالي.', en: 'The integrated dual-screen station. One screen for you to manage the rush, one for your customer for full transparency. Designed for high-pressure sales points.' } },
    { name: { ar: 'جهاز فلكس (Flex)', en: 'Flex Device' }, desc: { ar: 'المرونة في أقوى صورها. جهاز يجمع بين قوة الكاشير الثابت ومرونة التنقل، عشان يتشكل بالضبط مع مساحة وطبيعة محلك.', en: 'Flexibility at its finest. A device that combines the power of a fixed cashier with the flexibility of mobility, adapting perfectly to your store space and nature.' } },
    { name: { ar: 'ستاند بيردآي', en: 'BirdEye Stand' }, desc: { ar: 'مو مجرد حامل أجهزة؛ هذا تصميمنا الخاص اللي يحول جهازك اللوحي لمحطة كاشير احترافية، مجهز بكل المداخل اللي تحتاجها بدون فوضى أسلاك.', en: "Not just a device stand—this is our custom design that turns your tablet into a professional POS station, equipped with all the ports you need without cable chaos." } },
    { name: { ar: 'جهاز جو (Go)', en: 'Go Device' }, desc: { ar: 'كاشيرك المحمول عالي الأداء. خذه معاك بين الطاولات أو الرفوف، اضرب الباركود، واطبع الفاتورة من نفس الجهاز في ثواني.', en: 'Your high-performance mobile cashier. Take it between tables or shelves, scan the barcode, and print the invoice from the same device in seconds.' } },
    { name: { ar: 'جهاز إيزي (Easy)', en: 'Easy Device' }, desc: { ar: 'الحل العملي والسريع. كاشير متكامل بحجم الكف، يخليك تخلص الطوابير وتستلم المدفوعات من أي زاوية في المحل.', en: 'The practical and fast solution. A full cashier in the palm of your hand, letting you clear queues and receive payments from any corner of the store.' } },
  ],
  integrationsLabel: { ar: 'منظومة سلسة.. شركاء يسرّعون نموك!', en: 'A seamless platform — partners that accelerate your growth!' },
  integrationsBody:  { ar: 'لأننا عقل التشغيل، ربطنا كاشيرك بأقوى مزودي الخدمات في السوق.', en: "Because we're the operational brain, we connected your cashier to the most powerful service providers in the market." },
  successTitle: { ar: "كيف تخلصت 'بشوف مع التمكين' من فوضى الزحمة وأخطاء الكاشير؟", en: "How 'Bshouf with Tamkeen' eliminated rush chaos and cashier errors?" },
  successBody:  { ar: 'كانت أوقات الذروة تمثل كابوسًا للمحل؛ طوابير طويلة، بطء في إدخال الطلبات، ونهاية يوم مليئة بأخطاء الجرد ونقص في عهدة الدرج. مع دخول منظومة بيردآي بكاشيرها الذكي، تحولت شاشة البيع إلى أداة تنهي الطابور في ثواني. تم تفعيل نظام صلاحيات الموظفين، وصار تقفيل الوردية دقيق بالهللة. والنتيجة مبيعات أسرع، رقابة مالية تامة، وتفرغ كامل للإدارة لتوسيع النشاط بدل الغرق في العمليات اليومية.', en: "Peak hours were a nightmare for the store: long queues, slow order entry, and end-of-day filled with inventory errors and drawer shortages. With BirdEye's intelligent cashier, the sales screen became a tool that clears queues in seconds. Employee permissions were activated, and shift closing became accurate to the halala. The result: faster sales, complete financial oversight, and full management focus on expansion instead of drowning in daily operations." },
  formHeadline: { ar: 'جاهز تفرض سيطرتك على كل بيعة؟', en: 'Ready to take control of every sale?' },
  formCta:      { ar: 'جرب النظام الآن مجانًا', en: 'Try the System Free Now' },
}

const bizTypeOptions = ['تجزئة', 'مطعم أو مقهى', 'خدمات', 'أخرى']

export default function CashierPage() {
  const { tr } = useLanguage()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-12 flex flex-col items-center text-center gap-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold text-navy bg-yellow">
            {tr({ ar: 'الكاشير الذكي', en: 'Intelligent POS' })}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            {tr(copy.hero.headline)}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{tr(copy.hero.body)}</p>
          <a
            href="#register"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-yellow text-navy text-base font-bold hover:bg-opacity-90 transition-all"
          >
            {tr(copy.hero.cta)}
          </a>
        </div>
      </section>

      {/* Client logos */}
      <section className="bg-[#F8F8FB] py-12">
        <div className="max-w-7xl mx-auto px-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy/40 mb-8">{tr(copy.clientsLabel)}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-24 h-12 rounded-xl bg-white border border-gray" />
            ))}
          </div>
        </div>
      </section>

      {/* Interface section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            {tr(copy.interfaceHeadline)}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: { ar: 'تجارة التجزئة', en: 'Retail' }, body: copy.retail_if, href: '/retail' },
              { label: { ar: 'المطاعم والمقاهي', en: 'Food & Beverage' }, body: copy.food_if, href: '/food' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl bg-[#F8F8FB] border border-gray p-8 flex flex-col gap-4 hover:border-purple transition-colors group"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-purple">{tr(item.label)}</span>
                <p className="text-navy/70 text-sm leading-relaxed">{tr(item.body)}</p>
                <span className="text-sm font-semibold text-navy group-hover:text-purple transition-colors">
                  {tr({ ar: 'اعرف أكثر ←', en: 'Learn more →' })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F8F8FB] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-12 flex flex-col gap-6">
          {copy.features.map((feat, i) => (
            <div key={feat.hook.en} className={`${feat.bg} rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-8 items-start`}>
              <span className="font-display text-5xl font-bold text-navy/10 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-2xl font-bold text-navy">{tr(feat.hook)}</h3>
                <p className="text-navy/70 text-base leading-relaxed max-w-2xl">{tr(feat.body)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-4">
            {tr(copy.hardwareHeadline)}
          </h2>
          <p className="text-navy/60 text-base text-center max-w-2xl mx-auto mb-12">{tr(copy.hardwareBody)}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.hardware.map((device) => (
              <div key={device.name.en} className="rounded-2xl bg-[#F8F8FB] border border-gray p-8 flex flex-col gap-4">
                <div className="w-full aspect-video rounded-xl bg-navy/5 flex items-center justify-center">
                  <span className="text-navy/20 text-xs font-medium">{tr(device.name)}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-navy">{tr(device.name)}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{tr(device.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-[#F8F8FB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy mb-3">{tr(copy.integrationsLabel)}</h2>
          <p className="text-navy/60 text-base mb-10">{tr(copy.integrationsBody)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {sharedIntegrations.map((name) => (
              <div key={name} className="h-16 px-8 rounded-2xl bg-white border border-gray flex items-center justify-center">
                <span className="text-sm font-semibold text-navy/50">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success story */}
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
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy leading-tight">{tr(copy.successTitle)}</h2>
            <p className="text-navy/70 text-base leading-relaxed">{tr(copy.successBody)}</p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-[#F8F8FB] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy mb-3">{tr(sharedCertificationsLabel)}</h2>
          <p className="text-navy/60 text-base mb-10 max-w-xl mx-auto">{tr(sharedCertificationsBody)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {sharedCertifications.map((cert) => (
              <div key={cert.en} className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border-2 border-navy/10 text-sm font-semibold text-navy">
                <svg className="w-4 h-4 text-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tr(cert)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <SectorLeadForm
        headline={copy.formHeadline}
        cta={copy.formCta}
        source="cashier"
        businessTypeOptions={bizTypeOptions}
      />

      <div className="bg-navy border-t border-white/10 py-6">
        <p className="text-center text-white/30 text-xs">
          © {new Date().getFullYear()} BirdEye · بيردآي. {tr({ ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' })}.
        </p>
      </div>
    </>
  )
}
