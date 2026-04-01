import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const footerRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        defaults: { ease: 'power3.out' },
      });

      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(socialsRef.current, { opacity: 1, duration: 0.6 }, '-=0.3')
        .to(footerRef.current, { opacity: 1, duration: 0.5 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section className={styles.contact} ref={sectionRef} id="contact">
      <div className={styles.sectionInner}>
        <h2 className={styles.headline} ref={headlineRef}>
          {t.contact.headline[0]}<br />
          <span className={styles.headlineAccent}>{t.contact.headline[1]}</span>
        </h2>

        <p className={styles.subtext} ref={subtextRef}>{t.contact.subtext}</p>

        <a href="mailto:omarlo.mahmoud2017@gmail.com" className={styles.ctaButton} ref={ctaRef}>
          {t.contact.cta}
          <ArrowRight className={styles.ctaIcon} />
        </a>

        <div className={styles.socials} ref={socialsRef}>
          {t.contact.socials.map((s, i) => (
            <a key={i} href="#" className={styles.socialLink}>{s}</a>
          ))}
        </div>

        <div className={styles.footer} ref={footerRef}>
          <span className={styles.copyright}>{t.contact.copyright}</span>
          <button className={styles.backToTop} onClick={scrollToTop}>
            {t.contact.backToTop}
          </button>
        </div>
      </div>
    </section>
  );
}
