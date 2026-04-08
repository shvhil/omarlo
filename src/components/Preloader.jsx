import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LangContext';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const bgRef = useRef(null);
  const lettersRef = useRef([]);
  const textWrapRef = useRef(null);
  const logoWrapRef = useRef(null);
  const clipRectsRef = useRef([]);
  const [count, setCount] = useState(0);
  const { t } = useLang();
  const counterRef = useRef({ val: 0 });

  useEffect(() => {
    // Initial states: scale clips to 0, anchored to the right (100% 50%)
    gsap.set(clipRectsRef.current, { scaleX: 0, transformOrigin: '100% 50%' });
    gsap.set(logoWrapRef.current, { xPercent: -50, yPercent: -50, y: 25 });

    const tl = gsap.timeline();

    // Counter animation
    gsap.to(counterRef.current, {
      val: 100,
      duration: 2.2, // slightly less than total preloader duration to feel "fast"
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(counterRef.current.val));
      },
    });

    // 1. Letters animate in individually
    tl.to(lettersRef.current.filter(Boolean), {
      y: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.2,
    });

    // 2. Wrap moves down deeply to make more space!
    tl.to(textWrapRef.current, {
      y: 110,
      scale: 0.85,
      opacity: 0.6,
      duration: 0.85,
      ease: 'power3.inOut',
    }, '+=0.2');

    // 3. Float the logo wrapper up into place
    tl.to(logoWrapRef.current, {
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '<0.1');

    // 4. Logo paths swipe from right to left (bottom path to top path)
    tl.to([clipRectsRef.current[2], clipRectsRef.current[1], clipRectsRef.current[0]], {
      scaleX: 1,
      duration: 0.9,
      stagger: 0.25,
      ease: 'power3.inOut',
    }, '<0.1');

    // Hold briefly so user sees the solid logo before moving
    tl.add(() => { }, "+=0.6");

    // 5. Morph sequence! Moves logo to its new home and unmounts preloader properly
    const endTl = gsap.timeline({
      onComplete: () => onComplete()
    });

    // Fade out letters
    endTl.to(textWrapRef.current, {
      y: '+=30',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, 0);

    // Slide up ONLY the dark background, leaving the logo unclipped
    endTl.to(bgRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
    }, 0.1);

    // Coordinate the logo sliding to EXACTLY match App.jsx's .site-logo
    const isRtl = document.documentElement.dir === 'rtl';
    const targetLeft = isRtl ? window.innerWidth - 132 : 32;

    endTl.to(logoWrapRef.current, {
      top: '24px',
      left: `${targetLeft}px`,
      xPercent: 0,
      yPercent: 0,
      y: 0,
      x: 0,
      width: '72px',
      duration: 1.2,
      ease: 'power4.inOut',
    }, 0.1);

    tl.add(endTl);

    return () => tl.kill();
  }, [onComplete]);

  const text = t.preloader;

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <div className={styles.bg} ref={bgRef}></div>
      <div className={styles.animationArea}>
        {/* Text */}
        <div className={styles.textWrap} ref={textWrapRef}>
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
      </div>

      {/* Counter */}
      <div className={styles.counterWrap}>
        <div className={styles.counterValue}>
          {count}
          <span className={styles.percentSign}>%</span>
        </div>
        <div className={styles.loadingBar}>
          <div 
            className={styles.loadingProgress} 
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Animated SVG Logo */}
      <div className={styles.logoWrap} ref={logoWrapRef}>
        <svg className={styles.logoSvg} viewBox="0 0 1920 1080">
          <defs>
            <clipPath id="clipPathTop">
              <rect ref={(el) => clipRectsRef.current[0] = el} x="0" y="0" width="1920" height="1080" />
            </clipPath>
            <clipPath id="clipPathMiddle">
              <rect ref={(el) => clipRectsRef.current[1] = el} x="0" y="0" width="1920" height="1080" />
            </clipPath>
            <clipPath id="clipPathBottom">
              <rect ref={(el) => clipRectsRef.current[2] = el} x="0" y="0" width="1920" height="1080" />
            </clipPath>
          </defs>
          <g>
            <polygon clipPath="url(#clipPathTop)" fill="currentColor" points="1144.1,339.6 66.2,543.8 55.4,637.8 1133.3,433.7" />
            <path clipPath="url(#clipPathMiddle)" fill="currentColor" d="M1497.6,437.5l9.8-59.8l-158.2-39.1c-43.1-10.7-86.1,17.7-93.3,61.5l-11.1,67.8L269.6,652.6l-13.5,94.6 l1230.6-233.1L1497.6,437.5z" />
            <polygon clipPath="url(#clipPathBottom)" fill="currentColor" points="1815.1,415.1 1830.6,320.1 1678.2,349 1589.3,365.8 1558.3,555.8 454.5,764.9 443.2,859 1542.8,650.7 1631.6,633.9 1788.4,604.2 1799.6,510.1 1647.1,539 1662.6,444" />
          </g>
        </svg>
      </div>
    </div>
  );
}
