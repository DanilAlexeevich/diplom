import React from 'react';
import { Button } from '@/components/ui/Button';
import { TProductStatus } from '@/types/product';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  name: string;
  price: number | string;
  status: TProductStatus;
  image_url?: string;
  description?: string;
  onAddToCart: (id: number) => void;
}

const STATUS_LABEL: Record<TProductStatus, string> = {
  active: 'В наличии',
  out_of_stock: 'Нет в наличии',
};

const formatPrice = (price: number | string) =>
  Number(price).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  });

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  id,
  name,
  price,
  status,
  image_url,
  description,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>

        <div className={styles.imageWrapper}>
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              Нет фото
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>

          {description && (
            <p className={styles.description}>
              {description}
            </p>
          )}

          <div className={styles.actions}>
            <div className={styles.priceBlock}>
              <span className={styles.price}>
                {formatPrice(price)}
              </span>

              <span
                className={`${styles.status} ${styles[status]}`}
              >
                {STATUS_LABEL[status]}
              </span>
            </div>

            <Button
              variant="primary"
              onClick={() => {
                onAddToCart(id);
                onClose();
              }}
              disabled={status === 'out_of_stock'}
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
