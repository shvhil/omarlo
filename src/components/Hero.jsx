import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LangContext';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const topLabelRef = useRef(null);
  const nameRef = useRef(null);
  const scrollRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 2.8,
      });

      tl.to(topLabelRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
        .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef} id="hero">
      <div className={styles.vignetteTop} />



      <span className={styles.topLabel} ref={topLabelRef}>
        {t.nav.photography}
      </span>


      <div className={styles.nameBlock} ref={nameRef}>
        <p className={styles.nameRole}>{t.hero.role}</p>
        <h1 className={styles.nameFull}>
          {t.hero.name[0]}<br />{t.hero.name[1]}
        </h1>
        <p className={styles.nameYears}>{t.hero.years}</p>
      </div>

      <div className={styles.scrollIndicator} ref={scrollRef}>
        <div className={styles.scrollCircle}>
          <svg className={styles.scrollArrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="4" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="7,12 12,17 17,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className={styles.scrollText}>{t.scroll}</span>
      </div>
    </section>
  );
}
