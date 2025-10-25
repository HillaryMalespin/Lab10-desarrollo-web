import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import productsData from '../data/mockProducts';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [format, setFormat] = useState('JSON');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [order, setOrder] = useState('name:asc');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular carga
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let sorted = [...productsData];
      if (order === 'name:asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
      if (order === 'name:desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
      if (order === 'price:asc') sorted.sort((a, b) => a.price - b.price);
      if (order === 'price:desc') sorted.sort((a, b) => b.price - a.price);
      setProducts(sorted);
      setLoading(false);
    }, 800);
  }, [order, format, limit, page]);

  const totalPages = Math.ceil(productsData.length / limit);
  const currentPageData = products.slice((page - 1) * limit, page * limit);

  return (
    <div className="container">
      <h1>Listado de Productos</h1>

      <div className="controls">
        <label>Formato:</label>
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="JSON">JSON</option>
          <option value="XML">XML</option>
        </select>

        <label>Tamaño de página:</label>
        <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}>
          {[6, 12, 24, 48].map(size => <option key={size}>{size}</option>)}
        </select>

        <label>Ordenar por:</label>
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="name:asc">Nombre A→Z</option>
          <option value="name:desc">Nombre Z→A</option>
          <option value="price:asc">Precio ↑</option>
          <option value="price:desc">Precio ↓</option>
        </select>
      </div>

      {loading ? (
        <div className="grid">
          {Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : currentPageData.length === 0 ? (
        <p>No hay productos para mostrar.</p>
      ) : (
        <div className="grid">
          {currentPageData.map(p => (
            <ProductCard key={p.sku} product={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => Math.min(totalPages, p + 1))}
      />

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default ProductsPage;
