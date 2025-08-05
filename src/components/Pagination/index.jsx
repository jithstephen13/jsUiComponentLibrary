import React from 'react';
import './PaginationStyles.js';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const Pagination = ({
  currentPage = 1,
  itemsPerPage = ROWS_PER_PAGE_OPTIONS[0] || 5,
  totalItems = 0,
  handlePageChange = () => {},
  prevButton = '<',
  nxtButton = '>',
  showFirstButton = false,
  firstBtnLabel = '|<',
  LastBtnLabel = '>|',
  boundaryCount = 1 // Number of buttons to show at the start and end
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const buttons = [];

  const startButton = Math.max(1, currentPage - boundaryCount);
  const endButton = Math.min(totalPages, currentPage + boundaryCount);

  if (startButton > 1) {
    buttons.push(
      <button key={1} onClick={() => handlePageChange(1)} className="indexBtn">
        1
      </button>
    );
    if (startButton > 2) {
      buttons.push(<span key="dots-start">...</span>);
    }
  }

  for (let i = startButton; i <= endButton; i += 1) {
    buttons.push(
      <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'activeIndexBtn' : 'indexBtn'}>
        {i}
      </button>
    );
  }

  if (endButton < totalPages) {
    if (endButton < totalPages - 1) {
      buttons.push(<span key="dots-end">...</span>);
    }
    buttons.push(
      <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="indexBtn">
        {totalPages}
      </button>
    );
  }

  return (
    <div>
      {itemsPerPage > 0 && (
        <div className="center">
          {showFirstButton && (
            <button disabled={currentPage === 1} onClick={() => handlePageChange(1)} className="mr-5">
              {firstBtnLabel}
            </button>
          )}
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="prevBtn">
            {prevButton}
          </button>
          {buttons}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="NxtBtn"
          >
            {nxtButton}
          </button>
          {showFirstButton && (
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} className="mr-5">
              {LastBtnLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
