import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

import CartSvg from "@/assets/icons/cart.svg";

import styles from "./CartIcon.module.scss";

export const CartIcon: FC = () => {
  const navigate = useNavigate();

  const { totalCount } = useCart();

  return (
    <div
      className={styles.wrapper}
      onClick={() => navigate("/cart")}
    >
      <img src={CartSvg} alt="Корзина" className={styles.icon} />

      {totalCount > 0 && (
        <span className={styles.badge}>
          {totalCount}
        </span>
      )}
    </div>
  );
};
