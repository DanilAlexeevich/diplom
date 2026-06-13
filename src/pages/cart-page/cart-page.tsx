import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import type { RootState } from "@/services/store";

import styles from "./cart-page.module.scss";
import { Button } from "@/components/ui";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

export const CartPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
      }));
    }
  }, [user]);

  const isFormValid =
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== "" &&
    cartItems.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    const fire = (particleRatio: number, opts = {}) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    toast.success("Заказ успешно оформлен! Менеджер скоро свяжется с вами.", {
      duration: 5000,
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.leftColumn}>
        <h1 className={styles.title}>Корзина</h1>

        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.image}
                />

                <div className={styles.info}>
                  <h3>{item.name}</h3>

                  <p>{item.price.toLocaleString("ru-RU")} ₽</p>

                  <div className={styles.controls}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button
                    className={styles.remove}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.rightColumn}>
        {!isAuthenticated ? (
          <div className={styles.authBlock}>
            <h2>Войдите для оформления заказа</h2>

            <Button
              variant="primary"
              onClick={() =>
                navigate("/register", {
                  state: {
                    from: "/cart",
                  },
                })
              }
            >
              Войти
            </Button>
          </div>
        ) : (
          <>
            <h2>Оформление заказа</h2>

            <form className={styles.form}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                type="phone"
                name="phone"
                placeholder="Номер телефона"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Адрес"
                value={formData.address}
                onChange={handleChange}
              />
            </form>

            <div className={styles.total}>
              Итого:
              <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
            </div>

            <button
              className={styles.orderButton}
              disabled={!isFormValid}
              onClick={handleOrder}
            >
              Заказать
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage;
