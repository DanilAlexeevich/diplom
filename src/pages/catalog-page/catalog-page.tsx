import { useMemo, useState, useEffect } from "react";
import { CatalogLoading, CatalogError, CatalogEmpty } from "./components";
import { useAppSelector, useAppDispatch } from "@/services/hooks";
import { ProductCard } from "@/components/ProductCard";
import { useLoadCatalogData } from "@/services/hooks/useLoadCatalogData";
import { FilterSideBar } from "@/components/FilterSideBar";
import styles from "./catalog-page.module.scss";
import { setFilters } from "@/services/slices/CatalogSlice";

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, filters } = useAppSelector(
    (state) => state.catalog,
  );

  const [sort, setSort] = useState<"asc" | "desc" | null>(null);
  const [sortOpen, setSortOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useLoadCatalogData();

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.status !== "all" && product.status !== filters.status)
        return false;
      if (filters.category && product.category !== filters.category)
        return false;
      if (filters.priceMin && Number(product.price) < filters.priceMin)
        return false;
      if (filters.priceMax && Number(product.price) > filters.priceMax)
        return false;
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    if (!sort) return filteredProducts;
    return [...filteredProducts].sort((a, b) =>
      sort === "asc"
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price),
    );
  }, [filteredProducts, sort]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const [filtersOpen, setFiltersOpen] = useState(false);

  if (loading) return <CatalogLoading />;
  if (error)
    return (
      <CatalogError message={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className={styles.page}>
      <FilterSideBar
        filters={filters}
        onChange={(f) => dispatch(setFilters(f))}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />

      <div className={styles.content}>
        <div className={styles.topBar}>
          <button
            className={styles.filterToggle}
            onClick={() => setFiltersOpen(true)}
          >
            Фильтры
          </button>

          <div className={styles.sortWrapper}>
            <button
              className={styles.sortToggle}
              onClick={() => setSortOpen((v) => !v)}
            >
              Сортировка {sort === "asc" ? "↑" : sort === "desc" ? "↓" : ""}
            </button>
            {sortOpen && (
              <div className={styles.sortDropdown}>
                <button
                  onClick={() => {
                    setSort("desc");
                    setSortOpen(false);
                  }}
                >
                  Сначала дороже
                </button>
                <button
                  onClick={() => {
                    setSort("asc");
                    setSortOpen(false);
                  }}
                >
                  Сначала дешевле
                </button>
                <button
                  onClick={() => {
                    setSort(null);
                    setSortOpen(false);
                  }}
                >
                  Сбросить
                </button>
              </div>
            )}
          </div>
        </div>
        {filteredProducts.length === 0 ? (
          <CatalogEmpty />
        ) : (
          <>
            <div className={styles.grid}>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onDetailsClick={(id) => console.log("TODO:", id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => changePage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  ← Назад
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={currentPage === page ? styles.active : ""}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    changePage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Вперед →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
