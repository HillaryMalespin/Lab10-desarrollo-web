import React from 'react';

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page === 1}>&lt;</button>
      <span>Página {page} de {totalPages}</span>
      <button onClick={onNext} disabled={page === totalPages}>&gt;</button>
    </div>
  );
};

export default Pagination;
