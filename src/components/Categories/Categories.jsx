import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const Categories = ({
  categories,
  setSelectedCategory,
  selectedCategory,
}) => {
  return (
    <div className={styles.categories}>
      <button
        onClick={() => setSelectedCategory(null)}
        className={!selectedCategory ? styles.active : styles.item}
      >
        All
      </button>

      {categories.map((category) => {
        return (
          <button
            onClick={() => setSelectedCategory(category)}
            key={category}
            className={
              selectedCategory === category ? styles.active : styles.item
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
