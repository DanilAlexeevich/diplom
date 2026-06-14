import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/services/store";
import { login } from "@/services/slices/AuthSlice";
import { setToken, setStoredUser } from "@/utils/auth";

import { useLocation } from "react-router-dom";

import authStyles from "@/assets/styles/auth.module.scss";
import styles from "./register-page.module.scss";

import appleIcon from "@/assets/icons/logo/apple.svg";
import googleIcon from "@/assets/icons/logo/google.svg";

import {
  Button,
  InputBaseContainerUI,
  InputUI,
} from "@/components/ui";

type FormValues = {
  email: string;
  password: string;
};

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field: FieldName, value: string): string | undefined => {
  if (field === "email") {
    if (!value.trim()) return "Введите email";
    if (!EMAIL_PATTERN.test(value.trim())) return "Некорректный email";
    return undefined;
  }
  if (!value) return "Введите пароль";
  if (value.length < 6) return "Пароль должен содержать не менее 6 знаков";
  return undefined;
};

export default function RegisterPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [authError, setAuthError] = useState("");

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleInputChange =
    (field: FieldName) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
      setAuthError("");
      setErrors((prev) => {
        const next = { ...prev };
        const error = validateField(field, value);
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    };

  const handleBlur =
    (field: FieldName) => (e: FocusEvent<HTMLInputElement>) => {
      const error = validateField(field, e.target.value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");

    const nextErrors: FormErrors = {};
    (Object.keys(formValues) as FieldName[]).forEach((field) => {
      const error = validateField(field, formValues[field]);
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Проверяем нет ли уже такого email
    const raw = localStorage.getItem("registered_users");
    const registeredUsers = raw ? JSON.parse(raw) : [];
    const normalizedEmail = formValues.email.trim().toLowerCase();
    const exists = registeredUsers.find(
      (u: { email: string }) =>
        u.email.trim().toLowerCase() === normalizedEmail,
    );
    if (exists) {
      setAuthError("Пользователь с таким email уже зарегистрирован");
      return;
    }

    // Сохраняем нового пользователя
    const newUser = {
      id: Date.now(),
      name: normalizedEmail.split("@")[0], // имя из email до @
      email: normalizedEmail,
      password: formValues.password,
      userAvatar: "",
    };
    localStorage.setItem(
      "registered_users",
      JSON.stringify([...registeredUsers, newUser]),
    );

    const authUser = {
      id: newUser.id,
      name: newUser.name,
      userAvatar: newUser.userAvatar,
      email: newUser.email,
    };
    setToken(`mock-token-${newUser.id}`);
    setStoredUser(authUser);
    dispatch(login(authUser));

    navigate(location.state?.from || "/");
  };

  return (
    <main className={authStyles.main}>
      <h1 className={authStyles.title}>Регистрация</h1>

      <div className={authStyles.content}>
        <section
          className={authStyles.formSection}
          aria-label="Форма регистрации"
        >
          <div className={authStyles.socialButtons}>
            <Button variant="outlined" type="button">
              <img src={googleIcon} alt="" aria-hidden="true" />
              <span>Продолжить с Google</span>
            </Button>

            <Button variant="outlined" type="button">
              <img src={appleIcon} alt="" aria-hidden="true" />
              <span>Продолжить с Apple</span>
            </Button>
          </div>

          <div className={authStyles.divider}>или</div>

          <form
            className={authStyles.formContainer}
            onSubmit={onSubmit}
            noValidate
          >
            <div className={authStyles.fields}>
              <InputBaseContainerUI
                label="Email"
                id="email"
                error={errors.email}
              >
                <InputUI
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Введите email"
                  value={formValues.email}
                  onChange={handleInputChange("email")}
                  onBlur={handleBlur("email")}
                  autoComplete="email"
                />
              </InputBaseContainerUI>

              <InputBaseContainerUI
                label="Пароль"
                id="password"
                error={errors.password || authError}
                hint="Не менее 6 символов"
              >
                <InputUI
                  id="password"
                  name="password"
                  placeholder="Придумайте пароль"
                  value={formValues.password}
                  onChange={handleInputChange("password")}
                  onBlur={handleBlur("password")}
                  autoComplete="new-password"
                />
              </InputBaseContainerUI>
            </div>

            <Button
              variant="primary"
              type="submit"
              className={authStyles.submitButton}
            >
              Зарегистрироваться
            </Button>
          </form>

          <Link to="/login" className={styles.loginLink}>
            Уже есть аккаунт? Войти
          </Link>
        </section>
      </div>
    </main>
  );
}
