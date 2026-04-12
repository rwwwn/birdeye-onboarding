export type Lang = 'ar' | 'en'

export const t = {
  nav: {
    logo:      { ar: 'بيردآي',   en: 'BirdEye' },
    products:  { ar: 'المنتجات', en: 'Products' },
    pricing:   { ar: 'التسعير',  en: 'Pricing' },
    about:     { ar: 'عن بيردآي', en: 'About' },
    cta:       { ar: 'ابدأ مجاناً', en: 'Start Free Trial' },
    switchLang:{ ar: 'English',   en: 'العربية' },
  },

  hero: {
    pill_new:      { ar: 'جديد',         en: 'New' },
    pill_body:     { ar: 'تطبيق سطح المكتب الجديد متاح الآن', en: 'Introducing our new desktop app' },
    headline:      { ar: 'بيردآي .. الكاشير الذكي', en: 'BirdEye — The Intelligent POS' },
    subheadline:   { ar: 'الجيل الجديد من أنظمة المتاجر مصمّم لزيادة مبيعاتك ورفع تكرار الشراء', en: 'The next generation of retail systems, built to increase your sales and drive repeat purchases.' },
    body:          { ar: 'بيردآي ليس مجرد كاشير، بل منظومة ذكية تمنحك الوضوح الكامل لتدير مبيعاتك، مخزونك، وعملائك من شاشة واحدة.', en: "BirdEye isn't just a POS — it's an intelligent platform that gives you complete clarity to manage your sales, inventory, and customers from one screen." },
    cta_primary:   { ar: 'ابدأ تجربتك المجانية', en: 'Start Free Trial' },
    cta_secondary: { ar: 'تواصل مع فريق المبيعات', en: 'Talk to our sales team' },
    sticky_tagline:{ ar: 'الجيل الجديد من أنظمة المتاجر لزيادة مبيعاتك', en: 'The next generation of retail systems, built to grow your sales.' },
    badge_zatca:   { ar: 'متوافق مع هيئة الزكاة والضريبة', en: 'ZATCA Compliant' },
    badge_saudi:   { ar: 'صُنع في السعودية',  en: 'Saudi-made' },
    badge_nocc:    { ar: 'بدون بطاقة ائتمانية', en: 'No credit card needed' },
  },

  social: {
    trusted: { ar: 'يثق بنا كبار التجار في المملكة', en: 'Trusted by leading Saudi businesses' },
  },

  problem: {
    headline: { ar: 'التشتت يسرق وضوح تجارتك', en: 'Scattered systems steal the clarity of your business.' },
    body:     { ar: 'التاجر اليوم غارق في الفوضى! نظام للكاشير، منصة للمتجر الإلكتروني، إكسل للمخزون، وتطبيق للولاء، وكل واحد في اشتراك مختلف. والنتيجة بيانات ضائعة، رؤية معدومة، وهدر للوقت في محاولة التوفيق بين الأرقام.', en: "Today's merchant is drowning in chaos. One system for POS, another for your online store, Excel for inventory, a separate app for loyalty — each on its own subscription. The result? Lost data, zero visibility, and hours wasted reconciling your numbers." },
    solution: { ar: 'نظام الكاشير الذكي من بيردآي يعيد ترتيب هذه الفوضى! أعدنا هندسة التجارة في منظومة واحدة مركزية، لتدير تجارتك وتجعل تقاريرك كلها تصب في نظام واحد. توقف عن التنقل بين الشاشات والاشتراكات، ركّز في تجارتك، واختار النظام اللي يساعدك على النمو.', en: "BirdEye's intelligent POS re-organizes this chaos. We re-engineered commerce into one centralized platform — manage your business and unify all your reports. Stop jumping between screens and subscriptions. Focus on your business and choose the system that helps you grow." },
    pain1_label: { ar: 'بيانات ضائعة',    en: 'Lost data' },
    pain1_desc:  { ar: 'الأنظمة المنفصلة تعني أن مبيعاتك ومخزونك وبيانات عملائك لا تتحدث مع بعضها.', en: 'Disconnected systems mean your sales, inventory, and customer data never talk to each other.' },
    pain2_label: { ar: 'رؤية معدومة',     en: 'Zero visibility' },
    pain2_desc:  { ar: 'لا يمكنك اتخاذ قرارات صحيحة وتقاريرك موزعة على أربع تطبيقات مختلفة.', en: "You can't make good decisions when your reports live in four different apps." },
    pain3_label: { ar: 'هدر للوقت',       en: 'Wasted hours' },
    pain3_desc:  { ar: 'التسوية اليدوية وإدخال البيانات المكرر يسرقان وقتاً يجب أن تقضيه مع عملائك.', en: 'Manual reconciliation and duplicate entry steal time you should spend on your customers.' },
  },

  bizTypes: {
    headline: { ar: 'نظام ذكي يتشكل حسب طبيعة عملك!', en: 'A smart system that adapts to your business!' },
    retail_title: { ar: 'تجارة التجزئة', en: 'Retail' },
    retail_desc:  { ar: 'إدارة، دقة، ومخزون موحد للمحل والمتجر\nبضاعتك تحت السيطرة، أونلاين وأوفلاين', en: 'Control, precision, and unified inventory for your store and online shop.\nYour stock under control, online and offline.' },
    retail_p1: { ar: 'مزامنة المخزون عبر الفروع', en: 'Inventory sync across branches' },
    retail_p2: { ar: 'كتالوجات المنتجات والتنويعات', en: 'Product catalogs & variants' },
    retail_p3: { ar: 'برامج ولاء العملاء', en: 'Customer loyalty programs' },
    food_title:   { ar: 'المطاعم والمقاهي', en: 'Restaurants & Cafes' },
    food_desc:    { ar: 'سرعة، تنظيم، وربط مباشر مع المطبخ\nنظام يخليك تسبق الجوع وزحمة العملاء', en: 'Speed, organization, and direct kitchen integration.\nA system that keeps you ahead of the rush.' },
    food_p1: { ar: 'إدارة الطاولات والطلبات', en: 'Table & order management' },
    food_p2: { ar: 'شاشة عرض المطبخ', en: 'Kitchen display system' },
    food_p3: { ar: 'تكامل مع خدمات التوصيل', en: 'Delivery integrations' },
    services_title: { ar: 'الخدمات', en: 'Services' },
    services_desc:  { ar: 'اشتراكات، ولاء، وإدارة موظفين في شاشة واحدة\nركز على جودة خدمتك وأنسى هم الإدارة', en: 'Subscriptions, loyalty, and staff management in one screen.\nFocus on your service quality, forget the admin headaches.' },
    services_p1: { ar: 'جدولة المواعيد', en: 'Appointment scheduling' },
    services_p2: { ar: 'إدارة الموظفين والعمولات', en: 'Staff management & commissions' },
    services_p3: { ar: 'العضويات والباقات', en: 'Membership & packages' },
    see_how: { ar: 'شوف كيف يشتغل', en: 'See how it works' },
  },

  promises: {
    headline: { ar: 'ثلاثة وعود.. تبني أساس صلبًا لتجارتك', en: 'Three promises that build a solid foundation for your business.' },
    p1_title: { ar: 'محرك نمو يضاعف دخلك', en: 'A growth engine that multiplies your revenue' },
    p1_desc:  { ar: 'توسع بمتجر إلكتروني متكامل، وانشئ محافظ دفع مسبق لعملائك، وفعل خيارات الدفع الآجل.', en: 'Launch a full online store, create prepaid wallets for your customers, and activate buy-now-pay-later options.' },
    p2_title: { ar: 'ربط فوري بكل سلاسة', en: 'Instant integrations, zero friction' },
    p2_desc:  { ar: 'طور آلية عملك مع بوابات الدفع، شركات الشحن، وحتى أدوات التواصل والتسويق.', en: 'Connect with payment gateways, shipping companies, and marketing tools seamlessly.' },
    p3_title: { ar: 'سهولة استخدام مطلقة', en: 'Effortless by design' },
    p3_desc:  { ar: 'انسَ الأنظمة المعقدة لأن واجهة بيردآي صممت لتكون مألوفة وتقدم تجربة مستخدم سهلة للتاجر والعميل.', en: "Forget complex systems — BirdEye's interface is built to feel familiar and deliver a smooth experience for both the merchant and the customer." },
  },

  hardware: {
    label:    { ar: 'الأجهزة', en: 'Hardware' },
    headline: { ar: 'أجهزة تليق بواجهة تجارتك', en: 'Hardware worthy of your brand.' },
    body:     { ar: 'خيارات كاشير بتصميم أنيق يندمج مع هويتك، لتعطي انطباعًا يترك أثرًا وثبات في الأداء.', en: "Elegant cashier options that blend with your brand identity, leaving a lasting impression with rock-solid performance." },
    video:    { ar: 'فيديو توضيحي — الأجهزة', en: 'Video placeholder — Hardware showcase' },
  },

  platform: {
    headline: { ar: 'نظام يخفي الفوضى وينهي التعقيد', en: 'A system that hides the chaos and ends the complexity.' },
    body:     { ar: 'نحن لا نقدم نظام كاشير، نحن نقدم منظومة تجارة ذكية.', en: "We don't sell a POS — we deliver an intelligent commerce platform." },
    video:    { ar: 'فيديو توضيحي — عرض المنصة', en: 'Video placeholder — Platform demo' },
    video_sub:{ ar: 'من الفوضى إلى الوضوح', en: 'Shows transformation from chaos to clarity' },
  },

  ai: {
    label:    { ar: 'الذكاء الاصطناعي', en: 'AI Assistant' },
    headline: { ar: 'لا تحلل الأرقام، اسأل مساعدك الذكي', en: "Don't analyze the numbers — just ask your AI assistant." },
    video:    { ar: 'فيديو توضيحي — المساعد الذكي', en: 'Video placeholder — AI Assistant' },
    video_sub:{ ar: 'قريباً', en: 'Coming soon' },
  },

  integrations: {
    headline: { ar: 'نظامك مفتوح على العالم', en: 'Your system is open to the world.' },
    body:     { ar: 'نربطك بأفضل الشركاء ليساعدوك على التوسع والنمو.', en: 'We connect you with the best partners to help you expand and grow.' },
  },

  pricing: {
    headline:     { ar: 'اشتراك واحد يغنيك عن تشتت الأنظمة', en: 'One subscription that replaces the chaos of multiple systems.' },
    body:         { ar: 'سعر واضح، شامل التحديثات، وبدون رسوم خفية.', en: 'Clear pricing, updates included, zero hidden fees.' },
    most_popular: { ar: 'الأكثر طلباً', en: 'Most Popular' },
    forever:      { ar: 'مجاناً للأبد', en: 'forever' },
    per_year:     { ar: 'ر.س / سنة', en: 'ر.س / year' },
    starter_name: { ar: 'المبتدئ', en: 'Starter' },
    starter_cta:  { ar: 'ابدأ مجاناً', en: 'Start Free' },
    starter_f1:   { ar: 'المبيعات والخصومات', en: 'Sales & Discounts' },
    starter_f2:   { ar: 'إدارة المخزون', en: 'Inventory Management' },
    starter_f3:   { ar: 'بوابة الدفع NFC', en: 'NFC Payment Gateway' },
    starter_f4:   { ar: 'تقارير يومية بالبريد', en: 'Daily Email Reports' },
    starter_f5:   { ar: 'حتى ٢٠٠٠ منتج', en: 'Up to 2,000 Products' },
    starter_f6:   { ar: 'فروع غير محدودة', en: 'Unlimited Branches' },
    pro_name:     { ar: 'الاحترافي', en: 'Professional' },
    pro_cta:      { ar: 'اشترك الآن', en: 'Go Professional' },
    pro_f1:       { ar: 'كل مزايا المبتدئ', en: 'Everything in Starter' },
    pro_f2:       { ar: 'متجر إلكتروني مخصص', en: 'Custom Online Store' },
    pro_f3:       { ar: 'منتجات غير محدودة', en: 'Unlimited Products' },
    pro_f4:       { ar: 'قوالب منتجات مجانية', en: 'Free Product Templates' },
    pro_f5:       { ar: 'دعم أولوية', en: 'Priority Support' },
    premium_name: { ar: 'المتميز', en: 'Premium' },
    premium_cta:  { ar: 'ابدأ الآن', en: 'Get Started' },
    premium_f1:   { ar: 'كل مزايا الاحترافي', en: 'Everything in Professional' },
    premium_f2:   { ar: 'تحليلات أداء متقدمة', en: 'Advanced Performance Analytics' },
    premium_f3:   { ar: 'لوحة تحكم متعددة الفروع', en: 'Multi-location Dashboard' },
    premium_f4:   { ar: 'مدير حساب مخصص', en: 'Dedicated Account Manager' },
    premium_f5:   { ar: 'تكاملات مخصصة', en: 'Custom Integrations' },
    premium_f6:   { ar: 'وصول مبكر للميزات الجديدة', en: 'Early Access to New Features' },
  },

  finalCta: {
    headline: { ar: 'جاهز تحول تجارتك لتجارة ذكية تنمو باستمرار؟', en: 'Ready to turn your business into one that grows continuously?' },
    body:     { ar: 'انضم للتجار اللي اختاروا الوضوح والسيطرة مع بيردآي، لا تكتفي بالتشغيل، وابدأ التوسع اليوم.', en: "Join the merchants who chose clarity and control with BirdEye. Don't just operate — start expanding today." },
    cta:      { ar: 'ابدأ تجربتك المجانية', en: 'Start Free Trial' },
  },

  footer: {
    tagline:   { ar: 'منصة الكاشير الذكي للتجار السعوديين.', en: 'The smart POS platform for Saudi businesses.' },
    products:  { ar: 'المنتجات', en: 'Products' },
    industries:{ ar: 'القطاعات', en: 'Industries' },
    company:   { ar: 'الشركة', en: 'Company' },
    language:  { ar: 'اللغة', en: 'Language' },
    pos:       { ar: 'نظام الكاشير', en: 'POS System' },
    store:     { ar: 'المتجر الإلكتروني', en: 'Online Store' },
    inventory: { ar: 'المخزون', en: 'Inventory' },
    analytics: { ar: 'التحليلات', en: 'Analytics' },
    payments:  { ar: 'المدفوعات', en: 'Payments' },
    retail:    { ar: 'تجارة التجزئة', en: 'Retail' },
    food:      { ar: 'المطاعم والمقاهي', en: 'Food & Beverage' },
    services:  { ar: 'الخدمات', en: 'Services' },
    healthcare:{ ar: 'الرعاية الصحية', en: 'Healthcare' },
    entertainment:{ ar: 'الترفيه', en: 'Entertainment' },
    about:     { ar: 'عن الشركة', en: 'About Us' },
    careers:   { ar: 'وظائف', en: 'Careers' },
    blog:      { ar: 'المدونة', en: 'Blog' },
    contact:   { ar: 'تواصل معنا', en: 'Contact' },
    partners:  { ar: 'الشركاء', en: 'Partners' },
    rights:    { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
    privacy:   { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
    terms:     { ar: 'شروط الاستخدام', en: 'Terms of Use' },
    cookies:   { ar: 'إعدادات الكوكيز', en: 'Cookie Settings' },
  },
}

export function tr(key: { ar: string; en: string }, lang: Lang): string {
  return key[lang]
}
