import { useLang } from '../context/LangContext';
import styles from './LangToggle.module.css';

export default function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label="Toggle language"
      id="lang-toggle"
    >
      <span className={`${styles.option} ${lang === 'en' ? styles.active : ''}`}>EN</span>
      <span className={styles.divider}>|</span>
      <span className={`${styles.option} ${lang === 'ar' ? styles.active : ''}`}>عربي</span>
    </button>
  );
}
