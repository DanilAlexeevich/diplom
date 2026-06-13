import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import { CategoryDropdown } from "../CategoryDropdown";
import { Avatar, Button, Logo } from "@/components/ui";
import { CartIcon } from "@/components/CartIcon/CartIcon";
import { SearchInput } from "../SearchInput";

import CrossIcon from "@/assets/icons/cross.svg";
import styles from "./Header.module.scss";

export interface HeaderProps {
  isLogin: boolean;
  user?: {
    name: string;
    avatar: string;
  };
}

export const Header: FC<HeaderProps> = ({ isLogin, user }) => {
  const navigate = useNavigate();

  const handleClickLogin = () => navigate("/login");
  const handleClickRegister = () => navigate("/register");
  const handleClickProfile = () => navigate("/profile");
  const handleBackSpace = () => navigate(-1);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const isCartPage = 
    location.pathname === "/cart"
  
  if (isAuthPage) {
    return (
      <header className={`${styles.header} ${styles.headerLogin}`}>
        <div className={styles.right}>
          <Button variant="tertiary" onClick={handleBackSpace} className={styles.mobileArrowBtn}>
            <span className={styles.desktopText}>
              Закрыть
              <img src={CrossIcon} alt="" className={styles.icon} />
            </span>

            <span className={styles.mobileArrow}>←</span>
          </Button>
        </div>
      </header>
    );
  }

  if (isCartPage) {
    return (
      <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <nav>
          <ul className={styles.navigation}>
            <li className={styles.navigationList}>
              <a className={styles.link}>О проекте</a>
            </li>
            <li className={styles.navigationList}>
              <CategoryDropdown />
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.right}>
        <div className={styles.cartArea}>
          <CartIcon />
        </div>
        <div className={styles.authArea}>
          {isLogin && user ? (
            <div
              onClick={handleClickProfile}
              className={styles.profileContainer}
            >
              <a className={styles.link}>{user.name}</a>
              <Avatar src={user.avatar} name={user.name} size="sm" />
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <Button variant="outlined" onClick={handleClickLogin}>
                Войти
              </Button>
              <Button onClick={handleClickRegister}>Зарегистрироваться</Button>
            </div>
          )}
        </div>
      </div>
    </header>
    )
  }
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <nav>
          <ul className={styles.navigation}>
            <li className={styles.navigationList}>
              <a className={styles.link}>О проекте</a>
            </li>
            <li className={styles.navigationList}>
              <CategoryDropdown />
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.center}>
        <SearchInput className={styles.searchInput} />
      </div>

      <div className={styles.right}>
        <div className={styles.cartArea}>
          <CartIcon />
        </div>
        <div className={styles.authArea}>
          {isLogin && user ? (
            <div
              onClick={handleClickProfile}
              className={styles.profileContainer}
            >
              <a className={styles.link}>{user.name}</a>
              <Avatar src={user.avatar} name={user.name} size="sm" />
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <Button variant="outlined" onClick={handleClickLogin}>
                Войти
              </Button>
              <Button onClick={handleClickRegister}>Зарегистрироваться</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
