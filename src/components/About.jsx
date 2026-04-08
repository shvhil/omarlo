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
  const countersRef = useRef([]);
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

      countersRef.current.forEach((counterNode, i) => {
        if (!counterNode) return;
        const text = counterNode.getAttribute('data-value');
        if (!text) return;
        
        const match = text.match(/(\d+|[\u0660-\u0669]+)/);
        if (!match) return;
        
        const isArabic = /[\u0660-\u0669]/.test(match[0]);
        let targetNum = 0;
        if (isArabic) {
          const engNumString = match[0].replace(/[\u0660-\u0669]/g, c => c.charCodeAt(0) - 0x0660);
          targetNum = parseInt(engNumString, 10);
        } else {
          targetNum = parseInt(match[0], 10);
        }
        
        // Ensure starting value is visually zero before animation
        const initialZero = isArabic ? '٠' : '0';
        counterNode.innerText = text.replace(match[0], initialZero);

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetNum,
          duration: 2,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: cardsRef.current[i], start: 'top 88%' },
          onUpdate: () => {
            let displayNum = Math.floor(obj.val).toString();
            if (isArabic) {
              displayNum = displayNum.replace(/\d/g, c => String.fromCharCode(c.charCodeAt(0) + 0x0660 - 48));
            }
            if (counterNode) {
              counterNode.innerText = text.replace(match[0], displayNum);
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t.about.stats]);

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
              <div 
                className={styles.statValue}
                ref={(el) => (countersRef.current[i] = el)}
                data-value={stat.value}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
