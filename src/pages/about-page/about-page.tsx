import { useLocation } from "react-router-dom";
import styles from "./about-page.module.scss";
import { useEffect } from "react";

const AboutPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.replace("#", "")
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [location]);
  
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>О проекте</h1>

      <p className={styles.aboutText}>
        Fullstack веб-приложение для онлайн-продаж мебельной продукции с
        интеграцией с учётной системой 1С:Предприятие 8.3.
      </p>

      <h2 className={styles.subtitle}>Стек технологий</h2>

      <ul className={styles.list}>
        <li>
          <strong>Frontend:</strong> React, TypeScript, Redux Toolkit, React
          Router, SCSS, Vite
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Express.js, PostgreSQL
        </li>
        <li>
          <strong>Инфраструктура:</strong> Neon (облачная БД), Render (хостинг)
        </li>
        <li>
          <strong>Интеграция:</strong> 1С:Предприятие 8.3, HTTP/JSON
        </li>
      </ul>

      <h2 className={styles.title} id="contacts">Контакты</h2>

      <p className={styles.aboutText}>example@example.com</p>

      <h2 className={styles.title} id="blog">Блог</h2>

      <p className={styles.aboutText}>https://example.com</p>

      <h2 className={styles.title} id="privacy">Политика конфиденциальности</h2>

      <p className={styles.aboutText}>
        Данный проект является учебным и демонстрационным веб-приложением,
        созданным в целях изучения и демонстрации навыков веб-разработки.
      </p>

      <h3 className={styles.subtitle}>Сбор информации</h3>

      <p className={styles.aboutText}>
        Приложение может хранить информацию, которую пользователь добровольно
        предоставляет при регистрации или использовании сервиса, такую как имя
        пользователя, адрес электронной почты и иные данные, необходимые для
        работы функций приложения.
      </p>

      <h3 className={styles.subtitle}>Использование информации</h3>

      <p className={styles.aboutText}>
        Собранная информация используется исключительно для обеспечения работы
        приложения, улучшения пользовательского опыта и тестирования
        функциональности.
      </p>

      <h3 className={styles.subtitle}>Передача данных третьим лицам</h3>

      <p className={styles.aboutText}>
        Данные пользователей не продаются и не передаются третьим лицам, за
        исключением случаев, когда это требуется законодательством или
        необходимо для технического функционирования сервиса.
      </p>

      <h3 className={styles.subtitle}>Безопасность данных</h3>

      <p className={styles.aboutText}>
        Разработчик стремится применять разумные меры для защиты
        пользовательских данных, однако не может гарантировать абсолютную
        безопасность информации, передаваемой через интернет.
      </p>

      <h3 className={styles.subtitle}>Изменения политики</h3>

      <p className={styles.aboutText}>
        Настоящая политика может изменяться без предварительного уведомления.
        Актуальная версия всегда публикуется на данной странице.
      </p>

      <h2 className={styles.title} id="agreement">Пользовательское соглашение</h2>

      <p className={styles.aboutText}>
        Используя данный веб-сервис, пользователь подтверждает своё согласие с
        настоящими условиями.
      </p>

      <h3 className={styles.subtitle}>Общие положения</h3>

      <p className={styles.aboutText}>
        Данный сервис предоставляется в демонстрационных и образовательных
        целях. Некоторые функции могут находиться в стадии разработки,
        тестирования или быть недоступны.
      </p>

      <h3 className={styles.subtitle}>Использование сервиса</h3>

      <p className={styles.aboutText}>
        Пользователь обязуется использовать сервис добросовестно и не
        предпринимать действий, способных нарушить его работу, безопасность или
        доступность для других пользователей.
      </p>

      <h3 className={styles.subtitle}>Ограничение ответственности</h3>

      <p className={styles.aboutText}>
        Сервис предоставляется по принципу «как есть». Разработчик не
        гарантирует бесперебойную работу сервиса, отсутствие ошибок или
        соответствие сервиса конкретным ожиданиям пользователя.
      </p>

      <h3 className={styles.subtitle}>Интеллектуальная собственность</h3>

      <p className={styles.aboutText}>
        Исходный код, дизайн, текстовые материалы и иные элементы проекта
        принадлежат их правообладателям и используются исключительно в рамках
        данного проекта.
      </p>

      <h3 className={styles.subtitle}>Прекращение доступа</h3>

      <p className={styles.aboutText}>
        Разработчик оставляет за собой право ограничить или прекратить доступ к
        сервису в любое время без объяснения причин.
      </p>

      <h3 className={styles.subtitle}>Изменение условий</h3>

      <p className={styles.aboutText}>
        Настоящее соглашение может быть изменено без предварительного
        уведомления пользователей. Продолжение использования сервиса означает
        согласие с обновлённой версией соглашения.
      </p>
    </div>
  );
};

export default AboutPage;
