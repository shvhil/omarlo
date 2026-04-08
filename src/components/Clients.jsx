import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import styles from './Clients.module.css';

gsap.registerPlugin(ScrollTrigger);

// ✏️ لتغيير شعار عميل معين، بدّل قيمة logo الخاصة به فقط
const clients = [
  { name: 'Client 1',  logo: '/logo/سطام..svg' },
  { name: 'Client 2',  logo: '/logo/سطام..svg' },
  { name: 'Client 3',  logo: '/logo/سطام..svg' },
  { name: 'Client 4',  logo: '/logo/سطام..svg' },
  { name: 'Client 5',  logo: '/logo/سطام..svg' },
  { name: 'Client 6',  logo: '/logo/سطام..svg' },
  { name: 'Client 7',  logo: '/logo/سطام..svg' },
  { name: 'Client 8',  logo: '/logo/سطام..svg' },
  { name: 'Client 9',  logo: '/logo/سطام..svg' },
  { name: 'Client 10', logo: '/logo/سطام..svg' },
  { name: 'Client 11', logo: '/logo/سطام..svg' },
  { name: 'Client 12', logo: '/logo/سطام..svg' },
  { name: 'Client 13', logo: '/logo/سطام..svg' },
  { name: 'Client 14', logo: '/logo/سطام..svg' },
  { name: 'Client 15', logo: '/logo/سطام..svg' },
  { name: 'Client 16', logo: '/logo/سطام..svg' },
  { name: 'Client 17', logo: '/logo/سطام..svg' },
  { name: 'Client 18', logo: '/logo/سطام..svg' },
  { name: 'Client 19', logo: '/logo/سطام..svg' },
  { name: 'Client 20', logo: '/logo/سطام..svg' },
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
          {clients.map((client, i) => (
            <div
              className={styles.logoCell}
              key={i}
              ref={(el) => (cellsRef.current[i] = el)}
            >
              <img
                src={client.logo}
                alt={client.name}
                className={styles.clientLogo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
