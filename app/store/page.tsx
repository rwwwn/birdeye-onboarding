'use client'

import Navbar from '@/components/home/Navbar'
import SectorLeadForm from '@/components/sector/SectorLeadForm'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  hero: {
    headline: { ar: "متجرك الإلكتروني.. مو مجرد 'موقع'\nهو فرعك الرقمي اللي يشتغل 24 ساعة!", en: "Your online store — not just a 'website'\nIt's your digital branch that works 24/7!" },
    body:     { ar: 'حوّل مخزون محلك إلى متجر إلكتروني متكامل بضغطة زر. استقبل الطلبات وأنت نايم، وتخلص من عمولات تطبيقات التوصيل، وخل نظام بيردآي يدير المخزون والطلبات والشحن من شاشة واحدة.', en: "Turn your store's inventory into a full e-commerce store with one click. Receive orders while you sleep, eliminate delivery app commissions, and let BirdEye manage inventory, orders, and shipping from one screen." },
    cta:      { ar: 'أطلق متجرك مجاناً الآن', en: 'Launch Your Store Free Now' },
  },
  features: [
    {
      headline: { ar: 'مخزون واحد.. يتصرف في جهتين!', en: 'One inventory — operating in two directions!' },
      hook:     { ar: "أكبر كابوس للتاجر؟ عميل يطلب أونلاين، والقطعة مبيوعة في المحل قبل دقيقة!", en: "The merchant's biggest nightmare? A customer orders online, and the item was sold in-store a minute ago!" },
      body:     { ar: 'مع نظام كاشير بيردآي الذكي، المخزون مشترك بالثواني. انباعت القطعة في الكاشير؟ تختفي من الموقع فورًا. عدلت السعر في النظام؟ يتحدث في جوال العميل بنفس الثانية. انسَ "اعتذارات نفاذ الكمية"، وسيطر على مخزونك بدقة 100%.', en: "With BirdEye's smart cashier, inventory is shared in seconds. Item sold at the cashier? It disappears from the website instantly. Price updated in the system? It updates on the customer's phone at the same second. Forget 'out of stock apologies' and control your inventory with 100% accuracy." },
      bg: 'bg-yellow',
    },
    {
      headline: { ar: "صمم متجرك بهويتك.. وبدون 'جيش' مبرمجين", en: "Design your store your way — without an army of developers" },
      hook:     { ar: 'معنا ما تحتاج تكون خبير تقني عشان تبيع أونلاين.', en: "With us, you don't need to be a tech expert to sell online." },
      body:     { ar: 'قوالب جاهزة للبيع مصممة لرفع معدل الشراء، تحكم كامل في الألوان والبنرات وترتيب الرفوف الرقمية بضغطة زر، ودومين مخصص يعزز ثقة عملائك.', en: "Ready-to-sell templates designed to increase purchase rates, full control over colors, banners, and digital shelf arrangement with one click, and a custom domain that strengthens customer trust." },
      bg: 'bg-teal',
    },
    {
      headline: { ar: "من 'طلب إلكتروني جديد' إلى 'تم الشحن'.. بضغطة زر!", en: "From 'new online order' to 'shipped' — with one click!" },
      hook:     { ar: 'لا تشتت موظفينك بين شاشات شركات الشحن وتطبيقات التوصيل.', en: "Don't scatter your employees between shipping company screens and delivery apps." },
      body:     { ar: 'طلبات الأونلاين تظهر في شاشة الكاشير فورًا مع رنة تنبيه. اطبع بوليصة الشحن (أرامكس، سبل، سمسا) بضغطة زر من نفس النظام. أو خل عميلك يختار "توصيل للبيت" أو "استلام من الفرع" عشان توفر قيمة التوصيل وتزيد زيارات المحل.', en: "Online orders appear on the cashier screen instantly with an alert tone. Print shipping labels (Aramex, SPL, SMSA) with one click from the same system. Or let customers choose 'home delivery' or 'branch pickup' to save delivery costs and increase store visits." },
      bg: 'bg-[#EEEDFE]',
    },
    {
      headline: { ar: "لا تبيع لعميل 'مجهول'.. وامتلك بيانات زبائنك!", en: "Don't sell to an 'unknown' customer — own your customer data!" },
      hook:     { ar: 'تطبيقات التوصيل تخفي عنك بيانات العميل.. نظامنا يعطيك الكنز.', en: "Delivery apps hide customer data from you — our system gives you the treasure." },
      body:     { ar: "اعرف مين اشترى وايش يحب، واستهدفه بعروض خاصة. العميل عبى السلة وطلع؟ النظام يرسل له تذكير تلقائي يرجعه يكمل الدفع. اصنع عروض حصرية للأونلاين أو أكواد خصم للمشاهير وراقب تأثيرها بالأرقام.", en: "Know who bought and what they like, and target them with special offers. Customer filled the cart and left? The system sends an automatic reminder to bring them back to complete payment. Create exclusive online offers or influencer discount codes and monitor their impact with numbers." },
      bg: 'bg-white',
    },
    {
      headline: { ar: 'بوابات دفع جاهزة.. والكاش بحسابك', en: 'Payment gateways ready — cash in your account' },
      hook:     { ar: 'فعّلنا لك كل طرق الدفع اللي يحبها العميل السعودي، عشان ما يتردد لحظة!', en: "We've activated all payment methods Saudi customers love, so they never hesitate for a moment!" },
      body:     { ar: 'مدى، فيزا، أبل باي، تمارا، تابي. بدون عقود ورقية معقدة، تفعيل فوري وبدء استقبال الأموال.', en: 'Mada, Visa, Apple Pay, Tamara, Tabby. No complex paper contracts, instant activation and start receiving money.' },
      bg: 'bg-[#F8F8FB]',
    },
  ],
  successTitle: { ar: 'كيف تمكن أحد عملائنا من التوسع وخدمة كامل المملكة خلال أيام؟', en: 'How one of our clients expanded to serve the entire Kingdom within days?' },
  successBody:  { ar: '(قصة عميل قيد التحضير مع قسم التمكين)', en: '(Customer story coming soon from the empowerment team)' },
  formHeadline: { ar: "تجارتك كبرت على 'المحل الواحد'.. توسع اليوم!", en: "Your business has outgrown 'one store' — expand today!" },
  formCta:      { ar: 'ابدأ تجربتك المجانية!', en: 'Start Your Free Trial!' },
}

const bizTypeOptions = ['تجزئة', 'مطعم أو مقهى', 'خدمات', 'أخرى']

export default function StorePage() {
  const { tr } = useLanguage()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-12 flex flex-col items-center text-center gap-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold text-navy bg-yellow">
            {tr({ ar: 'المتجر الإلكتروني', en: 'Online Store' })}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl whitespace-pre-line">
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

      {/* Features */}
      <div>
        {copy.features.map((feat, i) => (
          <section key={feat.headline.en} className={`${feat.bg} py-20 md:py-24`}>
            <div className="max-w-7xl mx-auto px-12">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                {/* Copy */}
                <div className="flex flex-col gap-5">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight">
                    {tr(feat.headline)}
                  </h2>
                  <p className="text-purple font-semibold text-base">{tr(feat.hook)}</p>
                  <p className="text-navy/70 text-base leading-relaxed">{tr(feat.body)}</p>
                </div>
                {/* Visual placeholder */}
                <div className="rounded-3xl bg-navy/5 aspect-[4/3] flex items-center justify-center">
                  <span className="text-navy/20 text-sm font-medium">{tr({ ar: 'صورة توضيحية', en: 'Feature illustration' })}</span>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

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
            <p className="text-navy/50 text-base leading-relaxed italic">{tr(copy.successBody)}</p>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <SectorLeadForm
        headline={copy.formHeadline}
        cta={copy.formCta}
        source="store"
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
