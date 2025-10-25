import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{product.name}</h3>
      <p><strong>SKU:</strong> {product.sku}</p>
    </div>
  );
};

export default ProductCard;
