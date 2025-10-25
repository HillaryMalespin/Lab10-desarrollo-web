import React, { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
  const [raw, setRaw] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{product.name}</h2>
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Precio:</strong> ${product.price}</p>
        {!raw ? (
          <p>{product.description}</p>
        ) : (
          <pre className="raw">{JSON.stringify(product, null, 2)}</pre>
        )}
        <label className="raw-toggle">
          <input type="checkbox" checked={raw} onChange={() => setRaw(!raw)} /> Ver Raw
        </label>
      </div>
    </div>
  );
};

export default ProductModal;
