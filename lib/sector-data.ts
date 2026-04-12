import { LeadSource } from './leads'

export interface Bilingual { ar: string; en: string }

export interface SectorBenefit {
  hook: Bilingual
  problem: Bilingual
  solution: Bilingual
}

export interface SectorHardwareItem {
  name: Bilingual
  desc: Bilingual
}

export interface SectorData {
  id: LeadSource
  label: Bilingual
  hero: {
    headline: Bilingual
    body: Bilingual
    cta: Bilingual
    videoLabel: Bilingual
  }
  projectsHeadline: Bilingual
  projects: Bilingual[]
  benefitsHeadline: Bilingual
  benefits: SectorBenefit[]
  hardwareHeadline: Bilingual
  hardware: SectorHardwareItem[]
  successStory: {
    title: Bilingual
    body: Bilingual
  }
  formCta: {
    headline: Bilingual
    cta: Bilingual
  }
  businessTypeOptions: string[]
}

// ─── Shared across all sectors ────────────────────────────────────────────────

export const sharedIntegrations = [
  'تمارا', 'أرامكس', 'مدفوع', 'شورباي', 'تابي', 'هلا', 'نامي', 'يونيفونيك',
]

export const sharedCertifications: Bilingual[] = [
  { ar: 'متوافق مع الفوترة الإلكترونية المرحلة الثانية', en: 'ZATCA Phase 2 e-Invoicing Compliant' },
  { ar: 'المنصة السعودية للأعمال', en: 'Saudi Business Platform' },
  { ar: 'منشآت', en: 'Monshaat' },
  { ar: 'منصة تك', en: 'Tech Platform' },
  { ar: 'تقنية سعودية', en: 'Saudi Technology' },
]

export const sharedClientsLabel: Bilingual = {
  ar: 'عملاء وثقوا بالنظام',
  en: 'Businesses that trust the platform',
}

export const sharedIntegrationsLabel: Bilingual = {
  ar: 'شركاؤنا يسرّعون نموك',
  en: 'Our partners accelerate your growth',
}

export const sharedCertificationsLabel: Bilingual = {
  ar: 'اعتماداتنا الحكومية',
  en: 'Government Certifications',
}

export const sharedCertificationsBody: Bilingual = {
  ar: 'نظام معتمد، محدث، ومتوافق مع أعلى معايير الأمان والأنظمة الحكومية',
  en: 'A certified, up-to-date system compliant with the highest security standards and government regulations',
}

// ─── Retail ───────────────────────────────────────────────────────────────────

export const retailData: SectorData = {
  id: 'retail',
  label: { ar: 'تجارة التجزئة', en: 'Retail' },
  hero: {
    headline: {
      ar: 'تجارة التجزئة تفاصيلها كثيرة..\nسيطر عليها بمنظومة واحدة!',
      en: 'Retail commerce has countless details...\nControl them with one platform!',
    },
    body: {
      ar: 'لا تخلي تعدد الأصناف والفروع يشتت تركيزك عن تجارتك! منظومة بيردآي تقدم لك البنية التحتية التقنية التي تشمل نظام الكاشير والتجارة الإلكترونية وبرنامج الولاء عشان تدير تجارتك في مكان واحد، وتتخذ قراراتك بوضوح بدل التخمين. مع تجربة مستخدم سلسة للتاجر والعميل على حد سواء.',
      en: "Don't let product variety and multiple branches distract you. BirdEye gives you the complete tech infrastructure—POS, e-commerce, and loyalty—to manage your entire business in one place, with crystal-clear decisions instead of guesswork.",
    },
    cta: { ar: 'تواصل مع مختص المبيعات الآن', en: 'Talk to a Sales Specialist Now' },
    videoLabel: { ar: 'فيديو توضيحي — قطاع التجزئة', en: 'Video — Retail sector' },
  },
  projectsHeadline: {
    ar: 'نظام صمم ليخدم تفاصيل مشروعك',
    en: 'A system designed to serve your business details',
  },
  projects: [
    { ar: 'البقالات', en: 'Grocery Stores' },
    { ar: 'الاتصالات', en: 'Telecom Shops' },
    { ar: 'الملابس', en: 'Clothing Stores' },
    { ar: 'العبايات', en: 'Abaya Boutiques' },
    { ar: 'النظارات', en: 'Eyewear Shops' },
    { ar: 'المكملات', en: 'Supplements Stores' },
  ],
  benefitsHeadline: {
    ar: 'ليش نظام بيردآي هو حلك المثالي؟',
    en: 'Why is BirdEye your ideal solution?',
  },
  benefits: [
    {
      hook: { ar: 'محلك ومتجرك.. مخزون واحد، ربح مضاعف.', en: 'Your store and online shop — one inventory, multiplied profits.' },
      problem: { ar: 'تستخدم أكثر من نظام عشان تدير تجارتك؟', en: 'Using multiple systems to manage your business?' },
      solution: { ar: 'مع نظامنا مخزونك في المحل هو نفسه في المتجر الإلكتروني. بيع أونلاين وأوفلاين بدون تعارض في الكميات.', en: 'With our system, your in-store inventory is your online store inventory. Sell online and offline with zero quantity conflicts.' },
    },
    {
      hook: { ar: 'اقفل ثغرات الهدر في مخزونك.', en: 'Seal the gaps that drain your inventory.' },
      problem: { ar: 'تعرف وين يختفي الربح؟', en: 'Do you know where your profit disappears?' },
      solution: { ar: 'انت تخسر مع كل منتج ضايع، نظام بيردآي يضبط لك المخزون بالقطعة (باللون والمقاس) ويمنع الهدر.', en: 'You lose with every missing product. BirdEye tracks inventory down to the unit—by color and size—and prevents waste.' },
    },
    {
      hook: { ar: 'راقب فروعك كلها كأنك واقف عليها.', en: 'Monitor all your branches as if you were standing there.' },
      problem: { ar: 'تدير فرع واحد أو عشرة؟', en: 'Managing one branch or ten?' },
      solution: { ar: 'مع نظام بيردآي تابع أداء كل فروعك من شاشة جوالك لحظة بلحظة.', en: "Track every branch's performance from your phone screen, moment by moment." },
    },
    {
      hook: { ar: 'اعرف عميلك!', en: 'Know your customer!' },
      problem: { ar: 'لا تبيع وتترك العميل يمشي!', en: "Don't sell and let the customer walk away!" },
      solution: { ar: 'ابني قاعدة بيانات لعملائك واعرف مين يشتري وايش يفضل عشان تستهدفه صح ويرجع لك.', en: 'Build a customer database, know who buys what, and target them effectively so they keep coming back.' },
    },
  ],
  hardwareHeadline: { ar: 'أجهزة مختلفة حسب احتياجك', en: 'Devices tailored to your needs' },
  hardware: [
    {
      name: { ar: 'جهاز إكس (X)', en: 'X Device' },
      desc: { ar: 'المحطة المتكاملة بشاشتين. شاشة لك وشاشة لعميلك. مصمم لنقاط البيع ذات الضغط العالي.', en: 'The integrated dual-screen station — one for you, one for your customer. Built for high-traffic sales points.' },
    },
    {
      name: { ar: 'ستاند بيردآي', en: 'BirdEye Stand' },
      desc: { ar: 'يحول جهازك اللوحي لمحطة كاشير احترافية بدون فوضى أسلاك، ويحافظ على أناقة نقطة البيع.', en: 'Turns your tablet into a professional POS station with no cable mess, preserving the elegance of your checkout.' },
    },
  ],
  successStory: {
    title: {
      ar: "كيف تحولت 'نخبة الأصايل' إلى التشغيل الاحترافي من أول يوم؟",
      en: "How 'Nukhbat Al-Asayel' achieved professional operations from day one?",
    },
    body: {
      ar: "محل نخبة الأصايل المتخصص في مستلزمات الفروسية استخدم نظامنا في افتتاحه لإطلاق عروض وتخفيضات جذبت العملاء من اليوم الأول. ومع وجود عملاء من محلات فروسية أخرى، فعّل ميزة محفظة العميل لتنظيم الدفع المقدم والدفع الآجل بسهولة. النتيجة كانت إدارة أوضح للعلاقات التجارية، تدفق نقدي منظم، وتجربة بيع احترافية بدون تعقيد.",
      en: "Nukhbat Al-Asayel, an equestrian supplies specialist, used our system at launch to run promotions that attracted customers from day one. They activated the Customer Wallet feature to manage prepayments and deferred payments effortlessly. The result: clearer business relationships, organized cash flow, and a professional sales experience without complexity.",
    },
  },
  formCta: {
    headline: { ar: 'ابدأ رحلة السيطرة على تجارتك اليوم.', en: 'Start your journey to total business control today.' },
    cta: { ar: 'جرب النظام الآن مجانًا', en: 'Try the System Free Now' },
  },
  businessTypeOptions: ['البقالات', 'الاتصالات', 'الملابس', 'العبايات', 'النظارات', 'المكملات', 'أخرى'],
}

// ─── Services ─────────────────────────────────────────────────────────────────

export const servicesData: SectorData = {
  id: 'services',
  label: { ar: 'الخدمات', en: 'Services' },
  hero: {
    headline: {
      ar: 'وقتك وسمعتك رأس مالك..\nسيطر عليهم بمنظومة واحدة!',
      en: 'Your time and reputation are your capital...\nControl them with one platform!',
    },
    body: {
      ar: 'في قطاع الخدمات، رضا العميل هو المنتج الحقيقي. منظومة بيردآي تضبط لك الاشتراكات، تحسب عمولات الموظفين، وتبني ولاء عملائك، عشان تدير تشغيلك بانضباط عالٍ وتمنع أي تلاعب في الإيرادات.',
      en: "In the services sector, customer satisfaction is the real product. BirdEye manages your subscriptions, calculates employee commissions, and builds customer loyalty—so you run operations with high discipline and prevent any revenue manipulation.",
    },
    cta: { ar: 'تواصل مع مختص المبيعات الآن', en: 'Talk to a Sales Specialist Now' },
    videoLabel: { ar: 'فيديو توضيحي — قطاع الخدمات', en: 'Video — Services sector' },
  },
  projectsHeadline: {
    ar: 'نظام صمم ليضبط إيقاع خدمتك',
    en: 'A system designed to keep your service on beat',
  },
  projects: [
    { ar: 'مغاسل الملابس', en: 'Laundry Services' },
    { ar: 'صالونات التجميل', en: 'Beauty Salons' },
    { ar: 'مغاسل السيارات', en: 'Car Washes' },
    { ar: 'محلات الحلاقة', en: 'Barbershops' },
  ],
  benefitsHeadline: {
    ar: 'ليش نظام بيردآي هو حلك المثالي؟',
    en: 'Why is BirdEye your ideal solution?',
  },
  benefits: [
    {
      hook: { ar: "حوّل العميل من 'عابر' إلى 'دائم'.", en: "Turn customers from 'one-time' to 'loyal'." },
      problem: { ar: 'تخسر فلوسك في الإعلانات لجذب عملاء جدد؟', en: 'Spending money on ads to attract new customers?' },
      solution: { ar: "نظام بيردآي يحفظ بيانات كل عميل ويفعّل 'نقاط الولاء' تلقائيًا، عشان يكون عنده سبب يرجع لك بدل ما يروح للمنافس.", en: "BirdEye saves every customer's data and automatically activates loyalty points—giving them a reason to come back instead of going to a competitor." },
    },
    {
      hook: { ar: 'احمِ إيراداتك من التلاعب.', en: 'Protect your revenue from manipulation.' },
      problem: { ar: 'تعاني من اختلاف نوع الخدمة المسجلة عن المنفذة؟', en: 'Dealing with discrepancies between recorded and performed services?' },
      solution: { ar: "مع نظام بيردآي، 'الفاتورة هي أمر التشغيل'. الموظف ما يقدر ينفذ خدمة إلا إذا تسجلت في النظام، وعمولته تنحسب بناءً عليها بدقة.", en: "With BirdEye, 'the invoice is the work order'. Employees can't perform a service unless it's recorded in the system, and their commission is calculated precisely based on it." },
    },
    {
      hook: { ar: 'تواصل رسمي يبني الثقة.', en: 'Professional communication that builds trust.' },
      problem: { ar: 'الفواتير الورقية تضيع وتعطي انطباعًا قديمًا؟', en: 'Paper invoices getting lost and giving an outdated impression?' },
      solution: { ar: 'فواتيرك توصل لعملائك مباشرة على جوالاتهم في الواتساب. توثيق فوري، واحترافية تعكس جودة شغلك.', en: "Your invoices reach customers directly on their phones via WhatsApp. Instant documentation and professionalism that reflects your work quality." },
    },
    {
      hook: { ar: 'ضبط المواد المستهلكة.', en: 'Control consumable materials.' },
      problem: { ar: 'تعرف كمية المنظفات أو الزيت المستهلكة فعلًا؟', en: 'Do you know the actual quantity of cleaning supplies or oil consumed?' },
      solution: { ar: 'اربط كل خدمة بالمواد المطلوبة لها، واكتشف الهدر قبل ما يأكل أرباحك.', en: 'Link each service to its required materials and discover waste before it eats into your profits.' },
    },
  ],
  hardwareHeadline: { ar: 'أجهزة مختلفة حسب احتياجك', en: 'Devices tailored to your needs' },
  hardware: [
    {
      name: { ar: 'جهاز جو (Go)', en: 'Go Device' },
      desc: { ar: 'كاشيرك المحمول عالي الأداء. خذه معاك بين الطاولات، اضرب الباركود، واطبع الفاتورة من نفس الجهاز في ثواني.', en: 'Your high-performance mobile cashier. Take it between stations, scan barcodes, and print invoices in seconds.' },
    },
    {
      name: { ar: 'ستاند بيردآي (المتحرك)', en: 'BirdEye Stand (Mobile)' },
      desc: { ar: 'يحول جهازك اللوحي لمحطة كاشير احترافية متنقلة، مثالي للمساحات المرنة وأماكن الخدمة المتنقلة.', en: 'Turns your tablet into a professional mobile POS station, ideal for flexible spaces and mobile service environments.' },
    },
  ],
  successStory: {
    title: {
      ar: "كيف تحولت 'نخبة الأصايل' إلى التشغيل الاحترافي من أول يوم؟",
      en: "How 'Nukhbat Al-Asayel' achieved professional operations from day one?",
    },
    body: {
      ar: "محل نخبة الأصايل المتخصص في مستلزمات الفروسية استخدم نظامنا في افتتاحه لإطلاق عروض وتخفيضات جذبت العملاء من اليوم الأول. ومع وجود عملاء من محلات فروسية أخرى، فعّل ميزة محفظة العميل لتنظيم الدفع المقدم والدفع الآجل بسهولة. النتيجة كانت إدارة أوضح للعلاقات التجارية، تدفق نقدي منظم، وتجربة بيع احترافية بدون تعقيد.",
      en: "Nukhbat Al-Asayel, an equestrian supplies specialist, used our system at launch to run promotions that attracted customers from day one. They activated the Customer Wallet feature to manage prepayments and deferred payments effortlessly. The result: clearer business relationships, organized cash flow, and a professional sales experience without complexity.",
    },
  },
  formCta: {
    headline: { ar: 'ابدأ رحلة السيطرة على خدماتك اليوم.', en: 'Start your journey to total service control today.' },
    cta: { ar: 'جرب النظام الآن مجانًا', en: 'Try the System Free Now' },
  },
  businessTypeOptions: ['مغاسل الملابس', 'صالونات التجميل', 'مغاسل السيارات', 'محلات الحلاقة', 'صالات رياضية', 'أخرى'],
}

// ─── Food & Beverage ──────────────────────────────────────────────────────────

export const foodData: SectorData = {
  id: 'food',
  label: { ar: 'المطاعم والمقاهي', en: 'Restaurants & Cafes' },
  hero: {
    headline: {
      ar: 'من الكاشير للمطبخ..\nنظام واحد، وجودة واحدة!',
      en: 'From the cashier to the kitchen...\nOne system, one quality!',
    },
    body: {
      ar: "في المطاعم والمقاهي، الغلطة تكلفتها 'طعم' و'سمعة'. منظومة بيردآي تربط طلبات الكاشير، بطابعات المطبخ، بمقادير المخزون في لحظة واحدة، عشان تضمن سرعة في الخدمة، ودقة في الطلب، وتقليل هدر.",
      en: "In restaurants and cafes, a mistake costs you taste and reputation. BirdEye connects cashier orders, kitchen printers, and inventory quantities in one instant—ensuring service speed, order accuracy, and waste reduction.",
    },
    cta: { ar: 'تواصل مع مختص المبيعات الآن', en: 'Talk to a Sales Specialist Now' },
    videoLabel: { ar: 'فيديو توضيحي — قطاع المطاعم', en: 'Video — Food & Beverage sector' },
  },
  projectsHeadline: {
    ar: 'نظام يخدم قائمة طعامك مهما تنوعت',
    en: 'A system that serves your menu no matter how diverse',
  },
  projects: [
    { ar: 'المطاعم الفاخرة', en: 'Fine Dining' },
    { ar: 'الفود ترك', en: 'Food Trucks' },
    { ar: 'الكافيهات والمحامص', en: 'Cafes & Coffee Roasters' },
    { ar: 'المطابخ السحابية', en: 'Cloud Kitchens' },
    { ar: 'الوجبات السريعة', en: 'Fast Food' },
    { ar: 'المخابز', en: 'Bakeries' },
  ],
  benefitsHeadline: {
    ar: 'ليش نظام بيردآي هو حلك المثالي؟',
    en: 'Why is BirdEye your ideal solution?',
  },
  benefits: [
    {
      hook: { ar: 'احمِ هامش ربحك من داخل المطبخ.', en: 'Protect your profit margin from inside the kitchen.' },
      problem: { ar: 'تعرف تكلفة كل طبق بالهللة؟', en: 'Do you know the cost of every dish down to the halala?' },
      solution: { ar: 'اربط كل وجبة بمكوناتها ووصفتها. النظام يخصم المقادير تلقائيًا مع كل بيعة، ويعطيك تنبيه قبل نفاذ الكمية.', en: 'Link every meal to its ingredients and recipe. The system automatically deducts quantities with every sale and alerts you before stock runs out.' },
    },
    {
      hook: { ar: 'شاشة واحدة لكل تطبيقات التوصيل.', en: 'One screen for all delivery apps.' },
      problem: { ar: 'تضيع الطلبات بين 5 أجهزة وقت الزحمة؟', en: 'Orders getting lost between 5 devices during rush hour?' },
      solution: { ar: 'استقبل كل طلبات تطبيقات التوصيل في شاشة كاشير بيردآي مباشرة. بيع أسرع، وقلل الأخطاء اليدوية.', en: 'Receive all delivery app orders directly on the BirdEye cashier screen. Sell faster and reduce manual errors.' },
    },
    {
      hook: { ar: 'اسكت ضجيج الطلبات، وسرّع الخدمة.', en: 'Silence the order chaos and speed up service.' },
      problem: { ar: 'تذاكر ورقية تضيع وطلبات تتأخر أو تتلخبط؟', en: 'Paper tickets getting lost and orders delayed or mixed up?' },
      solution: { ar: 'حوّل الطلب من الكاشير لطابعة المطبخ في جزء من الثانية. الشيف يعرف ايش يطبخ، والعميل يستلم طلبه الصح في وقته.', en: "Send orders from cashier to kitchen printer in a fraction of a second. The chef knows what to cook, and the customer gets the right order on time." },
    },
    {
      hook: { ar: 'إدارة طاولاتك باحترافية.', en: 'Manage your tables professionally.' },
      problem: { ar: 'زحمة في الصالة وتعارض في الحجوزات؟', en: 'Crowded dining area and conflicting reservations?' },
      solution: { ar: 'نظّم الطاولات والأقسام، وتابع حالة كل طاولة (محجوزة، انتظار، تنظيف) لضمان تجربة مريحة لعميلك من دخوله لخروجه.', en: 'Organize tables and sections, track each table status (reserved, waiting, cleaning) to ensure a comfortable experience from entry to exit.' },
    },
  ],
  hardwareHeadline: { ar: 'أجهزة مختلفة حسب احتياجك', en: 'Devices tailored to your needs' },
  hardware: [
    {
      name: { ar: 'جهاز إكس (X)', en: 'X Device' },
      desc: { ar: 'المحطة المتكاملة بشاشتين لمواجهة أوقات الذروة في المطاعم بكفاءة عالية.', en: 'The integrated dual-screen station built for restaurant peak hours.' },
    },
    {
      name: { ar: 'ستاند بيردآي (المتحرك)', en: 'BirdEye Stand (Mobile)' },
      desc: { ar: 'نقطة بيع متنقلة تعمل في الصالة وعند الطاولات بسلاسة تامة.', en: 'A mobile POS that works smoothly in the dining area and at tables.' },
    },
    {
      name: { ar: 'شاشات المطبخ (KDS)', en: 'Kitchen Display Screens (KDS)' },
      desc: { ar: 'تعرض الطلبات للمطبخ لحظيًا وبدون تذاكر ورقية. الطلب الصح في الوقت الصح.', en: 'Display orders to the kitchen instantly, without paper tickets. The right order at the right time.' },
    },
  ],
  successStory: {
    title: {
      ar: "كيف رفعت 'دايموند دروبز' معيار الاحترافية والولاء؟",
      en: "How 'Diamond Drops' raised the standard of professionalism and loyalty?",
    },
    body: {
      ar: "مغسلة 'دايموند دروبز' المتنقلة كانت تبحث عن طريقة تضمن عودة العميل وتلغي الفوضى الورقية. باستخدام منظومة بيردآي، تخلصوا تمامًا من الفواتير التقليدية واستبدلوها بالفواتير الإلكترونية عبر الواتساب، مما أعطى انطباعًا عاليًا بالموثوقية لدى العملاء. ولضمان التكرار، فعّلوا نظام 'نقاط الولاء'، بحيث كل غسلة تقرب العميل من خدمة مجانية، مما رفع معدل عودة العملاء بشكل ملحوظ. النتيجة قاعدة عملاء ثابتة، تشغيل رقمي بالكامل، وسمعة تنمو في السوق.",
      en: "'Diamond Drops' mobile car wash was looking for a way to ensure customer return and eliminate paper chaos. Using BirdEye, they replaced traditional invoices with WhatsApp e-invoices, giving customers a strong impression of reliability. They activated the loyalty points system—every wash brings the customer closer to a free service—which significantly increased return rates. The result: a stable customer base, fully digital operations, and a growing market reputation.",
    },
  },
  formCta: {
    headline: { ar: 'حوّل قائمة طعامك إلى منظومة مربحة اليوم.', en: 'Turn your menu into a profitable system today.' },
    cta: { ar: 'جرب النظام الآن مجانًا', en: 'Try the System Free Now' },
  },
  businessTypeOptions: ['مطعم فاخر', 'فود ترك', 'كافيه أو محمصة', 'مطبخ سحابي', 'وجبات سريعة', 'مخبز', 'أخرى'],
}
