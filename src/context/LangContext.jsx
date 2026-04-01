import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    dir: 'ltr',
    lang: 'en',
    nav: {
      photography: 'Photography',
    },
    hero: {
      role: 'Photographer',
      name: ['Omar', 'Mahmoud'],
      years: '14 Years of Excellence',
    },
    about: {
      title: 'About Me',
      bio: "I am Omar Mahmoud, a professional photographer dedicated to capturing moments with precision and artistic flair. With a sharp eye for detail and a passion for visual storytelling, I specialize in creating high-quality imagery that speaks for itself. Whether it's corporate branding, events, or creative projects, my goal is to deliver stunning visuals that leave a lasting impression.",
      stats: [
        { label: 'Years of Experience', value: '14+' },
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '120+' },
      ],
    },
    portfolio: {
      title: 'Selected Works',
      subtitle: 'A curated collection across portrait, editorial, landscape & commercial',
      projects: [
        { title: 'Golden Veil', category: 'Portrait' },
        { title: 'Urban Shadows', category: 'Street' },
        { title: 'Still Waters', category: 'Landscape' },
        { title: 'Natural Light', category: 'Editorial' },
        { title: 'Soft Focus', category: 'Fashion' },
        { title: 'Raw Light', category: 'Portrait' },
        { title: 'Quiet Hours', category: 'Lifestyle' },
        { title: 'Cinematic', category: 'Commercial' },
      ],
    },
    clients: {
      title: 'Our Clients',
    },
    contact: {
      headline: ["heloo", 'Something '],
      subtext: "Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.",
      cta: 'Get In Touch',
      socials: ['Instagram', 'Behance', 'LinkedIn', 'Twitter'],
      copyright: `© ${new Date().getFullYear()} Omar Mahmoud. All rights reserved.`,
      backToTop: 'Back to Top ↑',
    },
    preloader: 'OMAR MAHMOUD',
    scroll: 'Scroll',
  },
  ar: {
    dir: 'rtl',
    lang: 'ar',
    nav: {
      photography: 'التصوير',
    },
    hero: {
      role: 'مصوّر محترف',
      name: ['عمر', 'محمود'],
      years: '١٤ عاماً من التميّز',
    },
    about: {
      title: 'نبذة عني',
      bio: 'أنا عمر محمود، مصوّر محترف متخصص في تجميد اللحظات بدقة متناهية وحسٍّ فني راقٍ. بعين ثاقبة وشغف حقيقي بالسرد البصري، أبدع صوراً استثنائية تتحدث عن نفسها في مجالات الهوية التجارية، والفعاليات، والمشاريع الإبداعية — هدفي دائماً أن أترك بصمة لا تُنسى.',
      stats: [
        { label: 'سنوات الخبرة', value: '+١٤' },
        { label: 'مشروع منجز', value: '+٥٠٠' },
        { label: 'عميل راضٍ', value: '+١٢٠' },
      ],
    },
    portfolio: {
      title: 'أعمال مختارة',
      subtitle: 'مجموعة منتقاة من البورتريه والأزياء والطبيعة والإعلان',
      projects: [
        { title: 'الحجاب الذهبي', category: 'بورتريه' },
        { title: 'ظلال المدينة', category: 'شوارع' },
        { title: 'مياه راكدة', category: 'طبيعة' },
        { title: 'الضوء الطبيعي', category: 'إديتوريال' },
        { title: 'تركيز ناعم', category: 'أزياء' },
        { title: 'ضوء خام', category: 'بورتريه' },
        { title: 'ساعات هادئة', category: 'لايف ستايل' },
        { title: 'سينمائي', category: 'إعلاني' },
      ],
    },
    clients: {
      title: 'عملاؤنا',
    },
    contact: {
      headline: ['لنصنع معاً', 'شيئاً جميلاً'],
      subtext: 'هل لديك مشروع في ذهنك؟ يسعدني الاستماع إليك. دعنا نناقش كيف نحوّل رؤيتك إلى واقع.',
      cta: 'تواصل معي',
      socials: ['إنستغرام', 'بيهانس', 'لينكد إن', 'تويتر'],
      copyright: `© ${new Date().getFullYear()} عمر محمود. جميع الحقوق محفوظة.`,
      backToTop: 'العودة للأعلى ↑',
    },
    preloader: 'عمر محمود',
    scroll: 'مرر',
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggle = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));

  const t = translations[lang];

  // Apply dir + lang to <html> element whenever lang changes
  useEffect(() => {
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
  }, [lang, t]);

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
