import React, { useState, useRef, useEffect } from "react";
import styles from "./CategoryDropdown.module.scss";
import { ChevronIcon } from "@/components/ui/Icons/ChevronIcon";
import { getCategoriesColumns } from "@/data/categories";
import { CategoryRow } from "@/components/CategoryDropdown/components/CategoryRow";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/services/slices/CatalogSlice";
import type { RootState, AppDispatch } from "@/services/store";

interface CategoryDropdownProps {
  onCategorySelect?: (value: string) => void;
  className?: string;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  onCategorySelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.catalog.filters);

  const handleSelect = (value: string) => {
    dispatch(setFilters({ ...filters, category: value }));
    onCategorySelect?.(value);
    setIsOpen(false);
  };

  const { leftColumn, rightColumn } = getCategoriesColumns();

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.dropdownButton} ${className}`}
        onClick={handleToggle}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="menu"
        aria-label="Каталог"
      >
        <span>Каталог</span>
        <ChevronIcon className={styles.chevron} isOpen={isOpen} />
      </button>

      {isOpen && (
        <div ref={menuRef} className={styles.menuPanel}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.column}>
                {leftColumn.map((cat) => (
                  <CategoryRow
                    key={cat.title}
                    category={cat}
                    onSelect={handleSelect}
                  />
                ))}
              </div>

              <div className={styles.column}>
                {rightColumn.map((cat) => (
                  <CategoryRow
                    key={cat.title}
                    category={cat}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
