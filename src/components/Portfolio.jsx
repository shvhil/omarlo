import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { image: '/works/anita-austvika-PU5SFvydHlk-unsplash.jpg', size: 'tall' },
  { image: '/works/ingmar-bpJUsjxnxsQ-unsplash.jpg',         size: 'normal' },
  { image: '/works/joshua-kettle-mZx3VVHiuvo-unsplash.jpg',  size: 'normal' },
  { image: '/works/kent-chin-flK8wcH1FeU-unsplash.jpg',      size: 'wide' },
  { image: '/works/shana-van-roosbroek-gdPqNWGfqW4-unsplash.jpg', size: 'normal' },
  { image: '/works/tegan-conway-loCow_3_DQI-unsplash.jpg',   size: 'tall' },
  { image: '/works/vitalii-onyshchuk-YLZg5hE8wtA-unsplash.jpg', size: 'normal' },
  { image: '/works/vitaliy-shevchenko-IYFdZLC1gv0-unsplash.jpg', size: 'normal' },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const subRef = useRef(null);
  const cardsRef = useRef([]);
  const { t } = useLang();

  const projects = images.map((img, i) => ({
    ...img,
    ...t.portfolio.projects[i],
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(labelRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      });
      gsap.to(subRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: subRef.current, start: 'top 85%' },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.portfolio} ref={sectionRef} id="work">
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionLabel} ref={labelRef}>{t.portfolio.title}</h2>
          <p className={styles.sectionSub} ref={subRef}>{t.portfolio.subtitle}</p>
        </div>

        <div className={styles.masonryGrid}>
          {projects.map((project, i) => (
            <div
              className={`${styles.card} ${styles[project.size]}`}
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <img
                src={project.image}
                alt={project.title}
                className={styles.cardImage}
                loading="lazy"
              />
              <div className={styles.cardOverlay}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>{project.category}</span>
                  <span className={styles.cardTitle}>{project.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
