import type { FC } from 'react';
import styles from './Footer.module.scss';
import { MenuLink } from '../ui/MenuLink';
import { Logo } from '../ui/Logo';
import { useLocation } from 'react-router-dom';


export const Footer: FC = () =>{
const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  return (
  <footer className={styles.footer}>
    <div className={styles.logoSection}>
      <Logo/>
      <span className={styles.copyright}>Простота, которая вдохновляет</span>
    </div>

    <div className={styles.linkSection}>
      <ul className={`${styles.linkList} ${styles.styledLinkList}`}>
        <li>
          <MenuLink label="О проекте" href="/about" />
        </li>
        <li>
          <MenuLink label="Каталог" href="/" />
        </li>
      </ul>

      <ul className={styles.linkList}>
        <li>
          <MenuLink label="Контакты" href="/about#contacts" />
        </li>
        <li>
          <MenuLink label="Блог" href="/about#blog" />
        </li>
      </ul>

      <ul className={styles.linkList}>
        <li>
          <MenuLink label="Политика конфиденциальности" href="/about#privacy" />
        </li>
        <li>
          <MenuLink label="Пользовательское соглашение" href="/about#agreement" />
        </li>
      </ul>
    </div>
  </footer>
  );
};
  