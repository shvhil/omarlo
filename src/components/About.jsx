import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const bioRef = useRef(null);
  const cardsRef = useRef([]);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(labelRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      });
      gsap.to(bioRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: bioRef.current, start: 'top 85%' },
        delay: 0.15,
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.about} ref={sectionRef} id="about">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionLabel} ref={labelRef}>{t.about.title}</h2>
        <p className={styles.bio} ref={bioRef}>{t.about.bio}</p>

        <div className={styles.statsGrid}>
          {t.about.stats.map((stat, i) => (
            <div
              className={styles.statCard}
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
