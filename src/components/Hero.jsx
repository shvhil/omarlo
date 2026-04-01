import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LangContext';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
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
        .to(portraitRef.current, { opacity: 1, scale: 1, duration: 1.4 }, '-=0.5')
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
        .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef} id="hero">
      <div className={styles.vignetteTop} />
      <div className={styles.vignetteLeft} />
      <div className={styles.vignetteBottom} />

      <span className={styles.topLabel} ref={topLabelRef}>
        {t.nav.photography}
      </span>

      <img
        src="/omarloo.png"
        alt="Omar Mahmoud — Professional Photographer"
        className={styles.portraitImg}
        ref={portraitRef}
      />

      <div className={styles.nameBlock} ref={nameRef}>
        <p className={styles.nameRole}>{t.hero.role}</p>
        <h1 className={styles.nameFull}>
          {t.hero.name[0]}<br />{t.hero.name[1]}
        </h1>
        <p className={styles.nameYears}>{t.hero.years}</p>
      </div>

      <div className={styles.scrollIndicator} ref={scrollRef}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>{t.scroll}</span>
      </div>
    </section>
  );
}
