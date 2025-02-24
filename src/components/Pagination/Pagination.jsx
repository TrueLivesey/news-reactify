import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const Pagination = ({
  totalPages,
  handleNextPage,
  handlePreviousPage,
  handlePageClick,
  currentPage,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage <= 1}
        onClick={handlePreviousPage}
        className={styles.arrow}
      >
        {'<'}
      </button>
      <div className={styles.list}>
        {[...Array(Number(totalPages))].map((_, index) => (
          <button
            onClick={() => handlePageClick(index + 1)}
            key={index}
            disabled={currentPage === index + 1}
            className={styles.pageNumber}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        disabled={currentPage >= totalPages}
        onClick={handleNextPage}
        className={styles.arrow}
      >
        {'>'}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
