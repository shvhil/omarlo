import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LangContext';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const lettersRef = useRef([]);
  const [count, setCount] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    tl.to(lettersRef.current.filter(Boolean), {
      y: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.3,
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.val)),
    }, '-=0.3');

    tl.to(lettersRef.current.filter(Boolean), {
      y: -60,
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power3.in',
    }, '-=0.3');

    return () => tl.kill();
  }, [onComplete]);

  const text = t.preloader;

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <div className={styles.logo}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            style={{ display: 'inline-block', transform: 'translateY(100%)' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className={styles.progress}>{count}%</div>
    </div>
  );
}
