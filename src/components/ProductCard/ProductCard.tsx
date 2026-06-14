import React, { useState } from "react";
import { Button } from "@/components/ui";
import styles from "./ProductCard.module.scss";
import { ProductModal } from "@/components/ui/ProductModal";
import { useCart } from "@/context/CartContext";
import type { TProductStatus } from "@/types/product";
import { useMemo } from 'react';
import { getRandomProductImage } from '@/utils/productImages';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number | string;
  status: TProductStatus;
  image_url?: string;
  category?: string;
  description?: string;
  onDetailsClick: (id: number) => void;
}

const STATUS_LABEL: Record<TProductStatus, string> = {
  active: "В наличии",
  out_of_stock: "Нет в наличии",
};

const formatPrice = (price: number | string) =>
  Number(price).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  status,
  image_url,
  category,
  description,
}) => {
  const { addToCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resolvedImage = useMemo(
    () => image_url || getRandomProductImage(category),
    [image_url, category]
  );

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper} onClick={() => setIsModalOpen(true)}>
        {resolvedImage ? (
          <img src={resolvedImage} alt={name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>Нет фото</div>
        )}
        {category && <span className={styles.category}>{category}</span>}
      </div>

      <div className={styles.body} onClick={() => setIsModalOpen(true)}>
        <h3 className={styles.name}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div className={styles.actions} onClick={() => setIsModalOpen(true)}>
        <span className={styles.price}>{formatPrice(price)}</span>
        <span className={`${styles.status} ${styles[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      <Button
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        className={styles.detailsButton}
      >
        Подробнее
      </Button>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
        name={name}
        price={price}
        status={status}
        image_url={resolvedImage}
        description={description}
        onAddToCart={() =>
          addToCart({
            id,
            name,
            price: Number(price),
            image_url: resolvedImage,
          })
        }
      />
    </article>
  );
};
