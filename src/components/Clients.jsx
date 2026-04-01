import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import styles from './Clients.module.css';

gsap.registerPlugin(ScrollTrigger);

const clientNames = [
  'Nike', 'Adidas', 'Vogue', 'GQ', 'Canon',
  'Sony', 'Leica', 'Cartier', 'Dior', 'Chanel',
  'Prada', 'Armani', 'Zara', 'H&M', 'Gucci',
  'Versace', 'Fendi', 'Bulgari', 'Rolex', 'Omega',
];

export default function Clients() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const cellsRef = useRef([]);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(labelRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      });
      cellsRef.current.forEach((cell, i) => {
        if (!cell) return;
        gsap.to(cell, {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.04,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.clients} ref={sectionRef} id="clients">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionLabel} ref={labelRef}>{t.clients.title}</h2>
        <div className={styles.grid}>
          {clientNames.map((name, i) => (
            <div
              className={styles.logoCell}
              key={i}
              ref={(el) => (cellsRef.current[i] = el)}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
