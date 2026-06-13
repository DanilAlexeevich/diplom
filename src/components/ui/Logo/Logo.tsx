import React from 'react';
import styles from './Logo.module.scss';
import logo from '@/assets/icons/logo/logo.svg';

export const Logo: React.FC = () => (
  <a href="/" className={styles.logoLink} aria-label="Логотип MebelHouse">
    <img src={logo} alt="MebelHouse" className={styles.logoIcon} />
    <span className={styles.logoText}>MebelHouse</span>
  </a>
);
